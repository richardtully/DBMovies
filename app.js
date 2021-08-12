require('dotenv').config()
const { movietable } = require('./models')
const { Comments } = require('./models')
const { tags } = require('./models')
const { movietabletags } = require('./models')

const express = require('express')
const methodOverride = require('method-override')
const app = express()
const port = 3000


app.set("viewengine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + 'public'))
app.use(methodOverride('_method'))


app.get('/', async (req,res) => {
    const Movies = await movietable.findAll({
        include : {
            all:true
        }
        
        // include: [ 
        //     {model: Comments, attributes: ['text'] }, 
        //     {model: tags, attributes: ['name']} 
        // ]
    })
    
    // console.log('comments')
    // console.log(Movies["Comments"])
    // console.log('tags')
    // // Movies.tags.forEach(i => console.log(i))
    
    res.render('app.ejs', {
        movies: Movies,
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

app.post('/tag/:id', async(req, res) => {
    let tag = await tags.findOne({
        where : { 
            name : req.body.tag
        }
    })
    if( !(tag) ) {
         tag = await tags.create({
            name: req.body.tag,
        })
    }
    await movietabletags.create({
        movietableId : req.params.id,
        tagId  : tag.id
    })

    res.redirect('/')
})

app.post("/tagsearch" , async (req,res) => {
    // special methods/mixins ???
    const Movie = movietabletags.findAll({
        include: [{
          model: movietabletags,
          as: 'tagsId',
          include: [{
            model:  tags,
            where: {
              name: req.body.tagsearch
            },
            required: false
          }]
        }]
      })
      console.log(Movie)

    // const movieSearch = await movietabletags.findAll({
    //     where : {
    //         tagId : req.body.tagsearch
    //     }
    // })

    // const Movies = await movietable.findAll({
    //     where : { 

    //     },
    //     include : {
    //         all:true
    //     }
    // })
        res.render('app.ejs', {
            movies:Movie
        })
})

app.listen(port,()=>{
    console.log(`Movies listening at ${port}`)
    }
)
