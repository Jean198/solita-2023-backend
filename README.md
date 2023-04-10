# Solita assignment

## 1. Prerequisites

 ### ⚠️This is a new version of the application built in the previous solita preassignment. In this new version, I have made some improvments and added new features including authentication/authorization, Ability to add/edit/delete trips and stations information and storing the application state using Redux/Redux ToolKit.

  ### The new Version is found at  - [Helsinki city bike journey's information(Solita internship pre-assignment 2023) ](https://helsinki-city-bikes-2023.netlify.app/).


   ### You can find the old application at - [Helsinki city bike journey's information(Solita internship pre-assignment 2022) ](https://helsinki-city-bikes.netlify.app/) if you want to compare both versions!!



The application is divided into two separate directories::

- ### Backend:
The backend is built with JavaScript, Node js and Express js framework. You need to have **Node js** and **Npm** installed on your computer.Type "**npm install** " to install all required packages and then " **npm start** " to start the application.

  Note that the backend needs to connect to mongodb. In this case, you need to create a **.env** file in the root directory and add a connection string to the database.(The connection string has been provided to authorized persons).
  Others environment variables required for the  backend including JWT_SECRET, PORT and NODE_ENV will be provided for authorized persons.

  In this project I am using a free plan of mongodb. For that reason, all the datasets provided has not been imported to the database. Only the the following datasets were used in this project:

  - https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv (small part of this dataset has been used).
  - https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv

  The data has been uploaded to the database using **MongoDBCompas** upload option.





- ### Frontend:
The frontend is built with JavaScript and React library. You need to have **Node js** and **Npm** installed on your computer. To run the application, make sure your backend is running. Then add a **.env** file in the root directory. In the **.env** file add this line REACT_APP_ENDPOINT=http://localhost:5000 and type "npm start ".The backend endpoint is stored in a variable to make the application deployment easier.




## 2. Completed functional requirements and additionals:

- ### Data Import
 - Data has been imported to the mongodb database(Only https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv and https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv has been imported because I am using free plan of mongodb and have already other projects using the same free plan).

 - Journeys lasted less than 10 seconds has not been imported
 - Journeys with distances less than 10 meters have not been imported

- ### Journey list view
 - All journeys are listed using pagination
 - When a page is selected, a fetch request is sent to get the data specific to the selected page.
 - You can search journeys using four options: **Departure station name**, **Departure station Id**, **Return station name** and **Return station Id**.
 - Top 5 popular departure and return stations with their respective journeys counts are listed.

- ### Station list

 - All stations are listed using pagination. When a page is selected, a fetch request is sent to get the data for that specific page.
 - You can search for a station by station name
 - All the stations in the database are displayed at once on the map.

- ### Single station view

 - Station name
 - Station address
 - Total number of journeys starting from the station
 - Total number of journeys ending at the station
 - Station location on the map
 - The average distance of a journey starting from the station
 - The average distance of a journey ending at the station
 - Top 5 most popular return stations for journeys starting from the station
 - Top 5 most popular departure stations for journeys ending at the station

- ## Surprises
 - UI for adding journeys or bicycle stations
 - Endpoints to store new journeys data or new bicycle stations.
 - stations Ids are created automatically, so admin does not need to know the next Id when creating a new station.
 - Ability to choose from available stations when adding a new trip information. Admin does not need to type a station name manually.
 - Authentication and authorization: There are two types of users:
  - ### Visitor:
    - The visitor can only view trips and stations information but does not have right to add, edit, delete trips or stations information.

  - ### Admin:
    - In addition to what the visitor can do, the admin have right to add, edit, delete trips and stations informations.


 ## 4. Challenges faced

- Too large datasets to deal with expecially when using free plan database services.
- The Authentication/AUthorization isnt working properly on mobile browsers, that is, for now the application is functioning only on computer browsers.

## 5. Future improvements to consider

- Using a paid database service to store all the data.


## 6. Tools used

 - JavaScript, React, Leaflet
 - Redux/Redux Toolkit
 - Node js
 - Express js
 - MongoDb(Mongoose)
