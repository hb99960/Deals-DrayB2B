const UserModel = require("../Models/Login");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// business logic
const signup = async(req, res) => {
    try{
        const {sno, userName, Pwd} = req.body;
        const user = await UserModel.findOne({userName});
        if(user){
            return res.status(400)
                .json({message: 'User already exist!', success: false});
        }
        const userModel = new UserModel({sno, userName, Pwd});
        userModel.Pwd = await bcrypt.hash(Pwd, 10);
        await userModel.save();
        res.status(201)
            .json({
                message : "Signup success!!!",
                success : true
            })
    }
    catch (err){
        res.status(500)
            .json({
                message : "Internal serve error",
                success : false
            })
    } 
}

const login = async(req, res) => {
    try{
        const {userName, Pwd} = req.body;
        const user = await UserModel.findOne({userName});
        if(!user){
            return res.status(403)
                .json({message: 'Authentication failed!!', success: false});
        }
       
        const isPassEqual = await bcrypt.compare(Pwd, user.Pwd);
       if (!isPassEqual){
        return res.status(403)
                .json({message: 'Authentication failed!!', success: false});

       }

       const jwtToken = jwt.sign({ userName : user.userName, _id : user._id},
        process.env.JWT_SECRET,
        { expiresIn : '24h'}
       )

       res.cookie("jwtoken", jwtToken, {
        expires : new Date(Date.now() + 25892000000),
        httpOnly : true
       });

        res.status(200)
            .json({
                message : "Login success!!!",
                success : true,
                jwtToken,
                userName,
                sno : user.sno
            })

    }
    catch (err){
        res.status(500)
            .json({
                message : "Internal serve error",
                success : false
            })
    } 
}

module.exports = {
    signup,
    login
}