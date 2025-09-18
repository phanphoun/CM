# Khmer Math Educational Website - SASS Documentation

## Overview

This project uses SASS (Syntactically Awesome Style Sheets) to create modular, maintainable, and scalable CSS for the Khmer Math Educational Website. The SASS structure is organized to support grade-specific theming while maintaining consistency across all pages.

## Project Structure

```
projects/
├── sass/                          # SASS source files
│   ├── _variables.scss           # Global variables (colors, fonts, spacing)
│   ├── _mixins.scss              # Reusable mixins (gradients, animations, responsive)
│   ├── _base.scss                # Base styles (typography, reset, defaults)
│   ├── _layout.scss              # Layout components (header, footer, navigation)
│   ├── _grid.scss                # Grid system and layout helpers
│   ├── _components.scss          # Reusable components (buttons, cards, forms)
│   ├── _grade7.scss              # Grade 7 specific styles (partial)
│   ├── _grade8.scss              # Grade 8 specific styles (partial)
│   ├── _grade9.scss              # Grade 9 specific styles (partial)
│   ├── _grade10.scss             # Grade 10 specific styles (partial)
│   ├── _grade11.scss             # Grade 11 specific styles (partial)
│   ├── _grade12.scss             # Grade 12 specific styles (partial)
│   ├── main.scss                 # Main SASS entry point
│   ├── grade7.scss               # Grade 7 compilation entry point
│   ├── grade8.scss               # Grade 8 compilation entry point
│   ├── grade9.scss               # Grade 9 compilation entry point
│   ├── grade10.scss              # Grade 10 compilation entry point
│   ├── grade11.scss              # Grade 11 compilation entry point
│   └── grade12.scss              # Grade 12 compilation entry point
├── css/                          # Compiled CSS output
│   ├── style.css                 # Main compiled CSS
│   ├── grade7.css                # Grade 7 compiled CSS
│   ├── grade8.css                # Grade 8 compiled CSS
│   ├── grade9.css                # Grade 9 compiled CSS
│   ├── grade10.css               # Grade 10 compiled CSS
│   ├── grade11.css               # Grade 11 compiled CSS
│   └── grade12.css               # Grade 12 compiled CSS
├── build-sass.bat                # Build script for compiling SASS
├── watch-sass.bat                # Watch script for auto-compilation
└── README.md                     # This documentation file
```

## SASS File Organization

### Partial Files (Prefixed with `_`)
Partial files are SASS files that are meant to be imported into other SASS files but not compiled into their own CSS files.

#### `_variables.scss`
- **Purpose**: Defines all global variables used throughout the project
- **Contents**: 
  - Color variables for each grade theme
  - Typography variables (font sizes, families, weights)
  - Spacing variables (margins, padding)
  - Breakpoint variables for responsive design
  - Animation timing variables

#### `_mixins.scss`
- **Purpose**: Contains reusable mixins for common styling patterns
- **Contents**:
  - `gradient-background()`: Creates gradient backgrounds
  - `respond()`: Responsive design mixin for media queries
  - `button-styles()`: Standardized button styling
  - `card-styles()`: Card component styling
  - `animation-fade-in()`: Fade-in animation effects
  - `hover-effects()`: Standardized hover effects

#### `_base.scss`
- **Purpose**: Base styles and CSS resets
- **Contents**:
  - CSS normalization and reset
  - Base typography styles
  - Default element styles
  - Accessibility base styles
  - Box-sizing and default behaviors

#### `_layout.scss`
- **Purpose**: Layout-specific styles
- **Contents**:
  - Header and navigation styles
  - Footer styles
  - Main content area layout
  - Page structure and positioning
  - Responsive layout adjustments

#### `_grid.scss`
- **Purpose**: Grid system and layout helpers
- **Contents**:
  - CSS Grid layouts
  - Flexbox utilities
  - Container and wrapper classes
  - Grid gap and alignment utilities
  - Responsive grid breakpoints

#### `_components.scss`
- **Purpose**: Reusable component styles
- **Contents**:
  - Button styles (primary, secondary, outline)
  - Card component styles
  - Form element styles
  - Navigation components
  - Modal and dialog styles
  - Badge and progress indicator styles

#### Grade-Specific Partials (`_grade7.scss` through `_grade12.scss`)
- **Purpose**: Grade-specific styling and theming
- **Contents**:
  - Grade-specific header styles with unique gradients
  - Grade-specific lesson card styling
  - Grade-specific quiz section styling
  - Grade-specific progress tracking styles
  - Grade-specific utility classes

### Entry Point Files
These files are compiled directly into CSS files.

#### `main.scss`
- **Purpose**: Main SASS entry point for the website
- **Compilation Output**: `css/style.css`
- **Imports**: All base files and shared components
- **Usage**: Used by `index.html` and shared across all pages

#### Grade-Specific Entry Points (`grade7.scss` through `grade12.scss`)
- **Purpose**: Grade-specific SASS entry points
- **Compilation Output**: `css/grade[X].css` (where X is the grade number)
- **Imports**: Base files + grade-specific partial
- **Usage**: Used by individual grade lesson pages (`pages/grade[X].html`)

## Grade Color Themes

Each grade has its own unique color theme:

| Grade | Primary Color | Secondary Color | Gradient | Theme Name |
|-------|---------------|-----------------|----------|------------|
| 7 | #667eea | #764ba2 | `linear-gradient(135deg, #667eea, #764ba2)` | Purple Gradient |
| 8 | #f093fb | #f5576c | `linear-gradient(135deg, #f093fb, #f5576c)` | Pink Gradient |
| 9 | #4facfe | #00f2fe | `linear-gradient(135deg, #4facfe, #00f2fe)` | Blue Gradient |
| 10 | #fa709a | #fee140 | `linear-gradient(135deg, #fa709a, #fee140)` | Coral Gradient |
| 11 | #a8edea | #fed6e3 | `linear-gradient(135deg, #a8edea, #fed6e3)` | Soft Gradient |
| 12 | #ffecd2 | #fcb69f | `linear-gradient(135deg, #ffecd2, #fcb69f)` | Warm Gradient |

## Build Scripts

### `build-sass.bat`
- **Purpose**: Compile all SASS files to CSS
- **Usage**: Double-click or run from command line
- **Features**:
  - Checks if SASS is installed
  - Creates `css` directory if needed
  - Compiles all SASS files with compressed output
  - Provides success/error feedback
  - Shows compilation summary

### `watch-sass.bat`
- **Purpose**: Watch SASS files for changes and auto-compile
- **Usage**: Double-click or run from command line
- **Features**:
  - Opens separate windows for each SASS file
  - Automatically recompiles on file changes
  - Uses compressed output for production
  - Provides real-time feedback

## Compilation Commands

### Manual Compilation
If you prefer to compile files manually, use these commands:

```bash
# Compile main stylesheet
sass sass/main.scss css/style.css --style compressed

# Compile grade-specific stylesheets
sass sass/grade7.scss css/grade7.css --style compressed
sass sass/grade8.scss css/grade8.css --style compressed
sass sass/grade9.scss css/grade9.css --style compressed
sass sass/grade10.scss css/grade10.css --style compressed
sass sass/grade11.scss css/grade11.css --style compressed
sass sass/grade12.scss css/grade12.css --style compressed
```

### Watch Mode
To watch individual files for changes:

```bash
# Watch main stylesheet
sass sass/main.scss css/style.css --watch --style compressed

# Watch grade-specific stylesheets
sass sass/grade7.scss css/grade7.css --watch --style compressed
sass sass/grade8.scss css/grade8.css --watch --style compressed
sass sass/grade9.scss css/grade9.css --watch --style compressed
sass sass/grade10.scss css/grade10.css --watch --style compressed
sass sass/grade11.scss css/grade11.css --watch --style compressed
sass sass/grade12.scss css/grade12.css --watch --style compressed
```

## SASS Features Used

### Variables
- Color definitions for consistent theming
- Typography scales for responsive design
- Spacing units for consistent layout
- Breakpoint definitions for media queries

### Mixins
- Reusable gradient backgrounds
- Responsive design patterns
- Standardized component styling
- Animation and transition effects

### Nesting
- Organized CSS structure
- Scoped component styles
- Pseudo-class and pseudo-element nesting
- Media query nesting

### Partials
- Modular file organization
- Separation of concerns
- Reusable code components
- Maintainable codebase

### Import
- File concatenation
- Dependency management
- Grade-specific theming
- Shared component libraries

## Best Practices

### File Organization
1. **Use partials** for files that shouldn't compile individually
2. **Prefix partials** with underscore (`_`)
3. **Group related styles** in appropriate files
4. **Follow naming conventions** consistently

### Variable Usage
1. **Define colors** in `_variables.scss`
2. **Use semantic names** for variables
3. **Create color scales** for consistency
4. **Define typography scales** for responsive design

### Mixin Development
1. **Create reusable mixins** for common patterns
2. **Parameterize mixins** for flexibility
3. **Document mixin usage** with comments
4. **Use mixins** for cross-browser compatibility

### Responsive Design
1. **Use mobile-first approach**
2. **Define breakpoints** in variables
3. **Use responsive mixins** consistently
4. **Test on multiple devices**

### Performance
1. **Use compressed output** for production
2. **Minimize CSS** through efficient SASS
3. **Avoid deep nesting** (max 3-4 levels)
4. **Use placeholder selectors** for extended styles

## Installation Requirements

### Prerequisites
- Node.js (npm)
- SASS/SCSS compiler

### Install SASS
```bash
npm install -g sass
```

### Verify Installation
```bash
sass --version
```

## Troubleshooting

### Common Issues

**SASS not found error**
- Ensure SASS is installed globally: `npm install -g sass`
- Check if SASS is in your PATH
- Restart your terminal/command prompt

**Compilation errors**
- Check for syntax errors in SASS files
- Verify all imports are correct
- Ensure all partial files exist
- Check for missing semicolons or brackets

**Watch mode not working**
- Ensure file paths are correct
- Check file permissions
- Verify SASS installation
- Try restarting the watch script

### Getting Help
- Check SASS documentation: https://sass-lang.com/documentation
- Review compilation logs for error details
- Verify file structure matches documentation
- Test individual file compilation

## Contributing

### Adding New Grades
1. Create `_grade[X].scss` partial file
2. Create `grade[X].scss` entry point file
3. Define grade-specific variables and styles
4. Update build scripts if needed
5. Update documentation

### Modifying Themes
1. Update color variables in `_variables.scss`
2. Modify grade-specific partials
3. Test compilation
4. Verify visual consistency
5. Update documentation

### Adding New Components
1. Add component styles to `_components.scss`
2. Create mixins if needed in `_mixins.scss`
3. Define variables in `_variables.scss`
4. Test across all grades
5. Document usage

## License

This project is part of the Khmer Math Educational Website and follows the same license terms.

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Author**: Khmer Math Educational Website Team
