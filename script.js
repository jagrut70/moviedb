const APIURL = "https://api.themoviedb.org/3/discover/movie?primary_realese_date.gte=2014-09-15&primary-release_date.te=2014-10-22&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const search_res = document.getElementById("search_res");
const total_records = document.getElementById("total_records");

getMovies(APIURL);

async function getMovies(url){
    const response = await fetch(url);
    const repData = await response.json();

    console.log(repData)

    if(repData.results.length == 0){
        search_res.innerHTML = 'No Result Found!';
        total_records.innerHTML = '';
    }else{
        total_records.innerHTML = 'Total Record '+repData.total_results;
    }

    showMovies(repData.results)
}

function showMovies(movies){
    // console.log(movies)
    main.innerHTML = ''
    movies.forEach((movie)=>{
        // console.log(movie)

        const movieEl = document.createElement("div");
        movieEl.classList.add('movie');

        if(movie.poster_path != null){
            poster_path = IMGPATH+movie.poster_path
        }else{
            poster_path = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/No_picture_available.png/401px-No_picture_available.png";
        }
        // <div class="movie">
        // <img src="https://image.tmdb.org/t/p/w1280/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg" alt="">
        // <div class="movie-info">
        //     <h3>Fury</h3>
        //     <span>7.5</span>
        // </div>
        // </div> 

        movieEl.innerHTML = ' <img src='+poster_path+' alt=""> <div class="movie-info"> <h3>'+movie.title+'</h3> <span class='+getClassByRate(movie.vote_average)+'>'+movie.vote_average+'</span> </div>';
        main.appendChild(movieEl);
    })
}

function getClassByRate(vote){
    console.log(vote);
    if(vote >= 7){
        return "green";
    } else if(vote >= 5){
        return "orange";
    } else {
        return "red";
    }

}

form.addEventListener("submit",(e) => {
    e.preventDefault();

    const searchTerm = search.value;
    console.log(searchTerm);

    if(searchTerm){
        getMovies(SEARCHAPI+searchTerm)
        search.value = searchTerm;
        search_res.innerHTML = "Search Results For "+searchTerm
    }else{
        getMovies(APIURL);
    }
})