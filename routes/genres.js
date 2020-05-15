const joi = require('joi');
const express = require('express');
const router = express.Router();

const genres = [
    {id:1,name:'Action'},
    {id:2,name:'SciFi'},
    {id:3,name:'Comedy'}
];

// Read Resource
router.get('/',(req,res) => {
    res.send(genres);
})

router.get('/:id',(req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.send("Not Found");

    res.send(genre);
})

// Create Resource
router.post('/',(req,res) => {

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
router.put('/:id',(req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.send("Not Found");

    // const result = validateGenre(req.body) Works same as result.error
    const {error} = validateGenre(req.body)
    if(error) return res.send(error.details[0].message);
    
    genre.name = req.body.name;
    res.send(genre)
})

// Delete Resource
router.delete('/:id',(req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.send("Not Found");

    const index = genres.indexOf(genre)
    genres.splice(index,1)

    res.send(genre)
})

// -- Req Body Validation Logic -- //
function validateGenre(genre){
    const schema = {
        name:joi.string().min(3).required()
    };

    return joi.validate(genre,schema);
}

module.exports = router;