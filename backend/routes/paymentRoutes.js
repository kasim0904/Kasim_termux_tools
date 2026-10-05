import express from 'express';

const router = express.Router();

// Process Payment (PayPal, Credit Card / Visa, EVC Plus, Zaad, Sahal)
router.post('/process', (req, res) => {
  const { paymentMethod, amount, cardNumber, expiry, cvc, paypalEmail, phone } = req.body;

  if (!paymentMethod || !amount) {
    return res.status(400).json({ message: 'Payment method and amount are required' });
  }

  const prefix = paymentMethod.toUpperCase().replace(/\s+/g, '');
  const transactionId = `${prefix}-TX-${Date.now().toString().slice(-8)}`;

  // Simulate payment processing delay & response
  setTimeout(() => {
    res.json({
      success: true,
      message: `Payment of $${amount} via ${paymentMethod} approved successfully!`,
      transactionId,
      paymentMethod,
      amount,
      status: 'Paid',
      timestamp: new Date().toISOString()
    });
  }, 400);
});

export default router;
