const joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json())

const genres = [
    {id:1,name:'Action'},
    {id:2,name:'SciFi'},
    {id:3,name:'Comedy'}
];

// Homepage Dafault
app.get('/',(req,res) => {
    res.send("Hello World please visit on /api/genres");
})

// Read Resource
app.get('/api/genres',(req,res) => {
    res.send(genres);
})

app.get('/api/genres/:id',(req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.send("Not Found");

    res.send(genre);
})

// Create Resource
app.post('/api/genres',(req,res) => {

    // const result = validateGenre(req.body) Works same as result.error
    const {error} = validateGenre(req.body);
    if(error) return res.send(error.details[0].message);

    const genre = {
        id:genres[genres.length-1].id+1,
        name:req.body.name
    };

    genres.push(genre);
    res.send(genre);
})

// Update Resource
app.put('/api/genres/:id',(req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.send("Not Found");

    // const result = validateGenre(req.body) Works same as result.error
    const {error} = validateGenre(req.body)
    if(error) return res.send(error.details[0].message);
    
    genre.name = req.body.name;
    res.send(genre)
})

// Delete Resource
app.delete('/api/genres/:id',(req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.send("Not Found");

    const index = genres.indexOf(genre)
    genres.splice(index,1)

    res.send(genre)
})

//\\ --  Req Body Validation Logic  -- //\\
function validateGenre(genre){
    const schema = {
        name:joi.string().min(3).required()
    };

    return joi.validate(genre,schema);
}

const port = process.env.PORT || 5000;
app.listen(port,() => console.log(`Listening on Port ${port} ..`));