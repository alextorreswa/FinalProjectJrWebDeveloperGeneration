// Bring in the chai assertion library, mocha, and app.js file
const {assert} = require('chai');
const { describe, it } = require('mocha');
const app = require('../js/TaskManager');

// Write tests function below this line
describe('Task Manager', () => {
   describe('check methods', () => {   

      it('Method add task', () => {
         // Setup
         const taskclass = new app;
         const taskExpected = [1,'Take out the trash','Take out the trash to the front of the house','Alex','2022-04-04','Pending']

         // Exercise
         taskclass.addTask('Take out the trash','Take out the trash to the front of the house','Alex','2022-04-04');

         // Verify
         assert.deepEqual(taskExpected,taskclass.tasks[0]);
      });

      it('Method delete task', () => {
         // Setup
         const taskclass = new app;
         taskclass.addTask('Take out the trash','Take out the trash to the front of the house','Alex','2022-04-04');      
         const taskExpectNoFound = [1,'Take out the trash','Take out the trash to the front of the house','Alex','2022-04-04','Pending']

         // Exercise
         taskclass.deleteTask(1);

         // Verify
         taskclass.tasks.forEach( (element) => { 
            assert.notSameOrderedMembers(element, taskExpectNoFound, 'not same ordered members');
         });
         
      });      

      it('Method get task by id', () => {
         // Setup
         const taskclass = new app;
         const taskExpected = [1,'Take out the trash','Take out the trash to the front of the house','Alex','2022-04-04','Pending']

         // Exercise
         taskclass.addTask('Take out the trash','Take out the trash to the front of the house','Alex','2022-04-04');

         // Verify
         assert.deepEqual(taskExpected,taskclass.getTaskById(1));
      });      

      it('Check constructor', () => {
         // Setup
         const taskclass = new app;
         const currentIdExpected = 0;
         const tasksExpected = [];

         // Exercise

         // Verify
         assert.equal(currentIdExpected,taskclass.currentId);         
         assert.deepEqual(tasksExpected,taskclass.tasks);
      });  

   });

});