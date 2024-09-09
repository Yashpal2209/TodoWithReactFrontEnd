import { useEffect, useState } from 'react'
import { TodoProvider } from "./Context"
import TodoForm from './Components/TodoFrom'
import TodoItem from './Components/TodoItem'
const url="http://localhost:5000";

function App() {

  const [todos,setTodos]=useState([]);

  const addTodo=(todo)=>{
    // console.log(todo);  
    const newtodo={taskName:todo.todo,isCompleted:todo.isCompleted}
    todo=newtodo;
    const id=Date.now();
    setTodos((prev)=>[{id:id,...todo},...prev]);
    console.log(todo);
    fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id:id,
        title:todo.taskName,
        isCompleted:false
      })
    })
  }

  const updateTodo=(id,todo)=>{
    console.log(todo);
    setTodos(prev=>prev.map(prevtodo=>prevtodo.id===id?todo:prevtodo))
    console.log(todo.taskName);
    fetch(url,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id:id,
        title:todo.taskName,
        isCompleted:todo.isCompleted
      })
    })
  }

  const deleteTodo=(id)=>{
    setTodos(prev=>prev.filter(prevtodo=>prevtodo.id!==id))
    fetch(url,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id:id,
      })
    })
  }
  
  const toggleComplete=(id)=>{
    setTodos(prev=>prev.map(prevtodo=>prevtodo.id===id? {...prevtodo,isCompleted:!prevtodo.isCompleted}:prevtodo))
    fetch(url,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id:id,
      })
    })
  }

  //to get item from todos.
  useEffect(()=>{
    async function getData(){
      const response=await fetch(url);
      const data=await response.json();
      if(data){
        setTodos(data);
        // localStorage.setItem("todos",JSON.stringify(data));
      }
    }
    getData();
    // if(todos && todos.length>0){
    //   setTodos(todos);
    // }
  },[]);

  //to save item in todos.
  // useEffect(()=>{
  //   localStorage.setItem("todos",JSON.stringify(todos));
  // },[todos]);

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete
    }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm /> 
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>(
              <div key={todo.id}
              className='w-full'>
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
