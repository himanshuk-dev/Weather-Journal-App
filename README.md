# Weather-Journal-App

![Landing page banner](https://user-images.githubusercontent.com/87880250/167685039-46045978-71ac-4aca-bfe2-b9a786224398.png)

I developed this project to demonstrate my skills for webAPIs, ES6, Node.js.

## Description

- This project is a Weather Journal App where user enters the zip code of their region, country code and their feelings for the day
- Once user clicks on 'Go' button, API call is triggered
- The API data is obtained via get route located at server which is initiated by get function call at app.js
- After your successful retrieval of the weather data, I chained Promise that makes a POST request to add the API data, as well as data entered by the user, to your app.
- The data to be displayed is prepared by storing only the required data in projectData object.
- This data is then posted to server with the help of async function at app.js which user same credentials as origin. This is accomplished by post route at server.js
- This required data is then retreived from server using another async function
- Once this required data is obtained, it is chained to promise which calls the function to retrieve data from the app, and select the necessary elements on the DOM

## Getting Started

### Dependencies

* Node.js
* Express.js
* CORS

# Demo-preview



https://user-images.githubusercontent.com/87880250/167778630-7eaea1ee-a538-48a0-a17c-372654d864bb.mov



# Table of contents

- [Project Title](#Weather-Journal-app)
- [Demo-Preview](#demo-preview)
- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Development](#development)
- [Contribute](#contribute)
- [Footer](#footer)

# Installation

To use this project, first clone the repo on your device using the command below:

```git init```

```git clone https://github.com/Himanshukumar30/Weather-Journal-App.git```

[(Back to top)](#table-of-contents)

# Development
- Start by setting up your project environment.
- Add a GET route that returns the projectData object in your server code
- Acquire API credentials from OpenWeatherMap website
- After your successful retrieval of the weather data, you will need to chain another Promise that makes a POST request to add the API data, as well as data entered by the user, to your app.
- Finally, chain another Promise that updates the UI dynamically 

[(Back to top)](#table-of-contents)

# Contribute
If you'd like to contribute to my project,you may do so by raising a new branch and raising a pull request for your additions.

[(Back to top)](#table-of-contents)

# Footer

Leave a star in GitHub if you found this helpful.

[(Back to top)](#table-of-contents)
