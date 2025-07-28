app.post('/create-checkout-session', async (req, res) => {
  const cart = req.body.cart; // Array: [{ name, price, quantity }]
  const line_items = cart.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: line_items,
    mode: 'payment',
    success_url: 'https://yourdomain.com/success',
    cancel_url: 'https://yourdomain.com/cancel',
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
  });

  res.json({ sessionId: session.id });
});