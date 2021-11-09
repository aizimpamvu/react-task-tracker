import {useState,useEffect} from "react"
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
function App() {
    const [showAddtask,setShowAddTask]=useState(false)
    const [tasks,setTasks]=useState([])
    useEffect(()=>{
        const getTasks=async ()=>{
            const tasksFromServer=await  fetchTasks()
            setTasks(tasksFromServer)
        }
        fetchTasks()
    },[])

    //Fetch Tasks
    const fetchTasks=async ()=> {
        const res = await fetch('http://localhost:5000/tasks')
        const data=await  res.json()
        return data
    }
  //Add Task
    const addTask=(task)=>{
        const id=Math.floor(Math.random()*1000)+1
        console.log(id)
        const newTask={id,...task}
        setTasks([...tasks,newTask])
    }
  //  Delete Task
    const deleteTask= (id) =>{
        setTasks(tasks.filter((task)=>task.id !==id))
    }
    //Toggle Reminder
    const  toggleReminder=(id)=>{
        setTasks(tasks.map((task)=>task.id===id?{...task,reminder:!task.reminder}:task))
    }

  return (
    <div className="container">
      <Header onAdd={()=>setShowAddTask(!showAddtask)}
      showAdd={showAddtask}/>
        {showAddtask && <AddTask onAdd={addTask}/>}
        { tasks.length>0 ?<Tasks tasks={tasks} onDelete={deleteTask}
        onToggle={toggleReminder}/>: 'No Tasks to Show'}
    </div>

  );

//     class App extends React.Component{
//     render() {
//         return <h1>Hello from class</h1>
//     }

}

export default App;
