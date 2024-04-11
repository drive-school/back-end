const Stripe = require("stripe");
const stripe = Stripe(Bun.env.STRIPE_SECRET_KEY);

export { stripe };
