const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();

const Task = require('../models/task');


//para pedir al servidor
router.get('/', async (req, res) => {
   
   
   //guardo lo que pide al servidor en task
    const tasks = await Task.find()
    console.log(tasks)
    //envia
    res.json(tasks)
})

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task)
});


//para guardar en el servidor
router.post('/', async (req, res) => {
    //guarda la info en un objeto 
    const {title, description} = req.body;

    //crea un nuevo modelo con el esquema importado del archivo de modelos
    const task = new Task({title, description});

    //lo guarda en la bd
    await task.save();
    //actualiza el status
    res.json({status: 'Task guardada'})
});


//Actualizar 
//pide la id
router.put('/:id', async (req, res) => {
    //pide los valores
    const {title, description} = req.body;
    //los guarda en una constante
    const newTask = {title, description};
    //con el metodo findByIdAndUpdate(id, datos nuevos)
    //actualiza
    await Task.findByIdAndUpdate(req.params.id, newTask);

    
    res.json('actualizada')
});

router.delete('/:id', async (req, res) =>{
   await Task.findByIdAndRemove(req.params.id); 
   res.json('Eliminada')
});

module.exports = router;
