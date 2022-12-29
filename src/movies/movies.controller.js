const moviesService = require('./movies.service');
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res, next){
    if (req.query.is_showing){
        res.json({data: await moviesService.listShowingMovies()})
    }else{
        res.json({ data: await moviesService.list() });
    }    
}

async function movieExists(req, res, next){

    const {movieId} = req.params;

    const movie = await moviesService.read(movieId);

    if(movie){
        res.locals.movie = movie;
        return next();
    }
    next({
        status: 404,
        message: "Movie cannot be found",
    });
}

function read(req, res, next){
    const {movie: data} = res.locals;

    res.json({data});
}

async function listTheatersPlayingMovie(req, res){

  const data = await moviesService.listTheatersPlayingMovie(res.locals.movie.movie_id);
  res.json({data});

}

async function reviewsForMovie(req, res){
    const data = await moviesService.reviewsForMovie(res.locals.movie.movie_id);
    //console.log(Object.values(data));
    res.json({data});
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  listTheatersPlayingMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheatersPlayingMovie),
  ],
  reviewsForMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(reviewsForMovie)],
};