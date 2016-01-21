/**
 * Created by HaiderNazir on 1/20/2016.
 */
var express=require('express');
var app=express();
var PORT=process.env.PORT || 4000;

app.get('/',function(req,res){

    res.send('To-Do-Api Root');
});

app.listen(PORT,function()
{
   console.log('Express Listening on PORT '+PORT);
});