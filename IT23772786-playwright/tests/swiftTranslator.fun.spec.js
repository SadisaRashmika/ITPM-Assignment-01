const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvFilePath = path.resolve(__dirname, 'CSV-ForAutoTest.csv');
const csvData = fs.readFileSync(csvFilePath, 'utf8');

const { data: rows } = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true
});

// ONLY FUNCTIONAL TEST CASES
const funRows = rows.filter(r =>
  r['TC ID']?.startsWith('Pos_Fun') ||
  r['TC ID']?.startsWith('Neg_Fun')
);

funRows.forEach(row => {
  const {
    'TC ID': tcId,
    'Test case name': name,
    Input,
    'Expected output': expected
  } = row;

  if (!Input || !expected) return;

  test(`${tcId} - ${name}`, async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');

    // Input box
    const inputBox = page.getByRole('textbox', {
      name: 'Input Your Singlish Text Here.'
    });

    // Sinhala label (EXACT)
    const sinhalaLabel = page.getByText('Sinhala', { exact: true });

    // ONLY the translation output (next container)
    const sinhalaOutput = sinhalaLabel
      .locator('xpath=following-sibling::div[1]');

    // Type input
    await inputBox.fill(Input);

    // Wait until translation appears
    await expect(sinhalaOutput).not.toBeEmpty({ timeout: 20000 });

    // Read ACTUAL output (clean)
    const actual = (await sinhalaOutput.textContent())
      .replace(/\s+/g, ' ')
      .trim();

    const expectedClean = expected
      .replace(/\s+/g, ' ')
      .trim();

    // Compare (Pos = pass, Neg = fail naturally)
    expect(actual).toBe(expectedClean);
  });
});