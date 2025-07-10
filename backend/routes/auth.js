import express from 'express'
import zod from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateRequest } from 'zod-express-middleware'
import { registerSchema } from '../libs/validate-schema.js'
import { registerUser } from '../controllers/auth-controller.js'


const router = express.Router();

router.post('/register',
    validateRequest({
        body:registerSchema,
    }),
   registerUser,)

   const authRoutes = router;
   export default authRoutes