const express = require('express')
const todoRouter = require('./routes/todo.routes')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });
app.use('/api', todoRouter)





app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) 



// const start = async () => {
//     try {
//         await sequelize.authenticate()
//         await sequelize.sync()
//         app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
//     } catch (e) {
//         console.log(e)
//     }
// }

// start()
