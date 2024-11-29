import express, { Router } from 'express' // aitab luua ruuteri objekti ja kirjeldada, mis tegevused ta peab sooritama
import { TodoController } from '../controllers/todos.js' 

const router = Router()

router.post('/new-todo', (req, res) => TodoController.createTodo (req,res)) // HTTP päring ruuteri abil

export default router