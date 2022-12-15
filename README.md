INF656 - Back End Web Development II <br />
Nicholas Zimmerman <br />
Final Project<br />

<h1 align="center"> INF 656 Final Project</h1>
<br>
This project is a full stack website meant to be a resource for the character, Viper from the video game, VALORANT. This website archives in-game 'ability lineups' to educate other users.

### Installation

Start by cloning the repository using:<br>
`git clone https://github.com/nczimmerman00/INF-656-Final-Project.git`<br>
You will also need to install and run mongodb. The mongodb server must run using the address
127.0.0.1:27017. Links to download and instructions on how to install and run can be viewed at: https://www.mongodb.com/docs/manual/installation/


### Prerequisites
To install the packages needed to run the website, open a terminal (such as command prompt) in the
folder where you cloned this repository and enter the following command:</br>
`npm i`</br>

### Usage

To start the back end of the website, use a terminal where you cloned the repository and run the
command:</br></br>
`node server.js`</br></br>
To start the front end of the website, use another terminal in the folder where you cloned the
repository and run the command:</br></br>
`ng serve`</br></br>
The website can the be accessed by going to the link, localhost:4200. The backend api service is running
on localhost:8080.</br></br>
To Add/Edit/Delete lineups, ability locations, and lineup locations, you need to access the admin page. Do so by using the link localhost:4200/admin. A login will be required to access any admin pages. The default admin usernamen and password are, 'username' and 'password', respectively.<br></br>
In order to add lineups, ability locations and lineup locations need to be added, as a lineup consists of both of those things. Note that lineup locations and ability locations are map specific. Use the admin home page to select a map and add entries to the website. 
