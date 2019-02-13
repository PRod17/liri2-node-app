require("dotenv").config();
const fs = require("fs");
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var value = process.argv.slice(3).join(" ");
const axios = require("axios");
const moment = require("moment");
switch (action) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;


    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        command();
        break;
}
// If the "movie-this" action is entered then this will run.
function movie() {
    //If user does not enter a value this is a default
    if (value.trim().length === 0) {
        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy")
            .then(function (response) {

                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);

            });
    } else {

        axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);

            });
    };
};
// If the "concert-this" action is entered then this function runs.
function concert() {

    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp").then(function (response) {
        response.data.forEach(function (event) {
            console.log(event.venue.name)
            console.log(event.venue.city)
            console.log(moment(event.datetime).format("MM/DD/YYYY"));
        });



    });

};
// If the "spotify-this-song" action is entered then this function runs.
function spotifyThis() {
    // If user does not enter a value this default will run. 
    if (value.trim().length === 0) {
        spotify
            .request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
            .then(function (response) {

                console.log(response.album.artists[0].name);
                console.log(response.album.name);
                console.log(response.name);
                console.log(response.preview_url);


            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
    } else {
        spotify
            .search({ type: 'track', query: value, limit: 1 })
            .then(function (response) {

                // console.log(JSON.stringify(response, null, 2));
                // console.log(JSON.stringify(response, null, 2));
                console.log(response.tracks.items[0].artists[0].name);
                console.log(response.tracks.items[0].name);
                console.log(response.tracks.items[0].album.name);
                console.log(response.tracks.items[0].preview_url);


                // fs.writeFile("weather-data.json", JSON.stringify(response, null, 2), function(err){
                //   console.log(err);
                // })

            })


            .catch(function (err) {
                console.log(err);
            });
    };
};
function command() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);

        }
               
            
            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
            action = dataArr[0];
            console.log(action);
            value = dataArr[1];
            console.log(value);

            // We will then re-display the content as an array for later use.
            console.log(dataArr);
            switch (action) {
                case "concert-this":
                    concert();
                    break;
            
                case "spotify-this-song":
                    spotifyThis();
                    break;
            
            
                case "movie-this":
                    movie();
                    break;
            
                
                    
            }
        
    });

};
