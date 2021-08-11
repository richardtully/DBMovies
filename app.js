require('dotenv').config()
const { movietable } = require('./models')
const { Comments } = require('./models')
const { tags } = require('./models')
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const port = 3000


app.set("viewengine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + 'public'))
app.use(methodOverride('_method'))


app.get('/', async (req,res) => {
    const movies = await movietable.findAll({})
    const comment = await Comments.findAll({})
    const tag = await tags.findAll({})
    res.render('app.ejs', {
        movies: movies,
        comments: comment,
        tags: tag
    })
})

app.post('/', async (req,res)=> {
    await movietable.create({
        name: req.body.new_movie_name,
        rating: req.body.new_movie_rating,
        url: req.body.new_movie_url,
        description: req.body.new_movie_description
    })
    res.redirect('/')
})

app.delete('/:id', async(req,res) => {
    await movietable.destroy({
        where: {id: req.params.id}
    })
    res.redirect('/')
})

app.get('/update/:id', async(req,res) => {
    const currentMovie = await movietable.findOne({
        where: {id: req.params.id}
    })
    res.render('update.ejs',{
        currentMovie: currentMovie
    })
})

app.put('/update/:id', async(req,res) => {
    console.log(req.body.name)
    await movietable.update({
        name: req.body.new_movie_name,
        url: req.body.new_movie_url,
        rating: req.body.new_movie_rating,
        description: req.body.new_movie_description
    },{
        where: {id: req.params.id}
    })

    res.redirect('/')
})

app.post('/comment/:id', async(req, res) => {
    await Comments.create({
        text: req.body.comment,
        movietableId: req.params.id
    })
    res.redirect('/')
})

app.listen(port,()=>{
    console.log(`Movies listening at ${port}`)
    }
)
