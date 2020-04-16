console.log("Client side javascript file is loaded")

let url = 'http://localhost:3000/weather?city='
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#pLocation')
const messageTwo= document.querySelector('#pForecast')

weatherForm.addEventListener('submit', (e) =>{
e.preventDefault()
messageOne.textContent = 'Loading...'
const city = url + search.value
fetch(city).then( (response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
      
    })
})
})