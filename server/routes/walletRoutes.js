const express = require('express');
const { addMoney, verifyPayment, getWalletDetails, transferMoney, getUsers, getTransactions, orderProductWithWallet, getOrdersByUser } = require('../controllers/walletController');
const { protect } = require('../middlewares/protect');


const router = express.Router();

router.post('/add-money', addMoney);
router.post('/verify-payment', verifyPayment);
router.get('/:userId', getWalletDetails);
router.post('/tranfer-monye', transferMoney);
router.get('/getuser-quicktrans', getUsers);
router.get('/getTrans', getTransactions);
router.post('/orderWallte', orderProductWithWallet);
router.get('/orders/:userId', getOrdersByUser);







module.exports = router;
