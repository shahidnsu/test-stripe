const express = require("express");
const app = express();
const stripe = require("stripe")(
  "sk_test_51MY4IxSBAh58gJJH6MipdMhrxQEp18M6IYjgNL7jmfq9Dfarhm7kiiNPYl8pkQUTQ67m58Eh0YnAsXrRg6wbAmkD0028G4CWPw"
);

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
  });

  res.json({ id: session.id });
});

app.listen(3000, () => console.log(`Listening on port 3000!`));
