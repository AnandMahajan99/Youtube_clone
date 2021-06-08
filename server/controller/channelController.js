const Channel = require('./../model/channel');

exports.getChannel = async (req, res, next) => {
    try {
        const channel = await Channel.findOne({ _id: req.params.id});
        res.status(200).json({
            status:'success',
            data: channel
        });
    } catch(err) {
        res.json({
            status: "failed",
            data: err
        })
    }
}

// Create a new Channel
exports.createChannel = async (req, res, next) => {
    try{
        const { name, description } = req.body;
        // const channel = await Channel.create(req.body);
        const channel = await Channel.create({ name, description, user: req.user._id});
        // console.log(req.cookie.userid);
        res.status(201).json({
            status: 'success',
            data: channel 
        })
    } catch(err) {
        res.status(500).json({
            status: 'failed',
            data: err
        })
    }
}

// Get all Channels of user
exports.getAllChannel = async (req, res, next) => {
    try{
        // const channels = await Channel.find({ user: req.params.id });
        const channels = await Channel.find({ user: req.user._id });
        // console.log(channels);
        res.status(201).json({
            status: 'success',
            data: channels 
        })
    } catch(err) {
        res.status(500).json({
            status: 'failed',
            data: err
        })
    }
}

exports.deleteChannel = async (req, res, next) => {
    try{
        const isAdmin = await Channel.findOne({ _id: req.params.id, user: req.user._id });
        console.log(isAdmin);
        if(isAdmin){
            const channel = await Channel.findByIdAndDelete(req.params.id);
            console.log(channel);
            res.status(201).json({
                status: 'success',
                data: channel 
            })
        } else{
            res.status(401).json({
                status: "failed",
                data: "Your are not authorized to delete this channel"
            });
        }
    } catch(err) {
        res.status(500).json({
            status: 'failed',
            data: err
        })
    }
}

