const Users = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.registerUser = async(req, res, next) => {
    try{
        const {username, password, email } = req.body;
        const usernameCheck = await Users.findOne({username});
        if(usernameCheck){
            return res.json({
                success:false,
                message:"Username already exist"
            })
        }
        const emailCheck = await Users.findOne({email});

        if(emailCheck){
            return res.json({
                success:false,
                message:"Email already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);
        console.log("Reached till user entry in db");
        const user = await Users.create({
            username,
            email,
            password:hashedPassword
        });
        console.log("USer created succesfully");
        delete user.password;

        return res.status(200).json({
            success:true,
            data:user,
            message:"User registered Successfully",
        })

    }catch(err){
        console.log(err);
    }
}


module.exports.loginUser = async(req, res, next) => {
    try{
        const {username, password} = req.body;
        
        const usernameCheck = await Users.findOne({username});
        console.log("username check",usernameCheck);
    
        if(!usernameCheck){
         
            return res.status(404).json({
                success:false,
                message:"Username does not exist",
            })
        }

        if(bcrypt.compare(password, usernameCheck.password)){
            console.log("password matched");
            return res.status(200).json({
                data:usernameCheck,
                success:true,
                message:"User Logged In Successfully"
            })
        }
        else{
            console.log("Password doesn't mstch");
            return res.status(500).json({
                success:false,
                user,
                message:"Password is incorrect"
            })
        }
        delete usernameCheck.password;

    }catch(err){
        console.log(err);
    }
}

module.exports.setAvatar = async(req, res, next) => {
    try{
        const userId = req.params.id;
        console.log("id",userId);
        const avatarImage = req.body.image;
        const userData = await Users.findByIdAndUpdate(userId, {
            isAvatarImageSet:true,
            avatarImage
        })
        console.log("userdata",userData);
        return res.status(200).json({
            data:userData,
            success:true,
            image:userData.avatarImage,
            message:"Profile picture set",
        })

    }catch(err){
        console.log(err);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {

      const users = await Users.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };