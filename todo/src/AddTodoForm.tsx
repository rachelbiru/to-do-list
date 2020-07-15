import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios'

interface AddTodoFormProps {
    addTodo: AddTodo;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
    const [newTodo, setNewTodo] = useState("")

    const postTodo = () => {
        console.log('start axios')
        axios
            .post('/todos' , {
               description : newTodo
            })
            .then(res => {
                if (res.status === 200) {
                    console.log('succeed')
                            
                } else {
                    console.log(`error status code ${res.status}`);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }



const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
}


const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
     postTodo();
}

return (
    <form>
        <input type="text" value={newTodo} onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>Add Todo </button>
    </form>
)
}

