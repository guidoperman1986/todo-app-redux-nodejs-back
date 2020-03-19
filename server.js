const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


//Inicializar variables
const app = express();

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS")
    next();
})

//body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//rutas
const rutas = require('./routes/routes')

app.use('/api', rutas)

//mongoose
mongoose.connection.openUri('mongodb://localhost:27017/todos',(err,res)=>{
    if (err) throw err;
    
    console.log("Base de datos online");
})


const port = 3000 | process.env.PORT;

app.listen(port,()=>console.log(`Server corriendo en el puerto ${port}`))
