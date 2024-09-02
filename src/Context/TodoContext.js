import React from'react';

export const TodoContext=React.createContext({
    todos:[
        {
            id:1,
            title:'Todo msg',
            completed:false
        },
        
    ],
    addTodo : (todo)=>{},
    updateTodo:(id,Todo)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{},
});

export const useTodo=()=>{
    return React.useContext(TodoContext);
}

export const TodoProvider=TodoContext.Provider;