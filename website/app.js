// Personal API Key for OpenWeatherMap API
let baseURL = 'api.openweathermap.org/data/2.5/weather/';
let apiKey = '76aa91139c7537d1992cc3e86268bd28';

// Event listener to add function to existing HTML DOM element
document.getElementById('go').addEventListener('click', taskToPerform);

/* Function called by event listener */
function taskToPerform(e){
    const location =  document.getElementById('zipCode').value;
    const comments =  document.getElementById('comments').value;
    getData(baseURL,location, apiKey)
    }

/* Function to GET Web API Data*/
const getData = async (baseURL, location, key)=>{

    const res = await fetch(baseURL+location+key)
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
const postData = async (url = '', appData = {}) =>{
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      temperature: appData.temperature, 
      date: appData.date, 
      comments: appData.comments
    )
  });
  try {
  
    const newData = await res.json();
    console.log(newData)
    return newData;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}


/* Function to GET Project Data */