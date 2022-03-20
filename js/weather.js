const sub = document.getElementById("result");
sub.addEventListener("click", (e) => {
  e.preventDefault();
  let city = document.getElementById("city").value;
  let state = document.getElementById("state").value;
  let country = document.getElementById("country").value;
  
  if ((city === "" || country === "")) {
    alert("Please enter in the required fields");
  }
  else {
    if (city !== "" && state !== "" && country !== "") {
      var combined = city + "%2C" + state + "%2C" + country;
      var combined2 = city + ',' + state + ',' + country;
    } else if (city !== "" && state === "" && country !== "") {
      var combined = city + "%2C" + country;
      var combined2 = city + ',' + country;
    }
    fetch(
      `https://visual-crossing-weather.p.rapidapi.com/forecast?location=${combined}&aggregateHours=24&shortColumnNames=0&unitGroup=metric&contentType=json`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "visual-crossing-weather.p.rapidapi.com",
          "x-rapidapi-key":
            "de03804f4emsh60707878b7a7e67p111343jsndbb81b8769f9",
        },
      })
      .then((response) => {
        return response.json();
      })
      .then((actual_data) => {
        var curr = actual_data.locations[`${combined2}`];
        let add = curr.address;
        let lat = curr.latitude;
        let long = curr.longitude;
        var curr_cond = curr.currentConditions;
        function isEmpty(obj) {
          for(var prop in obj) {
            if(Object.prototype.hasOwnProperty.call(obj, prop)) {
              return false;
            }
          }
        
          return JSON.stringify(obj) === JSON.stringify({});
        }
        
        if(isEmpty(curr_cond)){
          let data = curr.values[0];
          document.open();
          document.write('<link rel="stylesheet" href="js/weather.css"/>');
          document.write("<h1 id = 'head' class='jstext head'>Today's Forecasted Data</h1>")
          document.write(`<h2 id = 'add' class='jstext'><i>${add}</i></h2>`)
          document.write(`<h2 class='jstext'> Average Temperature: ${data.temp}℃</h2>`)
          document.write(`<h2 class='jstext'>Weather condition: ${data.conditions}</h2>`)
          document.write(`<h2 class='jstext'>Visibility : ${data.visibility} km</h2>`)
          document.write(`<h2 class='jstext'>UV index : ${data.uvindex}</h2>`)
          document.write(`<h2 class='jstext'>Humidity : ${data.humidity}</h2>`);
          document.write(`<h2 class='jstext'>Max Temp: ${data.maxt}℃</h2>`);
          document.write(`<h2 class='jstext'>Min Temp: ${data.mint}℃</h2>`);
          document.write(`<h2 id = 'bot' class='jstext'>CloudCover :${data.cloudcover}</h2>`);
          document.close();

        }

        else{
           let addr = curr['address'];
           let vis = curr_cond['visibility'];
           let temp = curr_cond['temp'];
           let spd = curr_cond['wspd'];
           let hum = curr_cond['humidity'];
           let icon = curr_cond['icon'];
           document.open();
           document.write('<link rel="stylesheet" href="js/weather.css"/>');
           document.write("<h1 id = 'head' class='jstext head'>Current Weather</h1>")
           document.write(`<h2 id = 'add' class='jstext'><i>${addr}</i></h2>`)
           document.write(`<h2 class='jstext'>Temperature: ${temp}℃</h2>`)
           document.write(`<h2 class='jstext'>Conditions: ${icon}</h2>`)
           document.write(`<h2 class='jstext'>Visibility : ${vis} km</h2>`)
           document.write(`<h2 class='jstext'>Humidity : ${hum}</h2>`);
           if(spd != null && spd != undefined){
            document.write(`<h2 class='jstext'>Wind Speed: ${(spd != null && spd != undefined)?spd:0} km/h</h2>`);
           }
    
           document.close();
           
        }
        
        console.log(curr);
      })
      .catch((err) => {
        console.log(err);
      });


    }
});
