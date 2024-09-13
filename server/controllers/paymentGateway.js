const stripe = require('stripe')('sk_test_51O94muSC6ajFAc9MfRtSV6EQyDiT5obenSMzoJ9TzMxoxtiEYCD0N9kIsOrhRWJrYI5TFSamjfxoWzgsFJFwHStc00NtrrPD0Y'); // Replace with your Stripe secret key

module.exports = {
  processPayment: async (paymentDetails) => {
    try {
      // Validate input data
      if (!paymentDetails.amount || !paymentDetails.paymentMethodId) {
        throw new Error('Missing required fields: amount or paymentMethodId');
      }

      // Create a PaymentIntent with automatic payment methods
      const paymentIntent = await stripe.paymentIntents.create({
        amount: paymentDetails.amount, // Amount in cents
        currency: 'usd', // Replace with your desired currency
        payment_method: paymentDetails.paymentMethodId,
        automatic_payment_methods: {
          enabled: true, // Automatically handle various payment methods
          allow_redirects: 'never', // Disable redirects
        },
      });

      // Check if the payment requires further action
      if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_source_action') {
        return {
          success: false,
          requiresAction: true,
          clientSecret: paymentIntent.client_secret,
        };
      }

      return { success: true, transactionId: paymentIntent.id };
    } catch (error) {
      console.error('Error processing payment:', error);
      return { success: false, error: error.message };
    }
  },
};
