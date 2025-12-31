# Step 01: Theme and Layout

**Status: DONE**

## Overview
Set up the custom Electric Violet theme and connect all layout components.

## Tasks

- [x] Update `app/globals.css` with custom theme variables
- [x] Update `app/layout.tsx` to use ThemeProvider, Header, Footer
- [x] Build succeeds without errors
- [ ] Verify theme toggle works (dark/light mode) - Run `npm run dev` to test
- [ ] Test responsive header navigation - Run `npm run dev` to test

## Design Tokens

### Colors (Electric Violet Theme)
```css
/* Dark Mode (Default) */
--background: #0a0a0f
--foreground: #f1f5f9
--surface: #12121a
--surface-hover: #1a1a24
--primary: #8b5cf6 (Electric Violet)
--primary-hover: #a78bfa
--muted-foreground: #94a3b8
--border: #27272a
--code: #1a1a24

/* Light Mode */
--background: #fafafa
--foreground: #0a0a0f
--surface: #ffffff
--primary: #8b5cf6
```

### Typography
- Font: Lexend Deca (weights: 300, 400, 600, 700)
- Hero: 4xl-6xl, font-semibold
- Body: base-lg, font-light (300)

## Files to Modify

### `app/globals.css`
Add custom CSS variables for the Electric Violet theme, prose styling, code block styles, animations.

### `app/layout.tsx`
- Import Lexend Deca font from next/font/google
- Wrap app with ThemeProvider (default to dark)
- Add Header and Footer components
- Add Vercel Analytics
- Add SearchDialog placeholder

## Expected Outcome
- Dark theme displays by default
- Theme toggle switches between dark/light
- Header shows navigation and search button
- Footer shows social links
- Smooth transitions on theme change

## Verification
```bash
npm run dev
# Visit http://localhost:3000
# - Page should have dark background (#0a0a0f)
# - Header should show DevGiroux logo
# - Theme toggle should work
# - Mobile menu should work
```

## Next Step
Proceed to [02-mdx-configuration](../02-mdx-configuration/README.md)
