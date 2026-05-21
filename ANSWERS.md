# Assessment Answers

This file contains answers to the five questions regarding the development, design, and architecture of the Tip Calculator & Bill Splitter application.

---

### 1. How to Run

Follow these steps to run the project locally on a fresh machine.

#### Prerequisites
Ensure you have **Node.js** (version 18.0.0 or higher) and **npm** installed.

#### Running Locally
1. Navigate to the project root directory:
   ```bash
   cd "Dev weekend Assesment"
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the address displayed in the terminal (typically [http://localhost:5173](http://localhost:5173)).

#### Production Build
To verify the production bundle:
```bash
npm run build
npm run preview
```

---

### 2. Stack & Design Choices

#### Why React + TypeScript + Vite + Vanilla CSS?
- **React**: Splitting a bill involves three interconnected inputs (bill, tip, and people) updating outputs live. React's declarative state model and virtual DOM updates are perfect for tracking live input state changes and propagating them instantly without manual DOM manipulation.
- **TypeScript**: Adds strong typing to states and props, preventing runtime crashes (such as accidentally passing `undefined` or a string to a calculation utility).
- **Vite**: Offers an incredibly fast developer loop (Instant HMR) and compiles to a highly optimized production bundle.
- **Vanilla CSS**: I chose vanilla CSS over Tailwind to showcase my custom layout engineering, design flexibility, and proper CSS variable-based design systems.

#### Visual and Interaction Decisions
1. **Dynamic Text Sizing on Output Display**:
   - *Affected Area*: The numeric value fields inside [DisplayPanel.tsx](file:///c:/Users/mhass/Downloads/Dev%20weekend%20Assesment/src/components/DisplayPanel.tsx).
   - *Rationale*: If a user enters a very large bill amount (e.g. $10,000,000) or splits a large bill among many people, standard fixed-size layouts overflow, forcing numbers to clip, wrap to new lines, or break the container. I implemented a helper function `getValueFontSizeClass` that checks the formatted string length. As the value grows longer (e.g., >9, >12, or >15 characters), I dynamically step down the font size class (`text-lg-val` to `text-xs-val`). This ensures the UI remains pristine and readable regardless of input magnitude.
2. **Text Input Mode with Regex Sanitization (Over `<input type="number">`)**:
   - *Affected Area*: The input fields inside [InputField.tsx](file:///c:/Users/mhass/Downloads/Dev%20weekend%20Assesment/src/components/InputField.tsx) and [TipPresetGrid.tsx](file:///c:/Users/mhass/Downloads/Dev%20weekend%20Assesment/src/components/TipPresetGrid.tsx).
   - *Rationale*: Native HTML `<input type="number">` has a notorious history of poor UX: it allows typing characters like 'e', '+', '-', and '.', handles scroll wheel ticks unexpectedly, and lacks uniform cross-browser styles. Instead, I used standard text inputs but forced mobile virtual keyboards (`inputMode="decimal"` and `inputMode="numeric"`) and bound a regex filter to the `onChange` event. For example, in decimal fields, any input character that is not a digit or a single dot is immediately stripped. This prevents the user from entering invalid symbols or negative signs entirely at the keystroke level, yielding a highly stable, predictable interface.

#### Rounding Policy Defense
I picked **Ceil Rounding** (rounding up to the nearest cent: `Math.ceil(value * 100) / 100`).
- *Defense*: In real-world commerce, bills must be fully paid. If 3 people split a `$10.00` bill, dividing it equally yields `$3.3333...`. If we round to the nearest cent (`$3.33` each), the group collects `$9.99`, leaving a `$0.01` shortfall. The server is underpaid, or someone has to pay an extra cent. By rounding up to the nearest cent (`$3.34` each), the group pays `$10.02`. The bill is covered, and the merchant receives an extra `$0.02` (which is treated as a minor bonus tip).
- *Mathematical Consistency*: To avoid confusing users with visual discrepancies, we ensure that:
  $$\text{Per-Person Bill} + \text{Per-Person Tip} = \text{Per-Person Total}$$
  I achieve this by computing `perPersonTotal = ceil(grandTotal / people)` and `perPersonTip = ceil(totalTip / people)`, then setting `perPersonBill = perPersonTotal - perPersonTip`.

---

### 3. Responsive & Accessibility

#### Responsive Behavior (360px Phone vs. 1440px Laptop)
- **1440px Laptop**: The application is rendered as a centered, split-pane glassmorphic card. Inputs occupy the left panel; outputs are housed on the right in a contrasting, dark-green card, allowing the user to scan inputs and outputs side-by-side.
- **360px Phone**: The layout stacks vertically into a single cohesive column (inputs on top, outputs immediately below). To ensure a great mobile experience, I:
  - Reduced card padding from `2rem` to `1.25rem`.
  - Shifted the 3-column tip grid into a 2-column layout (with the custom input spanning both columns) to maintain large, finger-friendly tap targets.
  - Positioned the output card below the inputs so it remains fully visible above the virtual keyboard when typing.

#### Accessibility Considerations
- **Handled**: **Interactive Focus & Semantic Structure**. I used semantic elements (`<main>`, `<header>`, `<section>`, `<label>`). Every custom input is linked via `htmlFor` to its label, and validation errors are bound using `aria-describedby` and marked with `role="alert"` + `aria-live="polite"` so screen readers immediately announce error states. Preset buttons toggle the `aria-pressed` attribute to reflect their active states.
- **Knowingly Skipped**: **Focus Trap in Inputs**. When pressing `Enter` on an input, we do not force focus to shift to the next input or lock tab loops. Since this is a single-screen form with only three inputs, browser-native tab-ordering is extremely clear and standard. Forcing focus transitions can disorient screen-reader users who rely on manual tab progression to build a mental map of the form layout.

---

### 4. AI Usage

I utilized **Gemini 3.5 Flash** (via the Antigravity AI Coding Assistant) to help build this application.

#### AI Interactions
1. **Implementation Scaffolding**: I described the requirements and asked for an optimal file structure and component architecture.
   - *AI Output*: Suggested creating `InputField.tsx`, `TipPresetGrid.tsx`, `DisplayPanel.tsx` under a components directory, with state managed by a custom hook.
2. **Component CSS layout**: Asked for styling suggestions for a premium glassmorphism dark-slate theme with an emerald green output card.
   - *AI Output*: Provided variable tokens and a responsive layout model.
3. **Type Import Handling**: Encountered errors from Vite's strict TypeScript settings during compilation.
   - *AI Output*: Recommended splitting standard module imports into type-only imports.

#### Specific Changes to AI Output
- *Initial AI Code*: The AI's initial suggestions for input fields used standard `<input type="number" min="0">` tags and recommended displaying error boxes directly below the input fields.
- *What I Changed & Why*:
  1. I replaced `<input type="number">` with text inputs using dynamic regex sanitization and mobile `inputMode` modifiers. This stopped mobile browsers from adding annoying spinner arrows, prevented scroll-wheel volume adjustments, and blocked pasting invalid letters.
  2. I moved the inline error message to the right side of the label row (aligned horizontally) and added a CSS keyframe slide animation (`slideDown`). This layout choice keeps the input elements perfectly aligned vertically, eliminating the jarring "layout shift/flickering" that happens when an error message is inserted vertically above or below the input box.

---

### 5. Honest Gap

If I had another day, I would focus on adding **Component Unit & Integration Testing**:
- Currently, validation and calculations are verified manually in the browser dev environment. 
- While the custom hook `useCalculator.ts` is fully isolated and easy to test, writing automated unit tests using **Vitest + React Testing Library** would make the codebase enterprise-ready. I would write test suites covering:
  - Exact rounding boundaries (e.g. dividing $0.01 between 3 people).
  - Rapid keystroke changes and input cleaning.
  - Screen reader announcements of computed values using DOM testing utilities.
