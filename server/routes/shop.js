const router = require('express').Router();
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

router.get('/products', shopController.getProducts);
router.get('/product/:productId',shopController.findProduct)
router.post('/product/create/:userId', shopController.createProduct);
router.get('/my/products/:userId', shopController.getUserProducts)

module.exports = router;