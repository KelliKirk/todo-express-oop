import { Todo } from '../models/todo.js' 
// Kontroller sisaldab funktsionaalsust ülesannete kuvamiseks, lisamiseks, muutmiseks ja kustutamiseks (CRUD)
class todoController {
    constructor(){
        // tühi massiiv todo objektidele
        this.TODOS = []  
    }  

    // Meetod peab olema klassi sees
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
} 

// Kontroller on mõistlik luua ainult üks kord, sest konstruktori kutsumist objekti loomiseks on vaja kasutada iga kord, kui tekib uus ülesanne
export const TodoController = new todoController()