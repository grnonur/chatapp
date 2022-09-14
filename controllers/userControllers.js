import User from "../models/User.js"
import bcrypt from "bcrypt"

const getLoginPage = async (req, res) => {
    if(req.session.userid){
        return res.redirect('/');
    }
    res.render('login');
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.send('kullanici yok')
        }
        let a = await bcrypt.compare(req.body.password, user.password);
        if(a){
            req.session.userid = user._id;
            console.log(req.session)
            res.redirect('/')
        }
        else{
            res.send('sifre veya kullanici adi yanlis')
        }
    } catch (error) {
        console.log(error)
    }
    
}

const register = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(user){
            return res.send('kullanici var')
        }
        await User.create(req.body);
        res.redirect('/users/login')
    } catch (error) {
        console.log(error)
    }
}

const getRegisterPage = async (req, res) => {
    try {
        if(req.session.userid){
            return res.redirect('/');
        }
        res.render('register')
    } catch (error) {
        console.log(error)
    }
}

const logout = async (req, res) => {
    try {
        if(!req.session.userid){
            return res.redirect('/');
        }
        req.session.destroy(() => {
            res.redirect('/')
        })
    } catch (error) {
        console.log(error)
    }
}

export {getLoginPage, login, register, getRegisterPage, logout}