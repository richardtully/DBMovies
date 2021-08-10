require('dotenv').config()
const { MovieTable } = require('./models').models
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const port = 3000


app.set("viewengine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + 'public'))
app.use(methodOverride('_method'))


app.get('/', async (req,res) => {
    const movies = await MovieTable.findAll({})
    res.render('app.ejs', {
        movies: movies
    })
})

app.post('/', async (req,res)=> {
    await MovieTable.create({
        name: req.body.new_movie_name,
        rating: req.body.new_movie_rating,
        url: req.body.new_movie_url,
        description: req.body.new_movie_description
    })
    res.redirect('/')
})

app.delete('/:movie_id', async(req,res) => {
    await MovieTable.destroy({
        where: {movie_id: req.params.movie_id}
    })
    res.redirect('/')
})

app.get('/update/:movie_id', async(req,res) => {
    const currentMovie = await MovieTable.findOne({
        where: {movie_id: req.params.movie_id}
    })
    res.render('update.ejs',{
        currentMovie: currentMovie
    })
})

app.put('/update/:movie_id', async(req,res) => {
    console.log(req.body.name)
    await MovieTable.update({
        name: req.body.new_movie_name,
        url: req.body.new_movie_url,
        rating: req.body.new_movie_rating,
        description: req.body.new_movie_description
    },{
        where: {movie_id: req.params.movie_id}
    })

    res.redirect('/')
})

app.listen(port,()=>{
    console.log(`Movies listening at ${port}`)
    }
)
