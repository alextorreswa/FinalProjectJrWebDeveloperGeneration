const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
   const html = `
     <li id='data-task-${id}' class="list-group-item" style="width: 30rem;">
             <div class="card" style="width: 28rem;">
                <div class="card-body">
                   <h5 class="card-title">${name}</h5>
                   <div class="d-flex w-100 justify-content-between">
                   <h6 class="card-subtitle mb-2 text-muted">Assigned To:  <span class="text-right">${assignedTo}</span></h6>             
                   <p class="card-text">Due: ${dueDate} </p> 
                   </div>
                </div>
                <div class="card-body ">
                   <p class="card-text border-dark">${description}</p>
                </div>
                <div class="card-footer text-right" style="width: 28rem;">
                  <a href="#" class="done-button btn border-success">Mark As Done</a>
                  <a href="#" class="btn border-success">${status}</a>
                  <a href="#" class="delete-button btn border-danger">Delete</a>
                </div>

             </div>
          </li>
 `;
   return html;
 }

class TaskManager {
   currentId;
   tasks;
   constructor (currentId = 0) {
      this.currentId = currentId;
      this.tasks = [];
   }
   getTaskById (taskId) {
      let foundTask;
      this.tasks.forEach(element => {
         if(taskId===element[0]) {
            foundTask = element;
         }
      });
      return foundTask; 
   }
   addTask (name, description, assignedTo, dueDate, status='TODO') {
      this.currentId++;
      this.tasks.push([this.currentId,name,description,assignedTo,dueDate,status]);
   }
   render () {
      const tasksHtmlList = [];
      this.tasks.forEach(element => {
         const dueDate = new Date(element[4]+' 23:59:59');
         const formattedDate = dueDate.toLocaleString('en-US', {
            weekday: 'long', // long, short, narrow
            day: 'numeric', // numeric, 2-digit
            year: 'numeric', // numeric, 2-digit
            month: 'long', // numeric, 2-digit, long, short, narrow
         });
         const taskHtml =  createTaskHtml(element[0],element[1],element[2],element[3],formattedDate,element[5]);
         tasksHtmlList.push(taskHtml);
      });
      const tasksHtml = tasksHtmlList.join('\n');
      //console.log(tasksHtml);
      document.getElementById('taskList').innerHTML = tasksHtml;
   }

   save() {
      const tasksJson = JSON.stringify(this.tasks);
      const currentId = this.currentId.toString();

      if (storageAvailable('localStorage')) {
         // Yippee! We can use localStorage awesomeness
         localStorage.setItem('tasks', tasksJson);
         localStorage.setItem('currentId', currentId);
       }
       else {
         // Too bad, no localStorage for us
         console.log('No localStorage available');
       }
       
   }

   load () {
      const tasksJson = localStorage.getItem('tasks');
      if(tasksJson.length != 0) {
         this.tasks = JSON.parse(tasksJson);
      }
      const currentIdJson = localStorage.getItem('currentId');
      if(currentIdJson.length != 0) {
         this.currentId = parseInt(currentIdJson);
         //console.log(this.currentId);
      }   
   }

   deleteTask(taskId) {
      console.log('delete funcion...',taskId,this.tasks);
      const newTasks = [];
      this.tasks.forEach(element => { 
         if(element[0]!=taskId) {
            newTasks.push(element);
         }
      });
      this.tasks = newTasks;
      console.log(newTasks);
   }

//    storageAvailable(type) {
//       var storage;
//       try {
//           storage = window[type];
//           var x = '__storage_test__';
//           storage.setItem(x, x);
//           storage.removeItem(x);
//           return true;
//       }
//       catch(e) {
//           return e instanceof DOMException && (
//               // everything except Firefox
//               e.code === 22 ||
//               // Firefox
//               e.code === 1014 ||
//               // test name field too, because code might not be present
//               // everything except Firefox
//               e.name === 'QuotaExceededError' ||
//               // Firefox
//               e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
//               // acknowledge QuotaExceededError only if there's something already stored
//               (storage && storage.length !== 0);
//       }
//   }
  

}

function storageAvailable(type) {
   var storage;
   try {
       storage = window[type];
       var x = '__storage_test__';
       storage.setItem(x, x);
       storage.removeItem(x);
       return true;
   }
   catch(e) {
       return e instanceof DOMException && (
           // everything except Firefox
           e.code === 22 ||
           // Firefox
           e.code === 1014 ||
           // test name field too, because code might not be present
           // everything except Firefox
           e.name === 'QuotaExceededError' ||
           // Firefox
           e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
           // acknowledge QuotaExceededError only if there's something already stored
           (storage && storage.length !== 0);
   }
}