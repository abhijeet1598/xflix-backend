const videoValidator = require("../validators/video.validator")

const validateGetVideos = (req, res, next) => {
  const { error } = videoValidator.getVideos.query.validate(req.query);
  if(error) {
    return res.status(422).json(error);
  }

  next();
};

module.exports = {
    validateGetVideos
}