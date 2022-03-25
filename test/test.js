// Bring in the chai assertion library, mocha, and app.js file
const {assert} = require('chai');
const { describe, it } = require('mocha');
const app = require('../js/TaskManager');

// Write tests function below this line
describe('Task Manager', () => {
   describe('check methods', () => {   



      it('addTask', () => {
         // Setup
         const taskclass = new app.TaskManager();
         //const result = [1,'Take out the trash','Take out the trash to the front of the house','Alex','2022-04-04','Pending']

         // Exercise
         //taskclass.addTask('Take out the trash','Take out the trash to the front of the house','Alex','2022-04-04');

         // Verify
         //assert.equal(result,taskclass.getTaskById(1));
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