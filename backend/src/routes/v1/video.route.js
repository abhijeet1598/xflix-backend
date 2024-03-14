const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");
const videoController = require("../../controllers/video.controller");


router.get("/", videoController.getAllVideos);
router.get("/:videoId", videoController.getVideoById);
router.post("/", videoController.postVideo);
router.patch("/:videoId/votes", videoController.updateVotes);
router.patch("/:videoId/views", videoController.updateViews);

module.exports = router;