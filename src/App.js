import {useState,useEffect} from "react"
import Header from './components/Header'
import Footer from './components/Footer'
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
        console.log(getTasks())
    },[])

    //Fetch Tasks
    const fetchTasks=async ()=> {
        const res = await fetch('http://localhost:5000/tasks')
        const data=await  res.json()
        return data
    }

    //Fetch Tasks
    const fetchTask=async (id)=> {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data=await  res.json()
        return data
    }
  //Add Task
    const addTask=async (task)=>{
        const  res= await fetch('http://localhost:5000/tasks',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(task)
        })

        const data= await res.json()
        setTasks([...tasks,data])
        // const id=Math.floor(Math.random()*1000)+1
        // console.log(id)
        // const newTask={id,...task}
        // setTasks([...tasks,newTask])
    }
  //  Delete Task
    const deleteTask= async (id) =>{
        await fetch(`http://localhost:5000/tasks/${id}`,{
            method:'DELETE',
        })
        setTasks(tasks.filter((task)=>task.id !==id))
    }
    //Toggle Reminder
    const  toggleReminder= async (id)=>{
        const taskToToggle=await fetchTask(id)
        const updTask={...taskToToggle,
        reminder:!taskToToggle.reminder}

        const res=await fetch(`http://localhost:5000/tasks/${id}`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(updTask)
        })

        const data=await res.json()
        setTasks(tasks.map((task)=>
            task.id===id?{...task,reminder:
                    data.reminder}:task))
    }

  return (
    <div className="container">
      <Header onAdd={()=>setShowAddTask(!showAddtask)}
      showAdd={showAddtask}/>
        {showAddtask && <AddTask onAdd={addTask}/>}
        { tasks.length>0 ?<Tasks tasks={tasks} onDelete={deleteTask}
        onToggle={toggleReminder}/>:('No Tasks to Show')}
        <Footer />
    </div>

  );

//     class App extends React.Component{
//     render() {
//         return <h1>Hello from class</h1>
//     }

}

export default App;
