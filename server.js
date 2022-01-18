const express = require('express');
const PORT = process.env.port || 3001;
const path = require('path')


const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))

//function to start website with the html.index
app.get('/', function(request,respond){
    respond.sendFile(path.join(__dirname,'/public/index.html'))
})
//functun to open notes 
app.get('/notes',function(request,respond){
    respond.sendFile(path.join(__dirname,'public/notes.html'))
})



//exporting the website to local por 3001 on our chrome
app.listen(PORT, () =>{
    console.log(`API servervnow on port ${PORT}`);
});