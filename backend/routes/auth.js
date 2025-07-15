import express from 'express'
import zod from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateRequest } from 'zod-express-middleware'
import { loginSchema, registerSchema,verificationSchema } from '../libs/validate-schema.js'
import { registerUser,loginUser, verifyUser } from '../controllers/auth-controller.js'


const router = express.Router();

router.post('/register',
    validateRequest({
        body:registerSchema,
    }),
   registerUser,)

   router.post('/login',
    validateRequest({
        body:loginSchema,
    }),
   loginUser,)


   router.post('/verify-email',
    validateRequest({
        body:verificationSchema
    }),
    verifyUser,
   )

   


   const authRoutes = router;
   export default authRoutes