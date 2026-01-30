# IT3040 – ITPM Assignment 1  
## Automated Testing of Singlish → Sinhala Transliteration  
Student ID: IT23772786  

## Project Overview

This project evaluates the accuracy and robustness of the web application  
`https://www.swifttranslator.com/`  
which converts **Singlish input into Sinhala output** in real time.

The testing focuses only on:
- Functional correctness of transliteration
- Handling of edge cases and incorrect inputs
- Basic UI behavior

## Test Scope
### Functional Testing
- 24 Positive functional test cases (`Pos_Fun_XXXX`)
- 10 Negative functional test cases (`Neg_Fun_XXXX`)
- 2 Positive UI test cases (`Pos_UI_XXXX`)
- 1 Negative UI test cases (`Neg_UI_XXXX`)

### UI Testing
- Real-time Sinhala output update without pressing a button
- Formatting preservation during typing
- Usability limitation (lack of dark mode)

## Automation Approach

- **Framework:** Playwright
- **Language:** JavaScript (Node.js)
- **Test Data Source:** CSV file
- **CSV Parsing Library:** PapaParse

All functional test cases are **data-driven**, meaning:
- Inputs and expected outputs are read from a CSV file
- No hardcoded test data is used in the test scripts
- Positive tests pass naturally
- Negative tests fail naturally when output mismatches expected behavior

## Setup Instructions
### Install project dependencies:
npm install

### Install PapaParse (required for CSV parsing):
npm install papaparse

*PapaParse is required for reading test cases from the CSV file.
Tests will not run correctly without it.*

## How to Run Tests
### Run all tests:
npx playwright test

### Run only functional tests:
npx playwright test swiftTranslator.fun.spec.js

### Run only UI tests:
npx playwright test swiftTranslator.ui.spec.js

## Expected Behavior
- Positive functional tests pass when translation matches expected output
- Negative functional tests fail when translation differs
- UI tests validate only UI behavior, not translation accuracy
- Tests run across Chromium, Firefox, and WebKit by default

## Notes
- No hardcoded inputs or outputs are used
- All validation is driven directly from the CSV file
- This approach ensures easy maintenance and scalability of test cases
