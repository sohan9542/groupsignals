/**
 * The pricing the site quotes, in one place. The landing page, the billing page
 * and the checkout button all read from here so a price change can't leave two
 * pages disagreeing with each other in front of a customer.
 */
export const offer = {
  foundingPrice: "$49",
  listPrice: "$149",
  foundingSeats: 20,
} as const;
