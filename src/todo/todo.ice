module todo

config
  backend: Java
  phase: generate

model

entity TodoList{
  filter: String = "All" (default)
  
  
  allFinished: Boolean = todosLeft == 0
  
  todosLeft: Int = (todos \ finishedTodos).count()
  
  input: String = "" (default)
  
  view: View = div {
    allFinished
    ul {
      visibleTodos.view
    }
    filter
    todosLeft
    children.view
  }
}

entity Todo {
  task: String
  finished: Boolean
  view : View = div { task finished }
}

relation TodoList.todos * <-> 1 Todo.list
relation TodoList.parent ? <-> * TodoList.children

relation TodoList.allTodos = this.todos ++ children.allTodos <-> Todo.inverseAllTodos
relation TodoList.finishedTodos = todos.filter(todo => todo.finished) <-> Todo.inverseFinishedTodos
relation TodoList.visibleTodos = 
  switch {
    case filter == "All" => todos
    case filter == "Completed" => finishedTodos
    case filter == "Not Completed" =>  finishedTodos
    default => todos
  } <-> Todo.inverseVisibleTodos
  
  
  
  