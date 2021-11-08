import {useState} from "react"
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
function App() {
    const [tasks,setTasks]=useState([
        {
            id:1,
            text:'Micheal Loss',
            day:'Nov 30th at 2:20pm',
            reminder:true
        },
        {
            id:2,
            text:'Food Shopping',
            day:'Nov 10th at 12:30pm',
            reminder:true
        },
        {
            id:3,
            text:'Webinar',
            day:'Nov 11th at 4:30pm',
            reminder:true
        }
    ])
  //Add Task
    const addTask=(task)=>{
        console.log(task)
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
      <Header />
        <AddTask onAdd={addTask()}/>
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
