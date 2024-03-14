const Video = require("../models/video.model");
const ApiError = require("../utils/ApiError");

class VideoService {
  getAllVideos = async () => {
    const videos = await Video.find({});
    return videos;
  };

  create = async (video) => {
    try {
        const newVideo = await Video.create(video);
        // const newVideo = new Video(video);
    // const savedVideo = await newVideo.save();
        return newVideo;
    }
    catch(error) {
        throw error;
    } 
  };

  findByTitle = async (title) => {
    try {
      const videos = await Video.find({
        title: { $regex: title, $options: "i" },
      });
      return videos;
    }
    catch(error) {
      throw error;
    }  
  };

  findByGenre = async (genre) => {
    try {
      let genreArray = genre.split(",");
    if (genre.includes("All")) {
      const videos = await Video.find({});
      return videos;
    }
    const videos = await Video.find({ genre: { $in: genreArray } });
    return videos;
    }
    catch(error) {
      throw error;
    }
    
  };

  findByContentRating = async (contentRating) => {
    try {
      if (contentRating === "Anyone") {
        const videos = await Video.find({});
        return videos;
      }
      // const videos = await Video.find({
      //   $or: [
      //     { contentRating: contentRating }, // Exact match
      //     { contentRating: { $gt: contentRating } }, // Ratings lower than the specified one
      //   ],
      // });
      const videos = await Video.find({contentRating});
      return videos;
    }
    catch(error) {
      throw error;
    }
  };

  filterByCriteria = async (title, genre, contentRating) => {
    try {
      const query = {};

      if (title) {
        query.title = { $regex: title, $options: "i" };
      }

      if (genre) {
        const genreArray = genre.split(",");
        query.genre = { $in: genreArray };
      }

      if (contentRating) {
        query.contentRating = contentRating // for exact match
          // $gte: contentRating, // Ratings lower than or equal the specified one  
      }
      
      const videos = await Video.find(query);
      return videos;
    }
    catch(error) {
      throw error;
    }
    
  };

  sortDecreasingBy = async (sortBy) => {
    try {
      let sortedVideos;
      if(sortBy === "viewCount") {
          const videos = await this.getAllVideos();
          sortedVideos = videos.sort((a, b) => b.viewCount - a.viewCount);
      }
      if(sortBy === "releaseDate") {
          const videos = await this.getAllVideos();
          sortedVideos = videos.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      }
      return sortedVideos;
    }
    catch(error) {
      throw error;
    }
  };

  findWithId = async(id) => {
    try {
      const video = await Video.findById(id);
      return video;
    }
    catch(error) {
      throw error;
    }
  };


  updateVotes = async(id, vote, change) => {
    try { 
      let filter = {_id: id};
      let update = {};
      if(vote === "upVote" && change === "increase") {
        update = { $inc: {"votes.upVotes": 1}};
      }
      if(vote === "upVote" && change === "decrease") {
        update = { $inc: {"votes.upVotes": -1}};
      }
      if(vote === "downVote" && change === "increase") {
        update = { $inc: {"votes.downVotes": 1}};
      }
      if(vote === "downVote" && change === "decrease") {
        update = { $inc: {"votes.downVotes": -1}};
      }

      // Use $max operator to ensure vote counts don't go below zero
    // update = {
    //   $max: {
    //     "votes.upVotes": 0,
    //     "votes.downVotes": 0
    //   },
    //   ...update
    // };

      const updatedVideo = await Video.findOneAndUpdate(filter, update, {new: true});
      return updatedVideo;
    }
    catch(error) {
      throw error;
    };
  };

  updateViews = async(id) => {
    try {
      let filter = {_id: id};
      let update = {$inc: {viewCount: 1}};
      const updatedVideo = await Video.findOneAndUpdate(filter, update, {new: true});
      return updatedVideo;

    }
    catch(error) {
      throw error;
    }
  }
}

module.exports = VideoService;
