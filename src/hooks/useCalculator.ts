import { useState, useMemo } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';

export interface CurrencyConfig {
  symbol: string;
  label: string;
  name: string;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: { symbol: '$', label: 'USD', name: 'US Dollar' },
  EUR: { symbol: '€', label: 'EUR', name: 'Euro' },
  GBP: { symbol: '£', label: 'GBP', name: 'British Pound' },
  INR: { symbol: '₹', label: 'INR', name: 'Indian Rupee' },
};

export interface CalculatorState {
  bill: string;
  tipPercent: string;
  people: string;
  currency: Currency;
  activePreset: number | null;
}

export interface ValidationErrors {
  bill?: string;
  tipPercent?: string;
  people?: string;
}

export interface CalculatorOutputs {
  totalTip: number;
  grandTotal: number;
  perPersonBill: number;
  perPersonTip: number;
  perPersonTotal: number;
}

const DEFAULT_STATE: CalculatorState = {
  bill: '',
  tipPercent: '',
  people: '',
  currency: 'USD',
  activePreset: null,
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(DEFAULT_STATE);

  return {
    state,
  };
};