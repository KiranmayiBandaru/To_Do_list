import { useState } from 'react';
import './App.css';

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function addTask(){
    if(inputValue.trim() === "") return;
    setTasks([...tasks, inputValue]);  
    setInputValue("")
  }
  function handleInputChange(e){
    setInputValue(e.target.value);
  }

  function removeTask(index){
     setTasks(tasks.filter((_, i) => i !== index));
  }
  return (
    <div className="App">
      <InputAndButn 
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onAddTask={addTask}
      />
      <AddTasks 
         tasks={tasks} 
         onRemoveTask={removeTask}     
      />
    </div>
  );
}
function InputAndButn({inputValue, onInputChange, onAddTask}){
   return(
    <>
      <input 
         type='text' 
         placeholder='type the task here' 
         value={inputValue}
         onChange={onInputChange}
      />
      <button onClick={onAddTask}> ADD </button>
    </>
   );
}

function AddTasks({tasks, onRemoveTask}){
   return(
       <div>
          {tasks.map((task, index)=>(
            
            <div key={index}>
              <input type='checkbox' ></input>
              <span>{task}</span>
              <button
                onClick={()=>onRemoveTask(index)}
              >REMOVE</button>
            </div> 
          ))}
       </div>
    
   );
}
export default App;