import { Router } from "express";
const router = Router();

import { indexWelcome } from '../controllers/index.controllers';

router.route('/')
   .get(indexWelcome);

export default router;
