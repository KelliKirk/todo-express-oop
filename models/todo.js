// Tekitame klassi, mis vastutab uute ülesannete loomise eest
// Eksport, sest seda faili kasutatakse edaspidi ka muu faili poolt
export class Todo {
    constructor(id, task){
        this.id = id
        this.task = task
    } 
} 