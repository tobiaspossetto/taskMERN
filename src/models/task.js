const mongoose = require('mongoose');
const {Schema} = mongoose;
//llamo a mongo

//creo un modelo de la tarea
const TaskSchema = new Schema({
    title: {type: 'string', required: true},
    description: {type: 'string', required: true}

});


//exporto el modulo
module.exports = mongoose.model('Task', TaskSchema);