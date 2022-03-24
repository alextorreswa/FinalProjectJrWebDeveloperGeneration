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
}