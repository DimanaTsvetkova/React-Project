const router = require('express').Router();
const orderController = require('../controllers/order');
const isAuth = require('../middleware/is-auth');


router.post('/order/create', orderController.createOrder);
router.get('/my/orders/:userId', orderController.getCurrentUserOrders);

module.exports = router;