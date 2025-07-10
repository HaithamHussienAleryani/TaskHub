import User from "../models/user.js"
import bcrypt  from 'bcrypt' 
 

const registerUser = async (request,response)=>{
    try {
        const {email,name,password} = request.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            return response.status(400).json({message:"User already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
         User.create({
            name,
            email,
            password:hashedPassword,
        })

       
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




export {registerUser,loginUser}