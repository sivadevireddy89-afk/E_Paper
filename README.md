# Daily News E-Paper Website

A digital newspaper e-paper website inspired by traditional newspaper layouts.

## Features

- **Digital E-Paper Viewer**: Browse newspaper pages with smooth navigation
- **Page Navigation**: Previous/Next buttons, thumbnail grid, keyboard shortcuts (Arrow keys)
- **Zoom Controls**: Zoom in/out for better readability
- **Date Selection**: Select any date to view archived newspapers
- **Fullscreen Mode**: Immersive reading experience
- **Mobile Responsive**: Swipe gestures for page navigation on touch devices
- **Social Media Links**: Connect with the newspaper on social platforms

## Keyboard Shortcuts

- **← Arrow**: Previous page
- **→ Arrow**: Next page
- **ESC**: Exit fullscreen

## File Structure

```
newspaper-epaper/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── pages/              # Newspaper page images
│   ├── page-1.svg
│   ├── page-2.svg
│   └── ...
└── README.md           # This file
```

## Getting Started

1. Open `index.html` in a web browser
2. Use the toolbar to navigate pages
3. Click on thumbnails to jump to specific pages
4. Select a date to view archived editions

## Customization

### Adding Real Newspaper Pages

Replace the SVG placeholder files in the `pages/` folder with actual newspaper page images:

1. Export newspaper pages as JPG or PNG
2. Name them `page-1.jpg`, `page-2.jpg`, etc.
3. Update `script.js` to reference the new file extensions:
   - Change `.svg` to `.jpg` or `.png` in the `loadPage()` and `generateThumbnails()` functions

### Changing the Number of Pages

Edit `script.js` and update the `totalPages` variable:

```javascript
this.totalPages = 32; // Change to your number of pages
```

### Styling

The website uses CSS variables for easy customization. Edit the variables in `styles.css`:

```css
:root {
    --primary-color: #1a1a1a;
    --secondary-color: #c41e3a;
    --accent-color: #f4a261;
    /* ... */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Merriweather, Open Sans)

## License

© 2026 Daily News. All rights reserved.
