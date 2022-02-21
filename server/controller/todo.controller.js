const db = require('../db')

class TodoController {
    async createTodo(req, res) {
        const { todo_text, complete } = req.body
        const newTodo = await db.query(`INSERT INTO todos (todo_text, complete) VALUES ($1, $2) RETURNING *`, [todo_text, complete])
        console.log(todo_text, complete)
        res.status(200).send(newTodo.rows[0])
    }
    async getTodos(req, res) {
        const todos = await db.query('SELECT * FROM todos')
        res.status(200).send(todos.rows)
    }
    async getOneTodo(req, res) {
        const id = req.params.id
        const todos = await db.query(`SELECT * FROM todos WHERE id = $1`, [id])
        res.status(200).send(todos.rows[0])
    }
    async updateTodo(req, res) {
        const { id, todo_text, complete } = req.body
        const todos = await db.query('UPDATE todos set todo_text = $1, complete = $2 where id = $3 RETURNING *', [todo_text, complete, id])
        res.status(200).send(todos.rows[0])
    }
    async deleteTodo(req, res) {
        const id = req.params.id
        const todos = await db.query(`DELETE FROM todos WHERE id = $1`, [id])
        res.status(200).send(todos.rows[0])
    }
}

module.exports = new TodoController()