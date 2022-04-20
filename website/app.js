// Personal API Key for OpenWeatherMap API
let baseURL = 'api.openweathermap.org/data/2.5/weather';
let apiKey = '76aa91139c7537d1992cc3e86268bd28';

// Event listener to add function to existing HTML DOM element
document.getElementById('go').addEventListener('click', taskToPerform);

/* Function called by event listener */
function taskToPerform(e){
    const location =  document.getElementById('zipCode').value;
    getLocation(baseURL,location, apiKey)
    }

/* Function to GET Web API Data*/
const getLocation = async (baseURL, zipCode, key)=>{

    const res = await fetch(baseURL+zipCode+key)
    try {
  
      const appData = await res.json();
      console.log(appData)
      return appData;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

/* Function to POST data */


/* Function to GET Project Data */