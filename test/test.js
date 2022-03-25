// Bring in the chai assertion library, mocha, and app.js file
const {assert} = require('chai');
const { describe, it } = require('mocha');
const app = require('../js/TaskManager');

// Write tests function below this line
describe('Task Manager', () => {
   describe('check methods', () => {   

      it('addTask', () => {
         // Setup
         //const number = 15;        
         //const fizzbuzzString = 'fizz buzz';
         // Exercise
         //const result = app.fizzBuzz(number);
         // Verify
         //assert.equal(result,fizzbuzzString);
         assert.equal(1,1);
      });

      it('deleteTask', () => {
         // Setup
         //const number = 3;         
         //const fizzbuzzString = 'fizz';
         // Exercise
         //const result = app.fizzBuzz(number);
         // Verify
         //assert.equal(result,fizzbuzzString);
      });      

      it('getTaskById', () => {
         // Setup
         //const number = 5;
         //const fizzbuzzString = 'buzz';
         // Exercise
         //const result = app.fizzBuzz(number);
         // Verify
         //assert.equal(result,fizzbuzzString);
      });      

   });

});