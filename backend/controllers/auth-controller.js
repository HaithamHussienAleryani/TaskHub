import User from "../models/user.js"
import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'
import Verification from "../models/verificationSchema.js"
import { sendEmail } from "../libs/send-email.js"
 
 

const registerUser = async (request,response)=>{
    try {
        const {email,name,password} = request.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            return response.status(400).json({message:"User already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
         const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
        })


        const verificationToken = jwt.sign({userId:newUser._id,property:"email-verification"},process.env.JWT_SECRET,{expiresIn:"1h"})

        await Verification.create({
            userId:newUser._id,
            token:verificationToken,
            expiresAt:Date.now()+3600000
        })

        if(!await sendVerificationEmail(verificationToken,email))
        {
            return response.status(500).json({message:"Error sending verification email"}) 
        }
    
        response.status(201).json({message:"Verification email sent to your email. Please check and verify your account"})

    } catch (error) {
        console.log(error)
        response.Status(500).json({message:"Internal server error"})
    }
}
const loginUser = async (request,response)=>{
     try {
        
    } catch (error) {
        console.log(error)
        response.Status(500).json({message:"Internal server error"})
    }
}



const sendVerificationEmail = async(verificationToken,email)=>{
 const verificationLink = `${process.env.BASE_URL}/verify-email?token=${verificationToken}`
        
        const emailBody = `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
        const emailSubject = "Verify Your Email"

        return await sendEmail(email,emailSubject,emailBody);
}



export {registerUser,loginUser}