import UserTasks from './models/taskModel';

export const getTasks = async (req, res) => {
      try{
         const tasks = await UserTasks.find({user : req.user.id});  //need to change after adding jwt

         return res.status(200).json(tasks);
      }catch(err){
         return res.status(500).json({error : "error fetching tasks" , err});
      }     
}

export const createTasks = async (req, res) => {
      try{
         let {title} = req.body;

         if(!title) return res.status(400).json({message : "title is required"});

         const newTask = await UserTasks.create({
            title,
            user : req.user.id   //will work after adding JWT
         });

         return res.status(201).json({
            message : "task created",
            ref : newTask._id
         })

      }catch(err){
         return res.status(500).json({error : "error creating tasks"});
      }
}

export const updateTask = async (req, res) => {
      try{
         const task = await UserTasks.findOneAndUpdate(
            {_id : req.params.id },
            req.body,
            {new : true}
         );
         res.json(task);
      }catch(err){
         return res.status(500).json({error : "error is task updation :" , err})
      }
} 

export const deleteTask = async (req, res) => {
      try{
          const _id = req.params.id;
          const userId = req.user.id;

          await UserTasks.findOneAndDelete({_id : _id , user : userId});

          return res.status(200).json({message : "task deleted"});

      }catch(err){
          return res.status(500).json({error : "task deletion failed" , err});
      }
}

