window.addEventListener('load',()=>{
    const temperatureDegree= document.querySelector('.temperature-degree'); 

    const degreeType= document.querySelector('#degree-type');

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
                    const degree= data.current_weather.temperature;
                    temperatureDegree.innerHTML= `${degree}`;

                    degreeType.innerHTML= 'C'
                })
        });

    }
})

