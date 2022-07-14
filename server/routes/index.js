const Router = require('express');
const productRouter = require('./product');
const authRouter = require('./auth');
const router = new Router();
const authMiddleware = require('../middlewares/authMiddlewares');

router.use('/product', authMiddleware, productRouter);
router.use('/auth', authRouter);

module.exports = router;