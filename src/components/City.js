import React, {useState} from "react";
import axios from "axios"

function City() {


    const [city,setCity] = useState("")
    const [town,setTown] = useState("")
    const [temp,setTemp] = useState([])


    let lat = 0
    let lon = 0


    function selectCity() {

        axios.get("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "]&limit=1&appid=27fd5a07d37ccd9a97e8620005bdc88b").then(res => {

            lat = res.data[0].lat;
            lon = res.data[0].lon;

        });
    }
        function checkCity(){


        axios.get("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=27fd5a07d37ccd9a97e8620005bdc88b&units=metric").then(res => {

            setTown(res.data.city.name)
            setTemp(res.data.list.slice(0,1))

        });

    }
    function checkCityWeek(){


        axios.get("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=27fd5a07d37ccd9a97e8620005bdc88b&units=metric").then(res => {

            setTown(res.data.city.name)
            setTemp(res.data.list.filter((item, index) => !((index+1)%8)))

        });

    }

    return(
        <React.Fragment>
            <input type="text" placeholder="Название латиницей" onChange={event => setCity(event.target.value)}>
            </input>
            <button onClick={selectCity}>Выбрать город
            </button>
            <button onClick={checkCity}>На день
            </button>
            <button onClick={checkCityWeek}>На 5 дней
            </button>
            <table>
            <thead>
                <tr>
                    <th>Город</th>
                    <th></th>
                    <th></th>
                    <th>{town}</th>
                </tr>
            </thead>
            <tbody>
            {temp.map( tem => <tr>
                <th>Погода</th>
                <th>:</th>
                <th>{tem.main.temp}*C</th>
                <th></th>
                <th>{tem.weather[0].main}</th>
            </tr>)}
            </tbody>
            </table>
        </React.Fragment>
    )
}
export default City