import { Router } from "express";
const router = Router();

import { getTodos, createTodo, getTodo, deleteTodo, updateTodo } from '../controllers/todo.controllers';


router.route('/')
   .get( getTodos )
   .post( createTodo ) 
   
   
router.route('/:todoId')
   .get(getTodo)
   .delete(deleteTodo)
   .put(updateTodo)


export default router;
