# SASS Structure for Khmer Math Educational Website

## Overview

This directory contains the SASS source files for the Khmer Math Educational Website. The SASS structure is organized to provide modular, maintainable, and scalable CSS for the entire website.

## File Structure

```
sass/
├── README.md                    # This documentation file
├── main.scss                    # Main entry point for the landing page
├── _variables.scss              # Global variables (colors, spacing, typography)
├── _mixins.scss                 # Reusable mixins (gradients, buttons, responsive)
├── _base.scss                   # Base styles and resets
├── _layout.scss                 # Layout components (header, footer, navigation)
├── _grid.scss                   # Grid system and responsive utilities
├── _components.scss             # Reusable components (cards, buttons, forms)
├── _sections.scss               # Page sections (hero, grades, quiz, etc.)
├── _grade7.scss                 # Grade 7 specific styles
├── _grade8.scss                 # Grade 8 specific styles
├── _grade9.scss                 # Grade 9 specific styles
├── _grade10.scss                # Grade 10 specific styles
├── _grade11.scss                # Grade 11 specific styles
├── _grade12.scss                # Grade 12 specific styles
├── grade7.scss                  # Grade 7 entry point
├── grade8.scss                  # Grade 8 entry point
├── grade9.scss                  # Grade 9 entry point
├── grade10.scss                 # Grade 10 entry point
├── grade11.scss                 # Grade 11 entry point
└── grade12.scss                 # Grade 12 entry point
```

## Color Themes

Each grade has its own unique color theme:

- **Grade 7**: Purple gradient (#667eea to #764ba2)
- **Grade 8**: Pink gradient (#f093fb to #f5576c)
- **Grade 9**: Blue gradient (#4facfe to #00f2fe)
- **Grade 10**: Coral gradient (#fa709a to #fee140)
- **Grade 11**: Soft gradient (#a8edea to #fed6e3)
- **Grade 12**: Warm gradient (#ffecd2 to #fcb69f)

## Compilation Commands

### Main Landing Page
```bash
# Compile main.scss to style.css
sass sass/main.scss css/style.css --watch

# Or with compressed output
sass sass/main.scss css/style.css --style compressed --watch
```

### Grade-Specific Pages
```bash
# Compile all grade-specific files
sass sass/grade7.scss css/grade7.css --watch
sass sass/grade8.scss css/grade8.css --watch
sass sass/grade9.scss css/grade9.css --watch
sass sass/grade10.scss css/grade10.css --watch
sass sass/grade11.scss css/grade11.css --watch
sass sass/grade12.scss css/grade12.css --watch

# Or with compressed output
sass sass/grade7.scss css/grade7.css --style compressed --watch
sass sass/grade8.scss css/grade8.css --style compressed --watch
sass sass/grade9.scss css/grade9.css --style compressed --watch
sass sass/grade10.scss css/grade10.css --style compressed --watch
sass sass/grade11.scss css/grade11.css --style compressed --watch
sass sass/grade12.scss css/grade12.css --style compressed --watch
```

### Batch Compilation
```bash
# Compile all files at once (Linux/macOS)
for file in sass/grade*.scss; do
  sass "$file" "css/$(basename "$file" .scss).css" --style compressed
done

# Compile all files at once (Windows PowerShell)
Get-ChildItem -Path sass -Filter "grade*.scss" | ForEach-Object {
  sass $_.FullName "css/$($_.BaseName).css" --style compressed
}
```

## File Descriptions

### Core Files

- **`_variables.scss`**: Contains all global variables including colors, spacing, typography, breakpoints, and gradients.
- **`_mixins.scss`**: Reusable mixins for gradients, buttons, responsive design, and animations.
- **`_base.scss`**: Base styles, resets, and default styles for HTML elements.
- **`_layout.scss`**: Layout components including header, footer, navigation, and main container styles.
- **`_grid.scss`**: Grid system and responsive utilities for flexible layouts.
- **`_components.scss`**: Reusable components like cards, buttons, forms, and progress bars.
- **`_sections.scss`**: Page-specific sections like hero, grades selection, quiz, and contact sections.

### Grade-Specific Files

- **`_grade[X].scss`**: Grade-specific styles that override or extend base styles with unique colors and layouts.
- **`grade[X].scss`**: Entry point files that import all necessary files and set up grade-specific variables.

## Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (576px), md (768px), lg (992px), xl (1200px)
- Flexible grid system
- Responsive typography

### Modern CSS Features
- CSS Grid and Flexbox
- CSS Custom Properties (variables)
- Gradients and animations
- Hover effects and transitions
- Box shadows and transforms

### Accessibility
- Semantic HTML5 structure support
- ARIA attributes support
- Keyboard navigation styles
- High contrast considerations

### Performance
- Modular structure for better caching
- Optimized compilation with compression
- Minimal CSS duplication
- Efficient selector patterns

## Customization

### Adding New Colors
1. Define new color variables in `_variables.scss`
2. Add new gradient variables in `_variables.scss`
3. Create utility classes in grade-specific files

### Adding New Components
1. Add component styles to `_components.scss`
2. Use BEM naming convention
3. Include responsive variants
4. Add hover states and animations

### Adding New Grades
1. Create `_grade[X].scss` with grade-specific styles
2. Create `grade[X].scss` entry point file
3. Define grade-specific color variables
4. Add compilation command to build process

## Best Practices

### Naming Conventions
- Use BEM (Block Element Modifier) methodology
- Prefix grade-specific classes with grade number
- Use kebab-case for class names
- Be descriptive but concise

### Organization
- Keep related styles together
- Use partial files (prefixed with underscore)
- Import files in logical order
- Comment sections clearly

### Performance
- Avoid overly specific selectors
- Use inheritance and composition
- Minimize CSS duplication
- Optimize for mobile first

## Troubleshooting

### Common Issues

**Import Errors**
- Check file paths
- Ensure partial files are prefixed with underscore
- Verify file extensions

**Compilation Errors**
- Check syntax errors
- Verify variable names
- Ensure proper nesting

**Style Conflicts**
- Check specificity
- Verify import order
- Use !important sparingly

### Debug Tips

1. Use source maps for debugging
2. Check browser developer tools
3. Validate CSS with online tools
4. Test across different browsers

## Dependencies

- SASS/SCSS compiler
- Modern web browser
- Node.js (for build tools, optional)

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari 12+, Chrome for Android 60+)

## Future Enhancements

- Add CSS custom properties for dynamic theming
- Implement CSS modules for component isolation
- Add PostCSS integration for autoprefixing
- Include CSS-in-JS support for dynamic styles
- Add stylelint for code quality

## Contributing

1. Follow the established naming conventions
2. Keep styles modular and reusable
3. Test across different browsers and devices
4. Document new features and changes
5. Optimize for performance and accessibility
