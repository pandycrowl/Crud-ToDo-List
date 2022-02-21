import { useState, useEffect } from 'react'
import ModalInput from './ModalInput';

function Todoform({ todoLength }) {
    const [modalActive, setModalActive] = useState(false)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [todos, setTodos] = useState([])
    const [userInput, setUserInput] = useState('')
    const [userInputUpdate, setUserInputUpdate] = useState('')
    const [todo, setTodo] = useState([])
    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        getTodos()
    }, [])

    const getTodos = () => {
        fetch('http://localhost:3001/api/todo', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTodos(result);
                    todoLength(result)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }
    const createTodo = () => {
        fetch('http://localhost:3001/api/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todo_text: userInput,
                complete: false
            }),
        })
            .then((res) => res.json())
            .then(result => {
                setTodos([...todos, result])
                getTodos()
            },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }
    const updateTodo = (id, todo_text, complete) => {
        fetch(`http://localhost:3001/api/todo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todo_text: todo_text,
                complete: complete,
                id: id
            }),
        })
            .then((res) => res.json())
            .then(result => {
                setTodos([...todos])
                getTodos()
            },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }
    const removeTodo = (id) => {
        fetch(`http://localhost:3001/api/todo/${id}`, {
            method: 'DELETE',
        })
            .then(data => {
                // alert(data)
                getTodos()
            })
    }
    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (userInput) {
            setUserInput('')
            createTodo()
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }
    const handleModalChange = (e) => {
        setUserInputUpdate(e.currentTarget.value)
    }
    const handleModalSubmit = (event) => {
        event.preventDefault()
        if (userInputUpdate) {
            setUserInputUpdate('')
            updateTodo(todo[0], userInputUpdate, isChecked)
            setModalActive(false)
        }

    }
    const handleKeyPressmodal = (e) => {
        if (e.key === 'Enter') {
            handleModalSubmit(e)
        }
    }
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else if (todos) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        className='input'
                        value={userInput}
                        type="text"
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Введите текст"
                    />
                    <button className="item-save">Сохранить</button>
                </form>
                {todos.map((todo) => {
                    return (<div className="todos" >
                        <div key={todo.id} className="item-todo" >
                            <div className={todo.complete ? "item-text strike" : "item-text"} >
                                {todo.todo_text}  {todo.complete}
                            </div>
                            <div className='todo-checkbox'>
                                <input className='checkbox' type="checkbox" checked={todo.complete ? true : false} onChange={() => { updateTodo(todo.id, todo.todo_text, !todo.complete); setIsChecked(!todo.complete) }} />
                            </div>
                        </div>

                        <button className="item-update" onClick={() => { setModalActive(true); setTodo([todo.id, todo.todo_text, todo.complete]); setUserInputUpdate(todo.todo_text); setIsChecked(todo.complete) }}>
                            Изменить
                        </button>
                        <button className="item-delete" onClick={() => removeTodo(todo.id)}>
                            X
                        </button>
                    </div>)
                })}
                <ModalInput active={modalActive} setActive={setModalActive}>
                    <form onSubmit={handleModalSubmit}>
                        <input
                            className='input'
                            value={userInputUpdate}
                            type="text"
                            onChange={handleModalChange}
                            onKeyDown={handleKeyPressmodal}
                            placeholder="Введите текст"
                        />
                        <input className='checkbox' type="checkbox" checked={isChecked ? true : false} onChange={handleOnChange} />
                        <button className="item-save">Сохранить</button>
                    </form>
                </ModalInput>
            </div>
        )
    }
}

export default Todoform