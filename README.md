# SplitWisely | Tip Calculator & Bill Splitter

SplitWisely is a premium, real-time, responsive Tip Calculator and Bill Splitter web application built with React, TypeScript, Vite, and Vanilla CSS. It provides live updates as you type, currency settings, inline validation, and keyboard-accessible navigation.

---

## How to Run Locally

You can run the project locally with a single setup step:

```bash
npm install && npm run dev
```

### Step-by-Step Instructions
1. **Clone or download the project** to your local machine.
2. **Open a terminal** in the project directory:
   ```bash
   cd "Dev weekend Assesment"
   ```
3. **Run the installation and startup command**:
   ```bash
   npm install && npm run dev
   ```
4. **Open your browser** to [http://localhost:5173](http://localhost:5173) to view the application.

---

## Features

- **Live Real-time Updates**: Calculations update instantly on every keystroke with no "Calculate" button.
- **Defensive Input Handling**: Replaces native numeric input bugs with custom character sanitization on type/paste, preventing negative numbers or non-numeric garbage inputs.
- **Dynamic Font Resizing**: Displays scale down dynamically if numbers get too large, preventing layout breakage.
- **Currency Switcher**: Calculate splits in US Dollars (`$`), Euros (`€`), British Pounds (`£`), or Indian Rupees (`₹`).
- **Inline Validation Alerts**: Soft sliding error messages communicate validation alerts immediately near the input field.
- **Accurate Ceil Rounding**: Rounding policies are designed to split fractions up to the nearest cent, ensuring bills are never underpaid.
- **Full Accessibility**: Semantic HTML5 layout, clear keyboard focus indicators, screen reader attributes (`role="alert"`, `aria-live`, `aria-describedby`), and virtual keyboard overrides on mobile.

---

## Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Custom properties, grid layouts, glassmorphism UI)
- **Formatting**: ESLint 10

---

## Project Structure

```
├── dist/                  # Production builds
├── src/
│   ├── assets/            # Static assets
│   ├── components/        # Reusable UI Components
│   │   ├── DisplayPanel.tsx    # Output summary panel
│   │   ├── InputField.tsx      # Sanitize-on-input text fields
│   │   └── TipPresetGrid.tsx   # Tip presets + custom percentage field
│   ├── hooks/             # Application Logic
│   │   └── useCalculator.ts    # Custom hook containing calculation and state logic
│   ├── App.css            # Layout CSS
│   ├── App.tsx            # Main App container
│   ├── index.css          # Design tokens and custom variables
│   └── main.tsx           # React bootstrap entrypoint
├── index.html             # HTML Shell (SEO metadata, google fonts)
├── package.json           # Project dependencies & scripts
├── tsconfig.json          # TypeScript configuration
├── ANSWERS.md             # Written answers to the five assessment questions
└── README.md              # Project documentation
```
