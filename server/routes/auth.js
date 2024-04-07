const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")

const User = require("../models/User")

// configuration Multer for uploading file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,"public/uploads/")//store the uploaded files in uploads folder
    },filename: function(req,file,cb){
        cb(null,file.originalname) //use the original file name
    }
})

const upload = multer({storage})
// User Register

router.post("/register", upload.single('profileImage'), async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        const profileImage = req.body
        if(!profileImage){
            return res.status(400).send("mNo file uploaded")
        }
        const profileImagePath =profileImage.path  //path to the uploaded profile photo

        const existingUser = await user.findOne({email}) //check if user exists
        if(existingUser){
            return res.status(409).json({message:"user already exists"})
        }

        const salt = await bcrypt.genSalt() //for hass the password
        const hassPassword = await bcrypt.hash(password,salt)

        // creating new user 
        const newUser = new User ({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath,
        });
        await newUser.save()

        // send a sucessfull message 
        res.status(200).json({message:"User registered successfully",user: newUser})
    } catch (err) { 
        console.log(err)
        res.status(500).json({message :"registration Failed!",error: err.message})
    }
})