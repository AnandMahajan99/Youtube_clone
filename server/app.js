const path = require('path');
const express = require("express");
const fs = require("fs");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const VideoRouter = require('./router/videoRoutes');
const UserRouter = require('./router/userRoutes');
const AuthRouter = require('./router/authRoutes');
const ChannelRouter = require('./router/channelRoutes');

const upload = multer();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
// app.use(upload.array()); 
// app.use(express.static('public'));

app.use('/api/v1/video', VideoRouter);
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/channel', ChannelRouter);

// app.get('/', (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         data: 'Application is working fine.'
//     });
// });


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "./../bigbuck.mp4";
  const videoSize = fs.statSync("./../bigbuck.mp4").size;

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
});


module.exports = app;