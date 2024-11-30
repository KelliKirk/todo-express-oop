import express, { Router } from 'express' // aitab luua ruuteri objekti ja kirjeldada, mis tegevused ta peab sooritama
import { TodoController } from '../controllers/todos.js' 

const router = Router()

router.post('/new-todo', (req, res) => TodoController.createTodo (req,res)) // HTTP päring ruuteri abil
router.get('/', (req, res) => TodoController.getTodos (req, res))
router.patch('/:id', (req, res) => TodoController.updateTodo(req, res)) // patch kasutab olemasolevat andmeelementi ja uuendab selle sisu
export default router