/**
 * @jest-environment jsdom
 */
const app = require('../scripts/app');

test('use jsdom in this test file', () => {
  const element = document.createElement('div')
  expect(element).not.toBeNull()
})

describe('Validate Move', () => {

  test('should be valid position', () => {
    expect(app.isValidPosition(1)).toBe(true);
  })

  test('should be low invalid position', () => {
    expect(app.isValidPosition(-1)).toBe(false);
  })

  test('should be high invalid position', () => {
    expect(app.isValidPosition(64)).toBe(false);
  })

})
