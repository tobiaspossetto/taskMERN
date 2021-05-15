//SERVIDOR


//llamo a express y lo asigno a app
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();


const {mongoose} = require('./database')
//settings 

//que la aplicacion tome el puerto que le da el servicio en la nube o uno por defecto
app.set('port',process.env.PORT || 3001);

//middlewares(funciones que se ejecutan antes de llegar a las rutas)

app.use(morgan('dev'));
app.use(express.json());

// Routes

app.use('/api/tasks',require('../src/routes/task.routes'))

//Static files

app.use(express.static(path.join(__dirname,'public')));


//start the servser
//iniciamos en el puuerto 3000
app.listen(app.get('port'), () =>{
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`)
});