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
    
    updateTodo(req, res){
        const todoId = req.params.id;
        console.log("Received todoId from URL:", todoId);
        
        // võtab uuendatud ülesande nime
        const updatedTask = req.body.task;
        
        // otsib massiivist todo objekti
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);
        console.log("PATCH received for id:", todoId);
        console.log("Updated task:", updatedTask);
        console.log("todo array before update:", this.TODOS);
    
        // kui url params ei ole õige, saadab veateate
        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Could not find todo' });
        }
    
        console.log("Found todo at index:", todoIndex);
        
        // Kui id on korras, todo uuendatakse
        // Uuendamiseks luuakse element sama id ja uue ülesandega ning salvestatakse samasse massiivi
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask);
        
        // Näitab uuendatud infot
        res.json({
            message: 'Updated todo',
            updatedTask: this.TODOS[todoIndex] 
        });
    }  
     
    
    // meetod, mis tagastab JSON väljundisse kõik massiivi lisatud ülesanded
    getTodos(req, res) {
        res.json({tasks: this.TODOS})
    }
} 

// Kontroller on mõistlik luua ainult üks kord, sest konstruktori kutsumist objekti loomiseks on vaja kasutada iga kord, kui tekib uus ülesanne
export const TodoController = new todoController()