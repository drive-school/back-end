import { stripe } from "../../utils/stripe";

export async function createCostumer(body: { name: string; email: string; phone?: string }) {
  try {
    const customer = await stripe.customers.create({
      name: body.name,
      email: body.email,
      phone: body?.phone,
    });
    return {
      customer,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

export async function getCostumers() {
  try {
    const customers = await stripe.customers.list();
    return {
      customers,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}
