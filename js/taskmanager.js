const createTaskHtml = (name, description, assignedTo, dueDate, status) => {
   const html = `
     <li class="list-group-item" style="width: 30rem;">
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
                   <a href="#" class="btn border-success">${status}</a>
                   <a href="#" class="btn border-danger">Delete</a>
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
         const taskHtml =  createTaskHtml(element[1],element[2],element[3],formattedDate,element[5]);
         tasksHtmlList.push(taskHtml);
      });
      const tasksHtml = tasksHtmlList.join('\n');
      console.log(tasksHtml);
      document.getElementById('taskList').innerHTML = tasksHtml;
   }
}