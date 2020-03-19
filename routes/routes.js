const express = require('express');
const app = express();

var Todo = require('../models/todo')


app.get('/todo',(req,res)=>{
    Todo.find({})
        .exec(
            (err,todos)=>{
                if (err){
                    return res.status(500).json({
                        ok:false,
                        mensaje:'Error getting todos',
                        errors: err
                    })
                }

                Todo.count({},(err,conteo)=>{
                    res.status(200).json({
                        ok:true,
                        todos:todos,
                        total:conteo

                    })
                })

            }

        )
})

app.post('/todo',(req,res)=>{
    var body = req.body;

    var todo = new Todo({
        id:body.id,
        todo:body.todo,
        completado:body.completado
    })

    todo.save((err, todoGuardado)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error uploading todo',
                errors: err
            })
        }

        if (!todoGuardado){
            return res.status(400).json({
                ok:false,
                todoGuardado
            })
        }

        if (todoGuardado){
            return res.status(200).json({
                ok:true,
                todoGuardado
            })
        }
    })
})

app.delete('/todo/:id',(req,res)=>{
    var id = req.params.id;

    Todo.findByIdAndRemove(id,(err,todoBorrado)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error deleting todo',
                errors: err
            })
        }

        if (!todoBorrado){
            return res.status(400).json({
                ok:false,
                mensaje:'Todo does not exist',
                error: error
            })
        }

        res.status(200).json({
            ok:true,
            todo:todoBorrado
        })
    })
})

app.put('/todo/:id',(req,res)=>{
    var body = req.body;
    var id = req.params.id

    Todo.findByIdAndUpdate(id, body,(err,todoUpdated)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error updating todo',
                errors: err
            })
        }

        if (!todoUpdated){
            return res.status(400).json({
                ok:false,
                mensaje:'Todo does not exist',
                error: error
            })
        }

        res.status(200).json({
            ok:true,
            todo:todoUpdated
        })
    })

})



module.exports = app;





