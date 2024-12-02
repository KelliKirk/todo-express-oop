import { Todo } from '../models/todo.js' 
import { fileManager } from '../files.js'

// Kontroller sisaldab funktsionaalsust ülesannete kuvamiseks, lisamiseks, muutmiseks ja kustutamiseks (CRUD)
class todoController {
    constructor(){
        // tühi massiiv todo objektidele
        this.TODOS = []  
        this.initTodos() // saab andmed failist ja salvestab massiivi
    }  
        async createTodo(req, res) {
        // saab andmed läbi POST-meetodi
        const task = req.body.task
        // Luuakse uus objekt läbi Todo mudeli
        // Konstruktor võtab parameetriteks id ja ülesande nime
        const newTodo = new Todo(Math.random().toString(), task)
        // Lisab massiivi uue Todo
        this.TODOS.push(newTodo)
        // andmete faili salvestamine
        await fileManager.writeFile('./data/todos.json', this.TODOS)
        // korrektne vastus
        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    } 

    async initTodos(){
        const todosData = await fileManager.readFile('./data/todos.json')
        // kui andmed on korras, lisa faili sisu massiivi
        if(todosData !== null){
            this.TODOS = todosData
        } else {
            this.TODOS = [] // kui andmeid ei saa, luuakse tühi massiiv 
        } 
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
    
    // Andmete kustutamine
    deleteTodo(req, res) {
        // Võtab URL parameetritest ülesande ID
        const todoId = req.params.id;
        
        // Otsib massiivist ülesande indeksit, mille ID on sama nagu URL parameetris
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);
        
        // Kui ei leita, tagastatakse veateade
        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Could not find todo to delete' });
        }
    
        // Eemaldab ülesande massiivist
        this.TODOS.splice(todoIndex, 1) // 1 määrab, mitu elementi eemaldatakse alates todoIndex positsioonist
    
        // Tagastab edukuse sõnumi
        res.json({ message: 'Todo deleted successfully' });
    }
    
} 

// Kontroller on mõistlik luua ainult üks kord, sest konstruktori kutsumist objekti loomiseks on vaja kasutada iga kord, kui tekib uus ülesanne
export const TodoController = new todoController()