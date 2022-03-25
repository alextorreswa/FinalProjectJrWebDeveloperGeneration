const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
   let hideDone,borderStatus;   
   if(status==='Done') {
      hideDone = 'hidden';
      borderStatus='success';
   } else {
      hideDone = '';
      borderStatus='warning';
   }
   const html = `
     <li id='data-task-${id}' class="list-group-item" style="width: 30rem;">
             <div class="card" style="width: 28rem;">
                <div class="card-body">
                <div class="d-flex justify-content-end"><a href="#" class="btn border-${borderStatus}">${status}</a> </div>
                   <h5 class="card-title">${name}</h5>                 
                   <div class="inline w-100 justify-content-between">
                   <h6 class="card-subtitle mb-2 text-muted">Assigned To:  <span class="text-right">${assignedTo}</span></h6>             
                   <p class="card-text text-right">Due: ${dueDate} </p> 
                   </div>
                </div>
                <div class="card-body py-0 pb-3">
                   <p class="card-text border-dark">${description}</p>
                </div>
                <div class="card-footer text-right" style="width: 28rem;">
                  <a href="#" id='bdone-task-${id}' class="done-button btn btn-success" ${hideDone}>Mark As Done</a>
                  <a href="#" class="delete-button btn btn btn-danger">Delete</a>
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

   addTask (name, description, assignedTo, dueDate, status='Pending') {
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
      if(tasksHtml.length===0) {
         document.getElementById('AlertMsgNoTasks').hidden=false;    
      } else {
        document.getElementById('AlertMsgNoTasks').hidden=true;        
      }
    
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
      //console.log('delete funcion...',taskId,this.tasks);
      const newTasks = [];
      this.tasks.forEach(element => { 
         if(element[0]!=taskId) {
            newTasks.push(element);
         }
      });
      this.tasks = newTasks;
      //console.log(newTasks);
   }
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

module.exports = TaskManager;