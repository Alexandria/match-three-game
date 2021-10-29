/**
 * @jest-environment jsdom
 */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 56cd688 (restore .json files to remedy rebase)
=======
>>>>>>> d8547cd (restore .json files to remedy rebase)
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

=======

test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
});

const app = require("../scripts/app")
test('should be valid', () => {
    const element = document.createElement('div');
    expect(element).not.toBe(1)
>>>>>>> 0d01b79 (add: jest test sample)
=======
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

>>>>>>> 83de04d (fix: logic modification to prevent moves)
})
>>>>>>> dafed93 (restore .json files)
