import express from 'express' ;

const app = express();

let port = 3000;

app.use(express.json());

app.get('/' , (req, res) => {
    res.send("<h> ALL THE BEST TO FINISH YOUR TASKS</h>");
})

function findDateHandler(req, res){
    let currDate = new Date().toUTCString();
    res.setHeader('Date', currDate);
    res.send(`the date is set as ${currDate}`);
}
app.get('/findDate', findDateHandler);

let tasks = [];
let idCounter = 1;

//tasks handlers
function getTasks(req, res){
      if(tasks.length == 0) return res.send('<h>Add tasks</h>');
      return res.status(200).json(tasks);
}

function createTasks(req, res){
      let { title } = req.body;

      if(!title){
       return res.status(400).json({message : "title is required"});
      }

      const newTask = {
        id : idCounter++,
        title,
        completed : false
      }

      tasks.push(newTask);
      res.status(201).json(newTask);
}

function updateTask(req, res){
      const id = parseInt(req.params.id); 
      const {title , completed} = req.body;

      const task = tasks.find(t => t.id === id);

      if(!task) {
        return res.status(400).json({error : "The task is not found"});
      }
      task.title = title ?? task.title;
      task.completed = completed ?? task.completed
      res.json(task);
}

function deleteTask(req, res){
      const id = parseInt(req.params.id);
      const {title} = req.body;
      let task_index = tasks.findIndex(t => t.id === id);
      if(task_index === -1) {
        return res.status(404).json({error : "no such task to delete"});
      }
      tasks.splice(task_index , 1);
      res.sendStatus(204);
}
// implementation of CRUD GET/PUT/POST/PATCH/DELETE
app.get('/tasks' , getTasks); //read
app.post('/tasks' , createTasks); //create
app.put('/tasks/:id' , updateTask); //update
app.delete('/tasks/:id' , deleteTask); //delete

app.listen(port , () => {
    console.log(`the serve is alive on the localhost ${port}`);
})