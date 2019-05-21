const path=require('path')  //core module their is no need to install it.
const express=require('express')
const hbs=require('hbs')
const app=express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//define paths for express configurations
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath) 
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Shraddha'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Shraddha'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        name:'Shraddha'
    })
})
app.get('/products',(req,res)=>{
       if(!req.query.search){
            return res.send({
                message:'error'
            })
       }
       console.log(req.query.search)
        res.send({
            products:[]
        })
    }
)
app.get('/weather',(req,res)=>{
    //const place=process.argv[2]
    if(!req.query.address){
        return res.send({
            message:'error'
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={}) => {
      if (error){
          return res.send({
              error
            })
        } 
      forecast(longitude, latitude, (error, forecastData) => {
          if(error){
            return res.send({
                message:'error'
              })
          } 
          return res.send({
            location:location,
            forecastData:forecastData
            ,address:req.query.address
          })
          
        
      })

    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Shraddha',
        message:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'shraddha',
        message:'My 404 page'
})
})

app.listen(3000, ()=>{
    console.log('connected')
})