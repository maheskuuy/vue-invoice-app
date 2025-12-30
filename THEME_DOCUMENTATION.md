# Dark Mode & Light Mode Implementation

## Overview
The Vue Invoice App now includes a fully functional dark mode and light mode toggle. The theme preference is saved to localStorage and persists across sessions.

## Features
✅ Dark Mode (Default)
✅ Light Mode
✅ Smooth transitions between themes
✅ Persistent theme preference (localStorage)
✅ Theme toggle button in Navigation bar
✅ CSS Variables for easy theming

## How It Works

### 1. Theme State Management (Vuex Store)
The theme state is managed in `src/store/index.js`:
- `darkMode`: Boolean state tracking current theme
- `TOGGLE_DARK_MODE`: Mutation to toggle between themes
- Theme preference is saved in localStorage

### 2. CSS Variables
Each mode defines its own set of CSS variables:

**Dark Mode Variables:**
```css
--bg-primary: #141625
--bg-secondary: #1e2139
--bg-tertiary: #252945
--bg-hover: #2e2a47
--text-primary: #fff
--text-secondary: #888eb0
--text-tertiary: #dfe3fa
--border-color: #3a3f5b
--input-bg: #1e2139
```

**Light Mode Variables:**
```css
--bg-primary: #f8f8fb
--bg-secondary: #ffffff
--bg-tertiary: #f5f5f9
--bg-hover: #eeeff9
--text-primary: #0c0e16
--text-secondary: #7e88c3
--text-tertiary: #252945
--border-color: #dfe3fa
--input-bg: #ffffff
```

### 3. Theme Toggle Button
Located in the Navigation component (`src/components/Navigation.vue`), the theme toggle uses:
- Moon icon from assets (icon-moon.svg)
- Simple click handler to dispatch the TOGGLE_DARK_MODE mutation
- Visual feedback on hover

### 4. Component Updates
All components use CSS variables instead of hardcoded colors:
- `App.vue` - Main app wrapper
- `Navigation.vue` - Header with theme toggle
- `Invoice.vue` - Invoice card display
- `InvoiceModal.vue` - Modal form
- `Modal.vue` - Confirmation dialog
- `Home.vue` - Invoice list view
- `InvoiceView.vue` - Invoice detail view

## Usage

### Toggle Theme
Click the moon icon in the top-right of the navigation bar to toggle between dark and light modes.

### Theme Persistence
The user's theme preference is automatically saved to localStorage. When they return to the app, their chosen theme will be applied.

### Customizing Colors
To customize the theme colors:

1. Open `App.vue`
2. Find the `.dark-mode` or `.light-mode` block in the styles
3. Update the CSS variable values as needed

Example:
```scss
.light-mode {
  --bg-primary: #f8f8fb;  // Change this color
  --text-primary: #0c0e16; // Change this color
  // ... other variables
}
```

### Adding Transitions
All color changes include smooth transitions (0.3s ease) for a better UX.

## Browser Support
Works in all modern browsers that support:
- CSS Custom Properties (CSS Variables)
- localStorage API
- SCSS

## Notes
- The default theme is Dark Mode
- Colors match the original design system
- Light mode is optimized for readability
- All text colors meet WCAG contrast requirements
