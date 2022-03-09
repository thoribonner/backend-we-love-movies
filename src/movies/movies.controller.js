const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// * return all movies
async function list(req, res) {
  const { is_showing } = req.query;
  if(is_showing){
    res.json({ data: await service.listNowPlaying() })
  } else {
    res.json({ data: await service.list() });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};
