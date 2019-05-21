const request=require('request')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (longitude,latitude,callback) => {
    const url='https://api.darksky.net/forecast/318fb9e477a3cee5fce86dc6b1668c42/'+latitude + ','+ longitude+'?units=si'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('error in connectivity',undefined)
        }
        else if(body.error){
            callback('location not found!try diffrent location',undefined)
        }
        else{
            callback(undefined,
                body.daily.data[0].summary+ " it is currently "+body.currently.temperature+
                " degrees out. there is a "+body.currently.precipProbability+" chances of rain"
            )
        }

    })


}
module.exports=forecast