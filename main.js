// import express from 'express'
// import path from 'path'

const express = require('express')
const path = require('path')
const bodyPorser = require('body-parser')

let todolist = [
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
        {id: '223', title: 'do things', isDone: false}],
    '1': []
}

const app = express()
app.use(bodyPorser.json())
app.use(bodyPorser.urlencoded({extended: true}))
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')));
const port = 4747

app.get('/api/todolists', (req, res) => {
    res.json({todolist})
})

app.get('/api/todolists/:id/tasks/:taskId', (req, res) => {
    const {id} = req.params
    const taskOfTodolist = tasks[id]
    if (id) {
        res.json({tasks: taskOfTodolist})
    } else {
        res.json({errorMessage: 'Not Found!'})
    }
})

app.post('/api/todolists', (req, res) => {
    const id = Date.now().toString()
    const newTodolist = {id, title: req.body.title}
    todolist.push(newTodolist)
    tasks[id] = []
    res.json({newTodolist})
})

app.delete('/api/todolists/:id', (req, res) => {
    const {id} = req.params
    const newTodolists = todolist.filter(t => t.id !== id)
    res.json(newTodolists)
})


app.listen(port, () => {
    console.log('server is running: ' + 4747)
})