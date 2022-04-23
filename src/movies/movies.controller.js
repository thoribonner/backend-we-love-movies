const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// verify movie id from params exists
async function movieExists(req, res, nxt) {
  const foundMovie = await service.read(req.params.movieId);

  if (!foundMovie) {
    return nxt({ status: 404, message: `Movie cannot be found.` });
  }
  
  res.locals.movie = foundMovie;
  nxt();
}

// return all movies || is_showing movies
async function list(req, res) {
  const { is_showing } = req.query;

  if (is_showing) {
    res.json({ data: await service.listIsShowing() });
  } else {
    res.json({ data: await service.list() });
  }
}

// read movie by id from params
function read(req, res) {
  res.json({ data: res.locals.movie });
}

// return movie with theaters showing at
async function readIsShowingTheaters(req, res) {
  const { movie_id } = res.locals.movie;

  res.json({ data: await service.readIsShowingTheaters(movie_id) });
}

// return movie by id with reviews
async function readMovieReviews(req, res) {
  const { movie_id } = res.locals.movie;

  res.json({ data: await service.readMovieReviews(movie_id) });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  listTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readIsShowingTheaters),
  ],
  listReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readMovieReviews),
  ],
};
