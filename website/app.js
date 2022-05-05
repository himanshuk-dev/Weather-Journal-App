const { url } = require("inspector");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Personal API Key for OpenWeatherMap API
const baseURL = 'api.openweathermap.org/data/2.5/weather/?zip=';
const apiKey = '&appID=76aa91139c7537d1992cc3e86268bd28';

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click', taskToPerform);

/* Function called by event listener */
function taskToPerform(e){
  const location =  document.getElementById('zip').value;
  const country =  document.getElementById('country').value;
  const comments =  document.getElementById('feelings').value;

  getData(baseURL,location,country,apiKey)

  .then((data) =>{
    holdData(data)
    .then((information)=>{
      postData('/create',information)
      .then((data)=>{
        obtainData('/all');
      })
    });
  });

    // .then(function(data){
    //     console.log("The data is:", data);
    //     console.log("The temperature is:", data.main.temp)
    //     console.log("The feelings are:", comments)
    //     console.log("The date is:", newDate)
    //     postData('/create', {date:newDate, temperature:data.main.temp, comments: feelings})
    //     updateUI();
    // })
};

// Function to GET Web API Data (Get Route II)
const getData = async (baseURL,location,country,apiKey)=>{

  // http://127.0.0.1:5500/Projects/Weather-Journal-App/website/api.openweathermap.org/data/2.5/weather/V6B1B47/6aa91139c7537d1992cc3e86268bd28
    
  // fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
  const url = "http://"+baseURL+location+","+country+apiKey;
  // https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
  // api.openweathermap.org/data/2.5/weather/?zip=121001,in&appID=76aa91139c7537d1992cc3e86268bd28
  console.log("the url is:", url);
  console.log("calling fetch")
  const res = await fetch(url)
  console.log("Fetch call completed")
    try {
  
      const data = await res.json();
      console.log(data);
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

// Function to store data
const holdData = async (data) =>{
  try{
    if(data.message){
      const information = data.message;
      console.log(information);
      return information;
    }
  }catch(error){
    console.error(error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) =>{
  console.log("The url in he post is:", url)
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
const obtainData = async(url) =>{
  const data = await fetch(url)
  console.log("Fetch call completed")
    try {
      const result = await res.json();
      console.log(result);
      return result;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}


const updateUI = async () =>{
  const request = await fetch('/all');
  try {
  // Transform into JSON
    const allData = await request.json()
    console.log(allData)
  // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.feelings;
    document.getElementById('date').innerHTML =allData.date;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}