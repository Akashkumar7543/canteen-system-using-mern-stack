const https = require('https');

const PaytmChecksum = require('paytmchecksum');
const dotenv = require("dotenv");

dotenv.config();

const walletData = {
  balance: 1000,
  transactions: [],
};

const getWalletDetails = (req, res) => {
  res.json(walletData);
};

const createOrder = async (req, res) => {
  const { amount, userId } = req.body;

  const paytmParams = {
    MID: process.env.PAYTM_MID,
    WEBSITE: process.env.PAYTM_WEBSITE,
    CHANNEL_ID: 'WEB',
    INDUSTRY_TYPE_ID: 'Retail',
    ORDER_ID: `ORDER_${Date.now()}`,
    CUST_ID: userId,
    TXN_AMOUNT: amount.toString(),
    CALLBACK_URL: process.env.PAYTM_CALLBACK_URL,
    EMAIL: 'customer@example.com',
    MOBILE_NO: '7777777777',
  };

  try {
    const checksum = await PaytmChecksum.generateSignature(paytmParams, process.env.PAYTM_MERCHANT_KEY);
    res.json({ ...paytmParams, CHECKSUMHASH: checksum });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handlePaymentCallback = (req, res) => {
  let body = '';

  req.on('data', (data) => {
    body += data;
  });

  req.on('end', () => {
    const postData = JSON.parse(body);
    const paytmChecksum = postData.CHECKSUMHASH;

    const isValidChecksum = PaytmChecksum.verifySignature(postData, process.env.PAYTM_MERCHANT_KEY, paytmChecksum);

    if (isValidChecksum) {
      const params = { MID: process.env.PAYTM_MID, ORDERID: postData.ORDERID };

      PaytmChecksum.generateSignature(params, process.env.PAYTM_MERCHANT_KEY)
        .then((checksum) => {
          params.CHECKSUMHASH = checksum;

          const post_data = JSON.stringify(params);

          const options = {
            hostname: 'securegw-stage.paytm.in',
            port: 443,
            path: '/order/status',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': post_data.length,
            },
          };

          const post_req = https.request(options, (post_res) => {
            let response = '';

            post_res.on('data', (chunk) => {
              response += chunk;
            });

            post_res.on('end', () => {
              const result = JSON.parse(response);
              if (result.STATUS === 'TXN_SUCCESS') {
                walletData.balance += parseFloat(postData.TXNAMOUNT);
                walletData.transactions.push({
                  type: 'credit',
                  amount: parseFloat(postData.TXNAMOUNT),
                  date: new Date(),
                });
              }
              res.json(result);
            });
          });

          post_req.write(post_data);
          post_req.end();
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    } else {
      res.status(400).json({ error: 'Checksum mismatch' });
    }
  });
};

module.exports = {
  getWalletDetails,
  createOrder,
  handlePaymentCallback,
};
