import { Router } from "express";
const router = Router();

import { createUser, login } from '../controllers/user.controllers';

router.route('/register')
   .post(createUser)


   router.route('/login')
   .post(login)
   

export default router;