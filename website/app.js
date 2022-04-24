// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Personal API Key for OpenWeatherMap API
let baseURL = 'api.openweathermap.org/data/2.5/weather/?zip=';
let apiKey = '&appID=76aa91139c7537d1992cc3e86268bd28';

// Event listener to add function to existing HTML DOM element
document.getElementById('go').addEventListener('click', taskToPerform);

/* Function called by event listener */
function taskToPerform(e){
  const location =  document.getElementById('zipCode').value;
  const country =  document.getElementById('country').value;
  const comments =  document.getElementById('comments').value;

  getData(baseURL,location, apiKey)

    .then(function(data){
        console.log(data);
        postData('/add', {date:d, temperature:data.temperature, comments: data.comments});
        updateUI();
    })
};

/* Function to GET Web API Data*/
const getData = async (baseURL, location, apiKey)=>{

  // http://127.0.0.1:5500/Projects/Weather-Journal-App/website/api.openweathermap.org/data/2.5/weather/V6B1B47/6aa91139c7537d1992cc3e86268bd28
    const res = await fetch(baseURL+location+apiKey)
    try {
  
      const Data = await res.json();
      console.log(Data)
      return Data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

/* Function to POST data */
const postData = async (url = '', Data = {}) =>{
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      temperature = Data.temperature, 
      date= Data.date, 
      comments= Data.comments
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
const updateUI = async () => {
const request = await fetch('/all')
try{
  const allData = await request. json()
  console. log(allData);
  document.getElementById('date').innerHTML=allData[0].date;
  document.getElementById('temperature').innerHTML=allData[0].temperature;
  document.getElementById('comments'). innerHTML = allData[0]. comments;

  }catch(error){
    console. log("error", error)
  }
}