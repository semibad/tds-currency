# TDS 'ConverterApp'

## Setup
- Clone repo and run `npm install` to set up dependencies
- Create an `.env.local` (based on `.env.example`) and add a valid API key
- Run locally using `npm run dev`
- Tests can be run locally using `npm run test` and `npm run test:coverage`

## Notes / assumptions
- Not sure if rounding on zero-precision currencies is correctly handled – I chose to always round down since this felt safest for a currency-based output
- Would have liked to do more research into LTR / RTL handling in `CurrencyValue` – had some interesting formatting issues when working with RTL currency symbols
- Didn’t do anything with currency subunits – expect my solution could have used `roundingIncrement` to handle this
- Doesn't take into account the user's locale settings – I've assumed that we should display currency formats following only the rules from the supplied API resource
- I've used `Intl.NumberFormat` as a safe and trusted way to format a number into a string with thousand seperators and variable decimal precision, but not for the currency formats themselves (since a specific API was provided as source of truth for formatting rules)

## What I'd do next
- Optional features: better UX on currency select dropdowns (for example, splitting 'most used currencies' into a seperate option group for easier access), historical currency conversion with an optional datepicker
- Better error handling – current UI doesn't fall over if API errors are returned, but it could give better user feedback if key data isn't returned
- Component-level tests if I expected to use them more generically – as the UI components are very specific to the single feature flow, I have chosen to test them through interaction coverage in `ConverterApp.spec.tsx`