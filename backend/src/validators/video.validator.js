
const Joi = require("joi");
const allowedGenres = ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"];

const postVideo = {
  body: Joi.object().keys({
    videoLink: Joi.string()
      .required()
      .custom((value, helpers) => {
        return value;
      }),
    title: Joi.string().required(),
    genre: Joi.string()
      .valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All")
      .required(),
    contentRating: Joi.string()
      .valid("Anyone", "7+", "12+", "16+", "18+")
      .required(),
    releaseDate: Joi.date().required(),
    previewImage: Joi.string().required(),
  }), 
};

const getVideos = {
  query: Joi.object().keys({
    title: Joi.string(),
    genres: Joi.string().custom((value, helpers)=> {
      const queryGenres = value.split(",");
      queryGenres.forEach((genre) => {
        if(!allowedGenres.includes(genre.trim())) {
          console.log(helpers.error);
          return helpers.error("Invalid genres");
        }
        return value;
      })
    }),
    contentRating: Joi.string().valid("Anyone","7+","12+","16+","18+"),
    sortBy: Joi.string().valid("viewCount","releaseDate")
  })
}

const getVideoById = {
  params: Joi.object().keys({
    videoId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          return helpers.message('"{{#label}}" must be a valid mongo id');
        }
        return value;
      }),
  }),
};

module.exports = { postVideo, getVideos, getVideoById };
