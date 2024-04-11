import { stripe } from "../../utils/stripe";

export async function createCostumer() {
  try {
    const customer = await stripe.customers.create(
      {
        description: "My First Test Customer (created for API docs at https://www.stripe.com/docs/api)",
      },
      {
        idempotencyKey: "KG5LxwFBepaKHyUD",
      }
    );
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
