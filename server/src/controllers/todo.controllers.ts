import { Request, Response } from 'express';

import { connect } from '../database';
import { Todo } from '../interface/Todo'

export async function getTodos(req: Request, res: Response): Promise<Response> {

    const conn = await connect();
    const todos = await conn.query('SELECT * FROM todos');
    return res.json(todos[0])

}

export async function createTodo(req: Request, res: Response) {
    const newTodo: Todo = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO todos SET ?' , newTodo)
    return res.json({
        message: 'Todo created'
    })
}


export async function getTodo(req: Request, res: Response): Promise<Response> {
 const id = req.params.todoId;
 const conn = await connect();
 const todos = await conn.query('SELECT * FROM todos WHERE id = ?', [id])
 return res.json(todos[0])

}

export async function  deleteTodo(req: Request , res: Response){
    const id = req.params.todoId;
    const conn = await connect();
    await conn.query('DELETE FROM todos WHERE id = ?', [id])
    return res.json({
        message: 'Todo deleted'
    })
}

export async function  updateTodo(req: Request , res: Response){
    const id = req.params.todoId;
    const updateTodo: Todo = req.body;
    const conn = await connect();
    await conn.query('UPDATE todos set ? WHERE id = ?', [updateTodo, id])
    return res.json({
        message: 'Todo updated'
    })
}