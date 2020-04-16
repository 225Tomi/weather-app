const path = require('path')
const express = require('express')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const app = express()
//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

 
app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Tamas Gaal',
        headerText: 'Weather App',
        footerText: 'Created by Tamás Gaál'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        helpTitle: 'Heeeeeeeeelp!!!!!',
          headerText:'Kutya',
          footerText: 'footer text'
        })

})
app.get('/about', (req,res)=>{
res.render('about', {
    headerText: 'About',
    footerText: 'footer text'
})
})
app.get('/weather', (req,res)=>{
//debugger
let city = req.query.city;
if(!city){
   return res.send({
        error: "Fill the city parameter!"
    })
} 
geocode(city  , (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: "Wrong location parameter"
            })
        }else{
            forecast(latitude,longitude, (error, oForecastData) => {
               if(error){
                return res.send({
                    error: "No forecast found"
                })
               } 
             /*   res.render('weather', {
                    location,
                    forecast: oForecastData, 
                    headerText: 'Weather',
                    footerText: 'Footer'
                })*/
              res.send({
                    location,
                   forecast: oForecastData
             })
            })
        }
    })
})
app.get('/help/*', (req,res)=>{
   res.render('404', {
       headerText: 'Help article not found'
   })
})
app.get('*', (req,res)=>{
    res.render('404', {
        headerText: 'Article not found'
    })
})
app.listen(3000, ()=>{
    console.log("The server did start correctly")
})