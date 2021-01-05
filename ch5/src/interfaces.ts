export interface Choice {
  name: string,
  abbreviation: string
}

export interface CurrencyConversion {
  id: string,
  amount: number,
  fromCurrency: string,
  toCurrency: string,
}

export interface TipCalculation {
  id: string,
  subtotal: number,
  country: string,
}
