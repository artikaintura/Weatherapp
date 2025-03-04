import React, { useState } from "react";
import axios from 'axios';
import './home.css'
function Home() {
    const [data, setData] = useState({
        celsius:'',
        name: '',
        humidity:'',
        speed: '',
        image: './images/weather.png'
    })
    const [name, setName] = useState('');

    const handleClick = () => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=862bf7180075efd847466b444fb3d92c&&units=metric`;
            axios.get(apiUrl)
                .then(res => {
                    let imagePath = '';
                    if (res.data.weather[0].main === "Clouds") {
                        imagePath = "./images/clouds.png"
                    } else if (res.data.weather[0].main === "Clear") {
                        imagePath = "./images/clear.webp"
                    } else if (res.data.weather[0].main === "Rain") {
                        imagePath = "./images/rain.webp"
                    } else if (res.data.weather[0].main === "Drizzle") {
                        imagePath = "./images/drizzle.webp"
                    } else if (res.data.weather[0].main === "Mist") {
                        imagePath = "./images/mist.webp"
                    }else if (res.data.weather[0].main === "Snow") {
                        imagePath = "./images/snow.webp"
                    }
                     else {
                        imagePath = "./images/weather.png"
                    }
                    console.log(res.data);
                    setData({
                        ...data, celsius: res.data.main.temp,
                        name: res.data.name,
                        humidity: res.data.main.humidity,
                        speed: res.data.wind.speed,
                        image: imagePath
                    })
                })
                .catch(err => console.log(err));
        }
    }
    return (
        <div className="container">
            <div className="weather">
                <div className="search">
                    <input type="text" placeholder="Enter City" onChange={e => setName(e.target.value)} />
                    <button><img src="./images/search.jpg" onClick={handleClick} alt="" /></button>
                </div>
                <div className="winfo">
                    <img src={data.image} alt="" className="icon" />
                    <h1>{data.celsius} °C</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src="./images/humidity.webp" alt="" />
                            <div className="humidity">
                                <p>{data.humidity} %</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src="./images/wind.png" alt="" />
                            <div className="wind">
                                <p>{data.speed} km/h</p>
                                <p>Wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;