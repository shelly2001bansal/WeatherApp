import React,{useState ,useEffect} from 'react'
import axios from'axios'
import wind_icon  from './assest/wind.png'
import humidity_icon from './assest/humidity.png'
import cloud_icon from './assest/cloud.png'
import clear_icon from './assest/clear.png'
import snow_icon from './assest/snow.png'
import drizzle_icon from './assest/drizzle.png'
import rain_icon from './assest/rain.png'
import haze_icon from './assest/haze.png'
import clear_image from './assest/clear-Image1.jpg'
import cloud_image from './assest/cloud_image1.jpg'
import drizzle_image from './assest/drizzle_image.jpg'
import rain_image from './assest/rain_image.jpg'
import haze_image from './assest/haze_image.jpg'
import snow_image from './assest/snow_image.jpg'
import weather_image from './assest/weather_image.jpg'


let apiKey="82174aa7d08969d6dc0c4e59123317f8";
const WeatherSearch=(props)=>{
    const [location, setLocation] = useState(null);
    const [city,setCity]=useState("");
    const[query,setQuery]=useState("");
    const[weathers,setWeathers]=useState([]);
    const[icon,setIcon]=useState(cloud_icon);
    const[style,setStyle]=useState({
        backgroundImage:`url(${weather_image})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
    });


    function handleCurrent(){
        setQuery(city);
    }

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
                console.log(latitude,longitude)
              // Fetch city name using reverse geocoding
                const response = await axios.get(
                  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
                );
    
                setCity(response.data.name);
            })
        }
            
      }, []);
    

    const handleSearch= async()=>{
       
        const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=Metric&appid=${apiKey}`)
        console.log(response.data);
        if(response.data) setWeathers([response.data]);
        if(response.data.weather[0].icon==="01d"||response.data.weather[0].icon==="01n")
        {
            setIcon(clear_icon);
            setStyle({
                backgroundImage:`url(${clear_image})`,
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
            })
        }
        else if( response.data.weather[0].icon==="02d"||response.data.weather[0].icon==="02n")
        {
            setIcon(cloud_icon);
            setStyle({
                backgroundImage:`url(${cloud_image})`,
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
            })
        }
        else if( response.data.weather[0].icon==="03d"||response.data.weather[0].icon==="03n")
        {
            setIcon(drizzle_icon);
            setStyle({
                backgroundImage:`url(${rain_image})`,
                opacity:0.5,
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
                objectFit:'contain'
            })
            
        }
        else if( response.data.weather[0].icon==="04d"||response.data.weather[0].icon==="04n")
        {
            setIcon(drizzle_icon);
            setStyle({
                backgroundImage:`url(${rain_image})`,
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
                
                
            })
        }
        else if( response.data.weather[0].icon==="09d"||response.data.weather[0].icon==="09n")
        {
            setIcon(rain_icon);
            setStyle({
                backgroundImage:`url(${drizzle_image})`,
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
                
            })
           
        }
        else if( response.data.weather[0].icon==="10d"||response.data.weather[0].icon==="10n")
        {
            setIcon(rain_icon);
            setStyle({
                
                
                backgroundImage:`url(${drizzle_image})`,
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
                
            })
        }
        else if( response.data.weather[0].icon==="13d"||response.data.weather[0].icon==="13n")
        {
            setIcon(snow_icon);
            setStyle({
                
                backgroundImage:`url(${snow_image})`,
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
                
            })
        }
        else if( response.data.weather[0].icon==="50d" || response.data.weather[0].icon==="50n")
        {
            setIcon(haze_icon);
            setStyle({
               
                backgroundImage:`url(${haze_image})`,
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
                
            })
        }
        
        else{
            setIcon(clear_icon);
            setStyle({
            
                backgroundImage:`url(${clear_image})`,
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
              
            })

        }
        setQuery("");

    }
    return(
    <div  className="a" style={style} >
        <div className='container' >
            <h1 className='heading' >Weather search</h1>
            <input type='text' placeholder='search for preferd location' value={query} onChange={(e)=>setQuery(e.target.value)}/>
            <button onClick={handleSearch} className='sbutton'>Search</button>
            <button onClick={handleCurrent} ><img className='cimage' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx3FNPm11WNEQnsxBsXtGFvkKepD7QRgk_Og&usqp=CAU' alt="current" /></button>
            <div>
                {weathers.map((weather)=>{
                    return(
                        <div key={weather.name} className='a1' >
                            <img src={icon} alt='cloud.png'/>
                            <h1 className='a3'>{weather.main.temp} °c</h1>
                            <p className='a2'>{weather.name}</p>
                            <div className='a4'>
                                <div>
                                <img className='a12'src={wind_icon} alt='wind'/>
                                <p className='a5'>  <b>{weather.wind.speed} km/h</b><p>wind speed</p></p>
                                </div>
                                <div>
                                    <img className='a12'src={humidity_icon} alt='wind'/>
                                    <p className='a6'><b>{weather.main.humidity} %</b><p>humidity</p></p>
                                </div>
                                
                            </div>
                        </div>
                    );
                }
   
                )}
            </div>
            
        </div>
    </div>
    );
}
export default WeatherSearch;