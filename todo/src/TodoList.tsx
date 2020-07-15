import React from 'react';
import { TodoListItem } from './TodoListItem';

interface TodoListProps {
    todos: Array<Todo>,
    deleteTodo: DeleteTodo;

}

export const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo}) => {
    return (
        <ul>
            {todos.map(todo => {
                return (
                    <TodoListItem key={todo.description} todo={todo} deleteTodo={deleteTodo}  />
                );
            })}
        </ul>
    )
}