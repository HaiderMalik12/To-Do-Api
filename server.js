var bodyParser = require('body-parser');
var express=require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;
//easy way to write q query
var _ =require('underscore');

app.use(bodyParser.json());

// Get /todos?completed=true
app.get('/todos',function(req,res){

    var qureyParams=req.query;
    var filterdTodos=todos;

    if(qureyParams.hasOwnProperty('completed') && qureyParams.completed==='true')
    {
        filterdTodos= _.where(filterdTodos,{completed:true});
    }
    else if(qureyParams.hasOwnProperty('completed') && qureyParams.completed ==='false'){
        filterdTodos= _.where(filterdTodos,{completed:false});
    }

    res.json(filterdTodos);

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

//Delete /todos/:id
app.delete('/todos/:id',function(req,res){
    var todoId=parseInt(req.params.id);
    var matchedTodo= _.findWhere(todos,{id :todoId});

    if(!matchedTodo)
    {
      res.status(404).json({"error":"no todo found with that id"});
    }else{
        todos= _.without(todos,matchedTodo);
        res.json(matchedTodo);
    }
});
// PUT /todos/:id
app.put('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};

    if (!matchedTodo) {
        return res.status(404).send();
    }

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    }

    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return res.status(400).send();
    }

    _.extend(matchedTodo, validAttributes);
    res.json(matchedTodo);
});

app.listen(PORT,function()
{
    console.log('Express Listening on PORT '+PORT);
});