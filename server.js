/**
 * Created by HaiderNazir on 1/20/2016.
 */
var express=require('express');
var app=express();
var PORT=process.env.PORT || 3000;

//---------Todos collection-------------
var todos=[{
    id:1,
    description:'Sstartup owners manual Ch 1',
    completed:false
},{
    id:2,
    description:'Design Business Model Canvas',
    completed:false
},
    {
        id:3,
        description:'Learn Database Section in Nodejs',
        completed:true
    }];

// Get /todos
app.get('/todos',function(req,res){
res.json(todos);
});

//Get todo/:id
app.get('/todos/:id',function(req,res){
    var todoId=parseInt(req.params.id,10);
    var macthedTodo;
    todos.forEach(function(todo){

        if(todo.id=== todoId){
            macthedTodo=todo;
        }
    });

    if(macthedTodo){
        res.json(macthedTodo);
    }
    else{
        res.status(404).send();
    }
});

app.get('/',function(req,res){

    res.send('To-Do-Api Root');
});

app.listen(PORT,function()
{
   console.log('Express Listening on PORT '+PORT);
});