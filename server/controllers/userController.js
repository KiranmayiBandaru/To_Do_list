import user from '../models/userModel.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export const userRegistration = async (req, res) => {
    try{
       const {username, email, password, confirmPassword} = req.body;

       const hashedPassword = await bcrypt.hash(password, 10);
       
       if(!username || !email || !password || !confirmPassword)
            return res.status(400).json({message : "All the fields are required" });

       if(password !== confirmPassword)
            return res.status(400).json({message : "passwords mismatch"});

       const existingUser = await user.findOne({email : email});
       if(existingUser) return res.status(409).json({message : "user with this mail already exists"});

       const newUser = await user.create({
            username,
            email,
            password : hashedPassword
       });

       return res.status(201).json({
            message : "successful registration",
            userId : newUser._id
       });

    }catch(err){
       console.error("Registration error :" , err)
       return res.status(500).json({message : "Server error"});
    }
};

export const Userlogin = async (req, res) => {
    try{
      const {email , password} = req.body;

      const existingUser = await user.findOne({email : email});

      if(!existingUser) 
            return res.status(400).json({message : "incorrect email"});

      const isMatch = await bcrypt.compare(password, existingUser.password);

      if(!isMatch) return res.status(400).json({message : "incorrect password usage"})

      const token = jwt.sign(
          {id : existingUser._id}, //payload
          "mysecretkey",  //secrets
          {expiresIn : "1hr"} //options
      );
      return res.status(200).json({message : "login sucessful" , token : token});

    }catch(err){
        return res.status(500).json({error : "User login failed :" , err});
    }
}

