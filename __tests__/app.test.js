/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
});

const app = require("../scripts/app")
test('should be valid', () => {
    const element = document.createElement('div');
    expect(element).not.toBe(1)
})
