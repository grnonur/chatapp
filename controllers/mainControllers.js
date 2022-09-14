import User from "../models/User.js";

const getIndexPage = async (req, res) => {
    if(!req.session.userid){
        return res.redirect('/users/login');
    }
    const user = await User.findOne({_id: req.session.userid});
    res.render('index', {user:user});
}

export {getIndexPage}