
type Todo = {
  id: number
  description: string;
  complete: boolean;
}

type DeleteTodo = (selectedTodo: Todo, id: Todo.id) => void;

type AddTodo = (newTodo: string) => void;

type GetTodos = {
  id: number;
  description: string;
  created_at:string;
   
} 

