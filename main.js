const codes={
        0: ['Clear Sky','CLEAR_DAY'],
        1: ['Mainly clear, partly cloudy, and overcast','CLEAR_DAY'],
        2: ['Mainly clear, partly cloudy, and overcast','CLEAR_DAY'],
        3: ['Mainly clear, partly cloudy, and overcast','CLEAR_DAY'],
        45: ['Fog and depositing rime fog','FOG'],
        48: ['Fog and depositing rime fog','FOG'],
        51: ['Drizzle: Light, moderate, and dense intensity','RAIN'],
        55: ['Drizzle: Light, moderate, and dense intensity','RAIN'],
        53: ['Drizzle: Light, moderate, and dense intensity','RAIN'],
        56: ['Freezing Drizzle: Light and dense intensity','RAIN'],
        57: ['Freezing Drizzle: Light and dense intensity','RAIN'],
        61: ['Rain: Slight, moderate and heavy intensity','RAIN'],
        63: ['Rain: Slight, moderate and heavy intensity','RAIN'],
        65: ['Rain: Slight, moderate and heavy intensity','RAIN'],
        66: ['Freezing Rain: Light and heavy intensity','RAIN'],
        67: ['Freezing Rain: Light and heavy intensity','RAIN'],
        71: ['Snow fall: Slight, moderate, and heavy intensity','SNOW'],
        73: ['Snow fall: Slight, moderate, and heavy intensity','SNOW'],
        75: ['Snow fall: Slight, moderate, and heavy intensity','SNOW'],
        77: ['Snow grains','SNOW'],
        80: ['Rain showers: Slight, moderate, and violent','RAIN'],
        81: ['Rain showers: Slight, moderate, and violent','RAIN'],
        82: ['Rain showers: Slight, moderate, and violent','RAIN'],
        85: ['Snow showers slight and heavy','RAIN'],
        86: ['Snow showers slight and heavy','RAIN'],
        95: ['Thunderstorm: Slight or moderate','RAIN'],
        96: ['Thunderstorm with slight and heavy hail','RAIN'],
        99: ['Thunderstorm with slight and heavy hail','RAIN']
 }

//when the page loads:
window.addEventListener('load',()=>{
    const tempDegree= document.querySelector('.temperature-degree'); 
    const degreeType= document.querySelector('#degree-type');
    const tempDes= document.querySelector('.temperature-description');
    const timeZone= document.querySelector('.location-timezone');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            console.log(position);
            let longitude= position.coords.longitude;
            let latitude= position.coords.latitude;

            const api_URL= new URL(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);

            //make a request to the API with the lat and long values
            fetch(api_URL)
                .then(Response=>{
                    return Response.json();
                })
                .then(data=>{
                    console.log(data);
                    const degree= data.current_weather.temperature;
                    tempDegree.textContent= `${degree}`;
                    degreeType.textContent= 'C';

                    const weatherCode= data.current_weather.weathercode;
                    const description= codes[weatherCode][0];
                    tempDes.textContent=description + '.';

                    timeZone.textContent= data.timezone;
                    
                    setIcons(codes[weatherCode][1],document.querySelector('.icon'))
                });
        });
    }
    //set Skycons
    const setIcons=(icon, iconID)=>{
        const skycons= new Skycons({color:'white'});
        skycons.play();
        return skycons.set(iconID, Skycons[icon])
    }
})

