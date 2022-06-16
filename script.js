let movieForm = document.querySelector("form");
const APIkey = "279dae4d4960c401eee77e685379317a";
const limit = 25;
var searchkey = " "
var offset = 0;
var page = 0;
const image = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"

const generateError = (err) => {
    document.lastChild.innerHTML += `
        <span style="color: red;">${err} not found</span>
    `;
}

movieForm.addEventListener("submit", async (evt) => {
    // this prevents the page from re-loading
    evt.preventDefault();
 

  
    // logs for debugging, open the inspector!
    console.log("evt.target.movie.value = ", evt.target.movie.value);
    searchkey = evt.target.movie.value;

    let apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + APIkey + '&query=' + searchkey;
    console.log(apiUrl);

    MovieImage = document.querySelector("#movieImage")
    
    // try catch to handle unexpected api errors
    try {
        movieImage.innerHTML = "";
        let response = await fetch(apiUrl);

        // now call is made, but data still not arrived
        console.log("response is: ", response);

        let responseData = await response.json();


        // now have actual data
        console.log("responseData is: ", responseData);

       displayResults(responseData);
      
    } catch (e) {
        generateError(evt.target.movie.value);
    }
    let loadmoreMovies = document.querySelector("#loader");
    loadmoreMovies.classList.remove("hidden");
});


// in order to have the 
function displayResults(responseData){
    responseData.results.forEach(element => {
        console.log(element)
        MovieImage.innerHTML += `<img src="${image+element.poster_path}" alt="${element.title}" width = "100" height= "100"/>`; 
    })

}

let loadmoreMovies = document.querySelector("#loader");

// when clicked, prevent page from reloading, then increment clicked.
// change offset to when clicked times limit
loadmoreMovies.addEventListener("click", async (evt) => {

    let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${searchkey}&page=${pages}`
    console.log(apiUrl);
   
    movieImage = document.querySelector("#movieImage")
    
    evt.preventDefault();
clicked += 1;
offset = clicked*limit;

  // logs for debugging, open the inspector!

 
 // try catch to handle unexpected api errors
 try {
     let response = await fetch(apiUrl);

     // now call is made, but data still not arrived
     console.log("response is: ", response);

     let responseData = await response.json();


     // now have actual data
     console.log("responseData is: ", responseData);

    displayResults(responseData);
   
 } catch (e) {
     generateError(evt.target.movie.value);
 }
});
