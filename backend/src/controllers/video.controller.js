const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const VideoService = require("../services/video.service");
const VideoServiceInstance = new VideoService();

const getAllVideos = async (req, res) => {
  try {
    const {title, genres, contentRating, sortBy} = req.query;
    //Find by title, genre, contentRating
    console.log(req.query);
    if(title && genres && contentRating) {
      const videos = await VideoServiceInstance.filterByCriteria(title, genres, contentRating);
      return res.status(200).json({videos});
    }
  
    //Find by title
    if(title) {
      const videos = await VideoServiceInstance.findByTitle(title);
      return res.status(200).json({videos});
    }
  
    //Find by genre
    if(genres) {
      const videos = await VideoServiceInstance.findByGenre(genres);
      return res.status(200).json({videos});
    }
  
    //Find by contentRating
    if(contentRating) {
      const videos = await VideoServiceInstance.findByContentRating(contentRating);
      return res.status(200).json({videos});
    }
  
    //Sort By
    if(sortBy) {
      const videos = await VideoServiceInstance.sortDecreasingBy(sortBy);
      return res.status(200).json({videos});
    }
  
  
    //Find all videos
    const videos = await VideoServiceInstance.getAllVideos();
    if (videos && videos.length !== 0) {
      return res.status(200).send({videos});
    } 
    return res.status(404).json({ message: "No videos found" });
  }
  catch(error) {
    return res.status(400).json(error);
  }

  // try {
  //   const { query } = req;
  //   // console.log("index.controller.getVideos", req);
  //   const videos = await videoService.getVideos(query);
  //   res.status(200).send({ videos });
  // } catch (error) {
  //   const { statusCode, message } = error;
  //   if (!statusCode) {
  //     return res.status(500).send({ message: "Internal server Error" });
  //   }
  //   res.status(statusCode).send({ statusCode, message });
  // }
};

const getVideoById = async (req, res) => {
  try {
    const {videoId} = req.params;
    const video = await VideoServiceInstance.findWithId(videoId);
    return res.status(200).json(video);
  }
  catch(error) {
    return res.status(404).json({error});
  }
}

const postVideo = async (req, res) => {
  try {
    const data = req.body;
    const video = await VideoServiceInstance.create(data);
    return res.status(201).json(video);
  }
  catch(error) {
    return res.status(400).json({error});
  }
};

const updateVotes = async (req, res) => {
  try {
    const {vote, change} = req.body;
    const {videoId} = req.params;
    const video = await VideoServiceInstance.updateVotes(videoId, vote, change);
    console.log(video);
    return res.status(204).json(video); // if sending 204 video object will not sent in response
  }
  catch(error) {
    return res.status(400).json({error});
  }
};

const updateViews = async (req, res) => {
  try {
    const {videoId} = req.params;
    const video = await VideoServiceInstance.updateViews(videoId);
    return res.status(204).json(video); // if sending 204 video object will not sent in response
  }
  catch(error) {
    return res.status(400).json({error});
  }
};

module.exports = { getAllVideos, getVideoById, postVideo, updateVotes, updateViews };
