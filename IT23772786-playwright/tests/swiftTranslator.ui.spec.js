const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvFilePath = path.resolve(__dirname, 'CSV-ForAutoTest.csv');
const csvData = fs.readFileSync(csvFilePath, 'utf8');

const { data: rows } = Papa.parse(csvData, { header: true, skipEmptyLines: true });

rows.forEach((row) => {
  const { 'TC ID': tcId, 'Test case name': name, Input } = row;

  // Only pick UI test cases
  if (!tcId || !(tcId.startsWith('Pos_UI') || tcId.startsWith('Neg_UI'))) return;

  test(`${tcId} - ${name}`, async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');

    // Fill input if provided
    if (Input) {
      const inputBox = page.getByRole('textbox', { name: 'Input Your Singlish Text Here.' });
      await inputBox.fill(Input);
    }

    // Now check UI behavior based on TC ID
    if (tcId.startsWith('Pos_UI')) {
      // Example: Real-time update
      const sinhalaPanel = page.locator('div', { hasText: 'Sinhala' }).first();
      await expect(sinhalaPanel).toBeVisible({ timeout: 10000 });
    }

    if (tcId === 'Neg_UI_0001') {
      // Example: check light mode readability
      const body = page.locator('body');
      await expect(body).toHaveCSS('background-color', 'rgb(50, 50, 50)'); // I expect dark mode here
    }
  });
});
