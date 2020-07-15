import React from 'react';
import './TodoListItem.css';
import { FaBeer } from 'react-icons/fa';


interface TodoListItemProps {
    todo: Todo;
    deleteTodo: DeleteTodo;
    // updateTodo: UpdateTodo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo, deleteTodo }) => {
    return (
        <li>
            <label className={todo.complete ? "complete" : undefined}>
                <input type="checkbox" checked={todo.complete}
                    onChange={() => deleteTodo(todo, todo.id)} />
                {todo.description}
            </label>
            {/* <div>
                <button onClick={() => {
                       updateTodo(todo.id)
                }}>Edith</button>
            </div> */}
        </li>

    )
}