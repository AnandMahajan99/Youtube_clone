const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/youtube',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('Connected to database successfully'))
.catch(err => console.log('Error occured while connecting to database'));

const server = app.listen(PORT, () => {
    console.log(`Listening on PORT no. : ${PORT}`);
});