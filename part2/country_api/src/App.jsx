import { useState, useEffect } from 'react';
import axios from 'axios';


const ClearButton = ({setValue}) =>{
    const handleClick = () => {
        setValue('')
    };
    return (
        <button onClick={handleClick}>
            Clear text
        </button>
    )

}
const Icon =()=>{}
const Weather = ({capital,API,weather,setWeather}) =>{
    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=5&appid=${API}`)
            .then(response => {
                const lat=response.data[0].lat
                const lon=response.data[0].lon
                return axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API}`);            })
            .then(response2=>{setWeather(response2.data);
            })
    }, [])
    return(
        <div>
            <p>temperature: {Math.floor(weather.current.temp - 273.15) } Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt={weather.current.weather[0].description}/>
            <p>{weather.current.weather[0].description}</p>
            <p>wind: {weather.current.wind_speed} m/s</p>
        </div>
    )
}

const Button = ({name, setValue}) =>{
    const handleClick = () => {
        setValue(name)
    };
    return (
        <button onClick={handleClick}>
            Select country
        </button>
    )
}

const Flag = (flag) => {
    return (
        <div>
            <img src={`${flag.flag.png}`} alt={`${flag.flag.alt}`}/>
        </div>
    )
}

const Languages = ({languages}) => {
    return(
        <ul>
            {Object.values(languages).map(l=><li key={l}>{l}</li>)}
        </ul>
    )
}

const Render = ({countries, value, setCountries, setValue, API, weather, setWeather}) =>{

    const listOfCountries=countries
                            .filter(c => c.name.common.toLowerCase().includes(value.toLowerCase()))
                            .map(c => (c.name.common))
    if (listOfCountries.length > 10){
        return('Too many countries')
    }
    else
    if (listOfCountries.length === 1){
        const singleCountry=countries
            .filter(c => c.name.common.toLowerCase().includes(value.toLowerCase()));
        return(
            <div>
                <h1>{singleCountry[0].name.common}</h1>
                capital {singleCountry[0].capital} <br></br>
                area {singleCountry[0].area} <br></br> <br></br>
                <b>languages</b>: <Languages languages={singleCountry[0].languages}/> <br></br>
                <Flag flag={singleCountry[0].flags}/>
                <h2> Weather in {singleCountry[0].capital}</h2>
                <Weather API={API} capital={singleCountry[0].capital} weather={weather} setWeather={setWeather}/>
            </div>
        )
    }
    return (
        <div>
            <ul>
                {(listOfCountries.length > 0) ? (
                    listOfCountries.map(name => <li key={name}> {name} <Button name={name} setCountries={setCountries} setValue={setValue}/> </li>)  ) : "no matches"}
            </ul>
        </div>
    )
}
const Countries = ({countries, value, setCountries, setValue, API, weather,setWeather}) => {

    return (
        <div>
            {value ? (<Render countries={countries} value={value} setCountries={setCountries} setValue={setValue} API={API} weather={weather} setWeather={setWeather}/>) : null}
        </div>
    );
};

const App = () => {
    const [value, setValue] = useState('')
    const [countries, setCountries] = useState({})
    const API=import.meta.env.VITE_API_KEY
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
                setCountries(response.data)})}, [])

    const handleChange = (event) => {
        setValue(event.target.value) // Update input value on change
    }

    return (
        <div>
            <form>
                <input value={value} onChange={handleChange} />
             <ClearButton setValue={setValue} /> </form>
            <Countries countries={countries} value={value} setCountries={setCountries} setValue={setValue} API={API} weather={weather} setWeather={setWeather}/>
        </div>
    )
}

export default App