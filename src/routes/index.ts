import express from 'express';
const router = express.Router();
export default router;

router.use('/', require('./home').default);
router.use('/auth', require('./auth').default);
router.use('/users', require('./users').default);