const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const { title } = require('process')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Expreess config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set("view engine", 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: 'Amadeo Ramirez'
    })
}) 

app.get('/about', (req,res)=> {
    res.render('about', {
        title: 'About Me',
        name: 'Amadeo Ramirez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Hello and welcome to my Weather App! Here’s how it works: simply enter any city, and the app will provide the latest weather information. You’ll see the current temperature as well as an estimate of what it actually feels like.I hope you enjoy using my Weather App!',
        title: 'Help',
        name: 'Amadeo Ramirez'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })



    // res.send({
    //     forecast: 'It is Snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amadeo Ramirez',
        errorMessage: 'Help article not found.'
    } )
})

app.get('*', (req ,res) => {
    res.render('404', {
        title: '404',
        name: 'Amadeo Ramirez',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})
          