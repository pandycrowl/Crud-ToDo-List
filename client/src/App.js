import { useState } from 'react'
import Todoform from './Components/TodoForm'

function App() {
  const [todo, setTodo] = useState([])

  const todoLength = (todos) => {
    if (todos) {
      setTodo(todos)
    }
  }
  return (
    <div className="App">

      <header>
        <h1>Список задач: {todo.length} </h1>
      </header>
      <Todoform todoLength={todoLength} />
    </div>
  );
}

export default App;
