


// Optional: puzzle API test
fetch('https://puzzle.mead.io/puzzle')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))

// DOM elements
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const unitsSelect = document.querySelector('#units')

// Form submit handler
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value.trim()
    const units = unitsSelect.value

    if (!location) {
        messageOne.textContent = 'Please enter a location'
        messageTwo.textContent = ''
        return
    }

    // Show loading while fetching
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // Fetch from backend
    fetch(`/weather?address=${encodeURIComponent(location)}&units=${units}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
        .catch(error => {
            messageOne.textContent = 'Unable to fetch weather'
            messageTwo.textContent = ''
            console.error(error)
        })
})


// // const { response } = require("express")

// console.log("Weather app loaded")

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
//     .catch(err => console.error(err))
// })

// const weatherForm = document.querySelector('form')
// const search = document.querySelector('input')
// const messageOne = document.querySelector('#message-1')
// const messageTwo = document.querySelector('#message-2')

// const unitsSelect = document.querySelector('#units')
// const units = unitsSelect.value

// fetch(`https://localhost:3000/weather?addres=` + location).then((response) =>{
//     response.json().then((data) => {
//         if (data.error){
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

// weatherForm.addEventListener('submit', (e) => {
//        e.preventDefault() 
//        const location = search.value.trim()
//        const units = unitsSelect.value
       
//        if (!location) {
//         messageOne.textContent = 'Please enter location'
//         messageTwo.textContent = ''
//         return
//        }

//        messageOne.textContent = 'Loading...'
//        messageTwo.textContent = ''

//        fetch(`/weather?address=${encodeURIComponent(location)}&units=${units}`)
//        .then((response) => response.json())
//        .then((data) => {
//            if (data.error) {
//             messageOne.textContent = data.error
//             messageTwo.textContent = ''
//            } else {
//             messageOne.textContent = data.location
//             messageTwo.textContent = data.forecast
//            }
//         })
//         .catch((error) => {
//             messageOne.textContent = 'Unable to fetch weather'
//             messageTwo.textContent = ''
//             console.error(error)
//         })
//     })
//         //        console.log(data.error)
//         //    } else {
//         //        console.log(data.location)
//         //        console.log(data.forecast)
//         //    }
// // if (weatherForm) {
// //         }