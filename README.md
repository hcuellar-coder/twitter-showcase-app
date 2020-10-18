# Twitter Show Case Application
The application utilizes Twitter API 1.1 and was built using ReactJS (Frontend), C# with ASP.NET Core (Backend) and styled with Bootstrap 4

Run Code [Here]()

<p align="center">
<img align="center"  width="700" height="400" src="./images/home.png">
</p>

## Summary
This web application utilizes Twitter API 1.1 to retrieve tweets and display them using Bootstrap for styling and responsiveness. ReactJS was used to develop the frontend of the web application. While the backend uses C# with ASP.NET Core for WebAPI and Internal API calls. Local storage is used to store the last search, search type, and random tweet selection for a smoother user experience.

### Search Page
The search page allows you to search based on a user or content with the click of the corresponding button. The user search will retrieve data from a specific user's timeline. The content search is far broader and will return tweets with any mention of the terms in the search bar. So, there is a need to be more specific with your searches. Both options will cursor more tweets as you scroll down looking for more tweets, making the experience smoother.
#### _Search for user_
<p align="center">
<img align="center"  width="700" height="500" src="./images/searchpageuser-nasa.png">
</p>

#### _Search for content_
<p align="center">
<img align="center"  width="700" height="500" src="./images/searchpagecontent-nasaspace.png">
</p>
<br>
<br>

### Random Tweet Page
The random tweet page features 5 Twitter user choices, chosen by yours truly. Clicking on a user's card will bring up a simple Tweet modal that will reveal a random tweet from that selected user. 
#### _Random Tweet Page_
<p align="center">
<img   width="700" height="500" src="./images/randomtweet.png">
</p>

#### _Random Tweet from Nasa_
<p align="center">
<img align="center"  width="700" height="500" src="./images/randomtweet-nasa.png">
</p>

## Installation
Rename file "Edit-App.config" to "App.config" file and add Bearer Token into the Bearer key value pair.
```javascript
<add key="BEARER" value="INSERT BEARER TOKEN"/>
```
To generate a Bearer Token, you will need to set up a Twitter Developer Account and create a Twitter API "App". This will generate a Bearer Token.

## Author
Heriberto Cuellar – Full Stack Software Developer - [LinkedIn](linkedin.com/in/heriberto-c-5aa11952)