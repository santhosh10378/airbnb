const EXCHANGE_RATE_API_URL = "https://api.exchangerate-api.com/v4/latest/";

// Converts an amount from one currency to another
export const convertCurrency = async ({
  amount,
  fromCurrency = "USD",
  toCurrency = "INR",
}) => {
  try {
    const response = await fetch(`${EXCHANGE_RATE_API_URL}${fromCurrency}`);
    const data = await response.json();

    if (!data.rates || !data.rates[toCurrency]) {
      throw new Error("Invalid currency code");
    }

    const exchangeRate = data.rates[toCurrency];
    const convertedAmount = amount * exchangeRate;

    return formatCurrency({
      amount: convertedAmount,
      currency: toCurrency,
    });
  } catch (error) {
    console.error("Error converting currency:", error);
    return null;
  }
};

// Formats an amount as currency according to locale and currency code
export const formatCurrency = ({
  amount,
  currency = "INR",
  locale = "en-IN",
}) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Calculates the total extra charges based on dynamic charges and guest counts
export const calculateExtraCharges = (charges, guestCounts) => {
  let totalExtraCharges = 0;

  Object.keys(charges).forEach((chargeType) => {
    const chargeAmount = charges[chargeType];
    const guestCount = guestCounts[chargeType];

    if (chargeAmount != null && guestCount != null) {
      totalExtraCharges += chargeAmount * guestCount;
    }
  });

  return totalExtraCharges;
};
