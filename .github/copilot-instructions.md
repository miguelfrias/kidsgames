# GitHub Copilot Instructions for Kids Games Project

## Project Overview
This is a React-based web application featuring educational games for children aged 3-6. The app includes drawing tools, games like Tic-Tac-Toe, and learning activities to help kids with letters, colors, and word building.

## Technology Stack
- **Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.0
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM 7.6.3
- **UI Components**: Headless UI 2.2.4
- **Icons**: Heroicons 2.2.0
- **Deployment**: GitHub Pages with custom base path `/kidsgames/`

## Code Style & Conventions
### General Guidelines
- Use TypeScript for all files
- Follow the Airbnb JavaScript Style Guide
- Use 2 spaces for indentation
- Use single quotes for strings
- Don't use semicolons at the end of statements
- Use `const` for constants and `let` for variables that change
- Use `camelCase` for variable and function names
- Use `PascalCase` for component names and TypeScript interfaces
- Write clear, descriptive comments for complex logic
- Write production ready code with no console logs or commented-out code
- Use `eslint` and `prettier` for code formatting and linting
- Use SOLID principles for component design
- Use functional programming patterns where applicable
- Use `useCallback` and `useMemo` to optimize performance
- Use TypeScript interfaces for props and state management
- Define constants at the top of the file

### React Components
- Use functional components with TypeScript
- Prefer `function ComponentName()` over arrow functions for component declarations
- Use proper TypeScript interfaces for props
- Keep components in `/src/components/` directory
- Use descriptive, PascalCase component names

### State Management
- Use React hooks (`useState`, `useEffect`, etc.)
- Keep state local to components when possible
- Use proper dependency arrays in `useEffect`

### Styling Guidelines
- Use Tailwind CSS classes exclusively
- Prefer utility classes over custom CSS
- Use responsive design classes (`sm:`, `md:`, `lg:`)
- Keep custom CSS minimal in component files
- Target touch-friendly interfaces (larger buttons, easy tap targets)

### File Organization
```
src/
├── components/          # Reusable UI components
├── page/               # Page-level components and routing
├── App.tsx             # Main app component
├── App.css             # Global styles with Tailwind imports
└── main.tsx            # App entry point
```

## Game-Specific Guidelines

### User Experience for Kids (Age 3-6)
- Large, touch-friendly buttons and interactive elements
- Simple, clear visual feedback
- Bright, engaging colors
- Immediate response to user actions
- Error-tolerant design (no punishment for mistakes)
- Short attention span consideration (5-15 minute sessions)

### Canvas/Drawing Components
- Handle both mouse and touch events
- Prevent default touch behaviors to avoid scrolling issues
- Use proper canvas sizing and responsive design
- Implement proper cleanup in useEffect hooks

### Game Logic
- Keep game rules simple and intuitive
- Provide visual and audio feedback
- Include reset/restart functionality
- Handle edge cases gracefully

## Development Practices

### Performance
- Optimize for mobile devices
- Use proper dependency arrays in useEffect
- Avoid unnecessary re-renders
- Handle orientation changes properly

### Accessibility
- Use semantic HTML elements
- Include proper ARIA labels where needed
- Ensure keyboard navigation works
- Test on various screen sizes

### Error Handling
- Gracefully handle touch/mouse event differences
- Provide fallbacks for canvas operations
- Handle window resize events properly

## Deployment Configuration
- Base path is set to `/kidsgames/` for GitHub Pages
- Build process uses Vite with TypeScript compilation
- Ensure all asset paths work with the base path

## Common Patterns to Follow

### Event Handling
```typescript
// Handle both mouse and touch events
const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
  // Handle the event
};
```

### Canvas Management
```typescript
useEffect(() => {
  // Canvas setup
  const canvas = canvasRef.current;
  if (!canvas) return;
  
  // Setup logic here
  
  return () => {
    // Cleanup logic here
  };
}, [dependencies]);
```

### Responsive Design
```typescript
// Use Tailwind responsive classes
className="w-full h-full sm:w-auto sm:h-auto lg:max-w-4xl"
```

## What to Prioritize
1. **Child-friendly UX**: Always consider the 3-6 age group
2. **Touch compatibility**: Ensure all interactions work on tablets/phones
3. **Visual feedback**: Provide clear indication of user actions
4. **Performance**: Keep games smooth and responsive
5. **Simplicity**: Avoid overcomplicating game mechanics

## What to Avoid
- Complex navigation patterns
- Small touch targets
- Punishment for wrong answers
- Long loading times
- Overwhelming visual elements
- Adult-oriented design patterns

When suggesting code improvements or new features, always consider the educational value and age-appropriateness for young children.