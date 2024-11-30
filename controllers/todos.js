import { Todo } from '../models/todo.js' 
// Kontroller sisaldab funktsionaalsust ülesannete kuvamiseks, lisamiseks, muutmiseks ja kustutamiseks (CRUD)
class todoController {
    constructor(){
        // tühi massiiv todo objektidele
        this.TODOS = []  
    }  
    createTodo(req, res) {
        // saab andmed läbi POST-meetodi
        const task = req.body.task
        // Luuakse uus objekt läbi Todo mudeli
        // Konstruktor võtab parameetriteks id ja ülesande nime
        const newTodo = new Todo(Math.random().toString(), task)
        // Lisab massiivi uue Todo
        this.TODOS.push(newTodo)
        // korrektne vastus
        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    } 
    // meetod, mis otsib massiivis identifikaatori järgi ülesande
    updateTodo(req, res){
        // võtab urli parameetritest
        const todoId = req.params.id
        // võtab uuendatud ülesande nime
        const updatedTask = req.body.task
        // võtab massiivist elemendi indeksi, kui todo id on sama, mis url params id
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)
        // kui url params ei ole õige, saadab veateate
        if (todoIndex < 0) {
            throw new Error('Could not find todo');
        }
        
        // Kui id on korras, todo uuendatakse
        // Uuendamiseks luuakse element sama id ja uue ülesandega ning salvestatakse samasse massiivi
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)
        
        // Näitab uuendatud infot
        res.json({
            message: 'Updated todo',
            updatedTask: this.TODOS[todoIndex] 
        })
    }  
    
    // meetod, mis tagastab JSON väljundisse kõik massiivi lisatud ülesanded
    getTodos(req, res) {
        res.json({tasks: this.TODOS})
    }
} 

// Kontroller on mõistlik luua ainult üks kord, sest konstruktori kutsumist objekti loomiseks on vaja kasutada iga kord, kui tekib uus ülesanne
export const TodoController = new todoController()