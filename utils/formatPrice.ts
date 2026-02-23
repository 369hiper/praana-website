/**
 * Formats a price with the appropriate currency symbol
 * @param price - The numeric price value
 * @param currency - The currency code (USD, EUR, etc.)
 * @returns Formatted price string with currency symbol
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
  };

  const symbol = currencySymbols[currency.toUpperCase()] || '$';
  
  // Format with appropriate symbol placement
  if (currency === 'EUR') {
    return `€${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
  
  return `${symbol}${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
