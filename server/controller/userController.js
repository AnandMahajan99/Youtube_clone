const User = require('./../model/user');

exports.createUser = async (req, res, next) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: user 
        })
    } catch(err) {
        res.status(500).json({
            status: 'failed',
            data: err
        })
    }

}