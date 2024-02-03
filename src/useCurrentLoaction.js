import React, { useState, useEffect } from 'react';
import axios from 'axios';
let apiKey="82174aa7d08969d6dc0c4e59123317f8";
const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [city,setCity]=useState("");
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

  return (
    <div>
        city={city}
    </div>
  );
};

export default useCurrentLocation;
