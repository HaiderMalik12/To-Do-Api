var bodyParser = require('body-parser');
var express=require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;
//easy way to write q query
var _ =require('underscore');

app.use(bodyParser.json());

// Get /todos
app.get('/todos',function(req,res){
    res.json(todos);
});

//Get todo/:id
app.get('/todos/:id',function(req,res){
    var todoId=parseInt(req.params.id,10);
    var macthedTodo= _.findWhere(todos,{id : todoId});

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


// POST /todos
app.post('/todos', function (req, res) {

    //var body=req.body;

    var body= _.pick(req.body,'description','completed');
    
    if(!_.isBoolean(body.completed)  || !_.isString(body.description) || body.description.trim().length === 0 ){
        //input is inValid
        return res.status(400).send();
    }

    body.description=body.description.trim();

    body.id=todoNextId++;

    //push body into array
    todos.push(body);

    //send back to the browser
    res.json(body);

});

app.listen(PORT,function()
{
    console.log('Express Listening on PORT '+PORT);
});