const path = require('path');
const multer = require('multer');
const fs = require('fs');
const genThumbnail = require('simple-thumbnail')
const ffmpeg = require('ffmpeg-static');
const Channel = require('../model/channel');
const Video = require('./../model/video');

 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `__dirname/../uploads`)
    },
    filename: function (req, file, cb) {
    //   cb(null, file.fieldname + '-' + Date.now())
      console.log(file);
      cb(null, Date.now() + '-' + file.originalname );
    }
  })
   
  const upload = multer({ storage: storage }).single('file');

exports.getAllVideos = async (req, res, next) => {
    try {
        const videos = await Video.find().populate('channel');
        res.status(200).json({
            status:'success',
            data: videos
        });
    } 
    catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'failed',
            data: 'Some error occured'
        });
    }
}

exports.getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id).populate('channel');
        res.status(200).json({
            status:'success',
            data: video
        });
    } catch(err) {
        res.json({
            status: "failed",
            data: 'Some Error Occured'
        })
    }
}

exports.uploadVideo = async(req, res, next) => {
        upload(req, res, err => {
            if(err instanceof multer.MulterError) {
                // console.log('Error Occured while uploading', err); 
                res.status(200).json({
                    status: 'failed',
                    data: `Error Occured, ${err}`
                });
            }
            else if(err){
                res.status(500).json({
                    status: 'failed',
                    data: `Error Occured, ${err}`
                });
            }
            next();
            // return;
        });
    // } 
}


exports.createVideo = async (req, res, next) => {
    try{
        const isAdmin = await Channel.findOne({ _id: req.body.channel, user: req.body.user});
        // console.log(isAdmin);
        if(String(isAdmin) === 'null')
        {
            res.status(200).json({
                status: 'failed',
                data: 'You are not authorized to upload on this channel'
            });
        }
        else{
        req.body.video = path.join('uploads', req.file.filename);
        const thumb = Date.now() + req.file.filename +'thumbnail';
        req.body.thumbnail = "uploads/"+thumb+'.jpg';
        await genThumbnail(req.body.video, "uploads/"+thumb+'.jpg', '720x404', {
            path: ffmpeg,
            seek: '00:00:05'
          })
        // console.log(t);
        
        const video = await Video.create(req.body);
        res.status(201).json({
            status:'success',
            data: video
        });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'failed',
            data: 'Some error occured'
        });
    }
}


exports.streamVideo = async (req, res, next) => {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    return res.status(400).send("Requires Range header");
  }
  const video = await Video.findById(req.params.id);

  // get video stats (about 61MB)
//   const videoPath = "bigbuck.mp4";
  const videoPath = video.video;
//   console.log(videoPath);
//   const videoPath = video.video;
//   const videoSize = fs.statSync("bigbuck.mp4").size;
  const videoSize = fs.statSync(video.video).size;
//  console.log(videoSize);
  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
}

exports.getAllVideosOfChannel = async (req, res, next) => {
    try{
        const videos = await Video.find({ channel: req.params.id });
        res.status(200).json({
            status:'success',
            data: videos
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'failed',
            data: 'Some error occured'
        });
    }
}

exports.deleteVideo = async(req, res, next) => {
    try {
        const video = await Video.deleteOne({ _id: req.params.id });
        res.status(200).json({
            status:'success',
            data: video
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'failed',
            data: 'Some error occured'
        });
    }
}