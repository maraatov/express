const express = require('express')
const path = require('path')
const bodyPorser = require('body-parser')

let todolists = [
    {
        id: '1',
        title: 'My todolist'
    },
    {
        id: '2',
        title: 'My todo2'
    }
];


let tasks = {
    '1': [{id: '123', title: 'do adwad', isDone: false},
        {id: '223', title: 'do things', isDone: true}],

    '2': [{id: '3332', title: 'task2', isDone: false},
        {id: '232', title: 'task3', isDone: true}],
}

const app = express()
app.use(bodyPorser.json())
app.use(bodyPorser.urlencoded({extended: true}))
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')));
const port = 4747

app.get('/api/todolists', (req, res) => {
    res.json({todolists})
})

app.get('/api/todolists/:id/tasks', (req, res) => {
    const {id} = req.params
    if (id) {
        res.json({tasks: tasks[id]})
    } else {
        res.json({errorMessage: 'Not Found!'})
    }
})

app.post('/api/todolists/:id/tasks', (req, res) => {
    const {id} = req.params
    if (id) {
        const newTask = {id: Date.now().toString(), title: req.body.title}
        tasks[id].push(newTask)
        res.json({tasks: newTask})
    } else {
        res.json({errorMessage: 'don not create task'})
    }
})

app.put('/api/todolists/:id/tasks/:taskId', (req, res) => {
    const id = req.params.id
    const taskId = req.params.taskId
    if (id) {
        tasks[id] = tasks[id].map(t => t.id === taskId ? {...t, title: req.body.title} : {...t})
        res.json({tasks})
    } else {
        res.json({errorMessage: 'sorry man('})
    }
})

app.delete('/api/todolists/:id/tasks/:taskId', (req, res) => {
    const id = req.params.id
    const taskId = req.params.taskId
    if (id) {
        tasks[id] = tasks[id].filter(t => t.id !== taskId)
        res.json({tasks})
    } else {
        res.json({errorMessage: 'бля не получилось удалить'})
    }
})

app.post('/api/todolists', (req, res) => {
    const id = Date.now().toString()
    const newTodolist = {id, title: req.body.title}
    todolists.push(newTodolist)
    tasks[id] = []
    res.json({newTodolist})
})

app.delete('/api/todolists/:id', (req, res) => {
    const {id} = req.params
    let newTodolist = todolists.filter(t => t.id !== id)
    todolists = newTodolist
    res.json({newTodolist})
})

app.put('/api/todolists/:id', (req, res) => {
    const {id} = req.params
    todolists = todolists.map(t => t.id === id ? {...t, title: req.body.title} : {...t})
    res.json({todolists})
})


app.listen(port, () => {
    console.log('server is running: ' + 4747)
})