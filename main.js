//la apikey sirve para reconocer que soy un usuario autorizado para utilizarla
const APIKEY = '2a24efee8795d3e00ab974f54c8e22cf'

const form = document.getElementById('form')
const inputSearch = document.getElementById('search')
const main = document.getElementById('main')

const cityNotFound = 404

//funcion que obtiene el clima por medio de la ciudad ingresada con ASYN y AWAIT
const getWeatherByCity = async (city, APIKEY) => {
    //utilizar fetch para realizar la consulta a la API (SIENPRE USAR ` `)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)
    //validar ciudades si existen o no
    if (response.status === cityNotFound) {
        Toastify({
            text: 'La ciudad no fue encontrada!',
            duration: 3000,
            styles: {
                background: '#25282A'
            }
        }).showToast()
    }

    const data = await response.json()
    showWeather(data)
}

const showWeather = (data) => {
    const temp = getCelcius(data.main.temp)
    const div = document.createElement('div')
    div.classList.add('weather')

    div.innerHTML = `
        <h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/> ${temp}
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
        </h2>
        <small>${data.weather[0].main}</small>
    `
    main.innerHTML = ''
    main.appendChild(div)
}

const getCelcius = (kelvin) => {
    return Math.floor(kelvin - 274.15)
}



//evento que guarda relacion con el envio del formulario
form.addEventListener('submit', (e) => {
    //evitar que la pagina se recargue al enviar el formulario
    e.preventDefault()
    const city = inputSearch.value

    if (city) {
        //funcion que obtiene el clima por medio de la ciudad ingresada
        getWeatherByCity(city, APIKEY)
    }
})





//yo lo que hice fue crear las cards de los productos directamente dentro de la arrow function posts