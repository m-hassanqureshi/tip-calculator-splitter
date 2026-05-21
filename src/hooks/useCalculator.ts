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

  // Set individual fields
  const setBill = (val: string) => {
    setState((prev) => ({ ...prev, bill: val }));
  };

  const setTipPercent = (val: string, preset: number | null = null) => {
    setState((prev) => ({
      ...prev,
      tipPercent: val,
      activePreset: preset,
    }));
  };

  const setPeople = (val: string) => {
    setState((prev) => ({ ...prev, people: val }));
  };

  const setCurrency = (curr: Currency) => {
    setState((prev) => ({ ...prev, currency: curr }));
  };

  const reset = () => {
    setState(DEFAULT_STATE);
  };

  // Perform inline validation
  const errors = useMemo<ValidationErrors>(() => {
    const errs: ValidationErrors = {};

    // Validate Bill
    if (state.bill !== '') {
      const parsedBill = parseFloat(state.bill);
      if (isNaN(parsedBill)) {
        errs.bill = 'Please enter a valid number';
      } else if (parsedBill <= 0) {
        errs.bill = 'Bill must be greater than 0';
      } else if (parsedBill > 10000000) {
        errs.bill = 'Bill amount cannot exceed 10,000,000';
      }
    }

    // Validate Tip %
    if (state.tipPercent !== '') {
      const parsedTip = parseFloat(state.tipPercent);
      if (isNaN(parsedTip)) {
        errs.tipPercent = 'Please enter a valid number';
      } else if (parsedTip < 0) {
        errs.tipPercent = 'Tip cannot be negative';
      } else if (parsedTip > 1000) {
        errs.tipPercent = 'Tip percentage cannot exceed 1000%';
      }
    }

    // Validate Number of People
    if (state.people !== '') {
      const parsedPeople = parseFloat(state.people);
      if (isNaN(parsedPeople)) {
        errs.people = 'Please enter a valid number';
      } else if (!/^\d+$/.test(state.people)) {
        // Checks if there are decimals or invalid symbols
        errs.people = 'Number of people must be a whole number';
      } else {
        const intPeople = parseInt(state.people, 10);
        if (intPeople < 1) {
          errs.people = 'Must be at least 1 person';
        } else if (intPeople > 10000) {
          errs.people = 'Number of people cannot exceed 10,000';
        }
      }
    }

    return errs;
  }, [state.bill, state.tipPercent, state.people]);

  // Compute outputs
  const outputs = useMemo<CalculatorOutputs>(() => {
    const hasErrors = Object.keys(errors).length > 0;
    
    // Parse inputs, falling back to defaults if empty or invalid
    const billAmount = parseFloat(state.bill);
    const tipPercentage = parseFloat(state.tipPercent);
    const peopleCount = parseInt(state.people, 10);

    // If there are errors, or if fields are empty/invalid, return 0 outputs
    if (
      hasErrors ||
      isNaN(billAmount) ||
      billAmount <= 0 ||
      isNaN(peopleCount) ||
      peopleCount < 1
    ) {
      return {
        totalTip: 0,
        grandTotal: 0,
        perPersonBill: 0,
        perPersonTip: 0,
        perPersonTotal: 0,
      };
    }

    const tipMultiplier = isNaN(tipPercentage) || tipPercentage < 0 ? 0 : tipPercentage / 100;
    const totalTip = billAmount * tipMultiplier;
    const grandTotal = billAmount + totalTip;

    // Apply Rounding Policy: Ceil rounding (up to the nearest cent)
    // to prevent group underpayment.
    const perPersonTotal = Math.ceil((grandTotal / peopleCount) * 100) / 100;
    const perPersonTip = Math.ceil((totalTip / peopleCount) * 100) / 100;
    
    // Base bill per person is computed as the total share minus tip share,
    // which remains fully consistent: perPersonBill + perPersonTip = perPersonTotal
    const perPersonBill = Math.max(0, perPersonTotal - perPersonTip);

    return {
      totalTip,
      grandTotal,
      perPersonBill,
      perPersonTip,
      perPersonTotal,
    };
  }, [state.bill, state.tipPercent, state.people, errors]);

  // Determine if reset button should be active (enabled if any field is populated)
  const isResetEnabled = useMemo(() => {
    return (
      state.bill !== '' ||
      state.tipPercent !== '' ||
      state.people !== '' ||
      state.activePreset !== null
    );
  }, [state.bill, state.tipPercent, state.people, state.activePreset]);

  return {
    state,
    errors,
    outputs,
    isResetEnabled,
    setBill,
    setTipPercent,
    setPeople,
    setCurrency,
    reset,
  };
};
