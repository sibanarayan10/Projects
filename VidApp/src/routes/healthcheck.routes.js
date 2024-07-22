import { Router } from 'express';
import { healthcheck } from "../Controller/healthcheck.controller.js"

const router = Router();

router.route('/').get(healthcheck);

export default router