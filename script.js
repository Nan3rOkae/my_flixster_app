let movieForm = document.querySelector("form");
const APIkey = "279dae4d4960c401eee77e685379317a";
var page = 1;
const image = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"
let searchedMovie = false;
let searchkey;

    const generateError = (err) => {
        document.lastChild.innerHTML += `
            <span style="color: red;">${err} not found</span>`;
    }

document.addEventListener("submit", async (evt) => {
// prevents broswer from using default funtion
    evt.preventDefault();

    // searchkey variable used to get data info from json
    searchkey = evt.target.movie.value;
    if (searchkey == ""){
        console.log("search is empty")
        alert("Enter a movie first");
        return 0
    }
    page = 1

    // api url that has the link to search the data base 
    let apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + APIkey + '&query=' + searchkey + '&page=' + page;

    console.log(apiUrl);

    movieGrid = document.querySelector("#movieImage")
    
   // awaits the data to be used and calls display funtion to display movie data 
    try {

        movieGrid.innerHTML = " ";

        let response = await fetch(apiUrl);

        console.log("response is: ", response);

        let responseData = await response.json();

        console.log("responseData is: ", responseData);

       displayResults(responseData);
      
    } catch (e) {
        generateError(evt.target.movie.value);
    }

    let loadmoreMovies = document.querySelector("#loader");
    searchedMovie = true;
});



document.addEventListener("DOMContentLoaded", loadNowPlaying);

async function loadNowPlaying() {
    searchedMovie = false;

    let apiUrlCurrent = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIkey}&language=en-US&page=${page}`
    console.log("test")
    movieGrid = document.querySelector("#movieImage")
    
    // try catch to handle unexpected api errors
    try {
        
        movieImage.innerHTML = "";
        let response = await fetch(apiUrlCurrent);

        console.log("response is: ", response);

        let responseData = await response.json();

        console.log("responseData is: ", responseData);

       displayResults(responseData);
      
    } catch (e) {

        generateError(evt.target.movie.value);
    }

}

function displayResults(responseData){
    console.log(responseData)
    responseData.results.forEach(element => {
      
        movieImage.innerHTML += `
        <div class='MovieCard'>
        <img src="${image+element.poster_path}" width = "320" height= "400"/>
        <p id ="movie-title">${element.title}</p>
        <p id = "movie-votes"> ${element.vote_average}</p>
        </div>`;
    })
};

let loadMoreMovies = document.querySelector("#load-more-movies-btn");

loadMoreMovies.addEventListener("click", async (evt) => {

    console.log("loading more")

    evt.preventDefault();
    page++
    console.log(page)


    if (searchedMovie == true){
    
        let apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + APIkey + '&query=' + searchkey + '&page=' + page;
        console.log(apiUrl);
    
        movieImage = document.querySelector("#movieImage")
        
        try {

            let response = await fetch(apiUrl);
    

            console.log("response is: ", response);
    
            let responseData = await response.json();
    
    
            console.log("responseData is: ", responseData);
    
           displayResults(responseData);
          
        } catch (e) {
            generateError(evt.target.movie.value);
        }
        let loadmoreMovies = document.querySelector("#load-more-movies-btn");
        return 0
    }
    if(searchedMovie == false){

        let apiurlLoad = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIkey}&language=en-US&page=${page}`
        console.log(apiurlLoad);
    
        movieImage = document.querySelector("#movieImage")
        
        try {
            let response = await fetch(apiurlLoad);
    

            console.log("response is: ", response);
    
            let responseData = await response.json();

            console.log("responseData is: ", responseData);
    
           displayResults(responseData);
          
        } catch (e) {   
            generateError(evt.target.movie.value);
            console.log(generateError)
        }
    }
});








