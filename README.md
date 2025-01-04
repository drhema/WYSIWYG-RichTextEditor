# React WYSIWYG Editor

A lightweight, customizable WYSIWYG rich text editor for React and Next.js applications.

## Features

- 📝 True WYSIWYG editing experience
- 🎨 Rich text formatting (bold, italic, headings)
- 🔗 Link insertion
- 🖼️ Image embedding
- 💬 Quote blocks
- 📱 Responsive design
- 🎯 Modern UI with Lucide icons
- 🎨 Tailwind CSS styling
- ⚡ Zero dependencies except for React
- 🔧 Highly customizable

## Installation

```bash
npm install react-wysiwyg-editor
# or
yarn add react-wysiwyg-editor
# or
pnpm add react-wysiwyg-editor
```

## Basic Usage

```jsx
import { RichTextEditor } from 'react-wysiwyg-editor';

function MyComponent() {
  return (
    <div>
      <h1>My Editor</h1>
      <RichTextEditor />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | string | '' | Initial content of the editor |
| `onChange` | function | undefined | Callback function that receives the editor's content |
| `className` | string | undefined | Additional CSS classes for the editor container |
| `placeholder` | string | 'Start typing...' | Placeholder text when editor is empty |

## Event Handling

```jsx
function MyComponent() {
  const handleChange = (content) => {
    console.log('Editor content:', content);
  };

  return (
    <RichTextEditor onChange={handleChange} />
  );
}
```

## Customization

### Styling

The editor uses Tailwind CSS for styling. You can override the default styles by passing className prop:

```jsx
<RichTextEditor
  className="max-w-2xl mx-auto"
/>
```

### Custom Toolbar

You can customize the toolbar by passing the `toolbar` prop:

```jsx
const customToolbar = {
  bold: true,
  italic: true,
  headings: [1, 2], // Only H1 and H2
  link: true,
  image: false, // Disable image insertion
  quote: true
};

<RichTextEditor toolbar={customToolbar} />
```

## Creating NPM Package

To convert this component into an NPM package, follow these steps:

1. Create package structure:

```bash
mkdir react-wysiwyg-editor
cd react-wysiwyg-editor
npm init
```

2. Set up development environment:

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-react
npm install --save-dev rollup rollup-plugin-babel rollup-plugin-terser
npm install --save-dev @rollup/plugin-node-resolve @rollup/plugin-commonjs
```

3. Create `rollup.config.js`:

```javascript
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    terser(),
  ],
};
```

4. Update `package.json`:

```json
{
  "name": "react-wysiwyg-editor",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "rollup -c",
    "prepare": "npm run build"
  },
  "peerDependencies": {
    "react": "^17.0.0 || ^18.0.0",
    "react-dom": "^17.0.0 || ^18.0.0"
  }
}
```

5. Create source files:

```bash
mkdir src
# Move your RichTextEditor component to src/RichTextEditor.jsx
# Create src/index.js
```

6. Create `src/index.js`:

```javascript
export { default as RichTextEditor } from './RichTextEditor';
```

7. Build and publish:

```bash
# Build the package
npm run build

# Login to npm (if not already)
npm login

# Publish the package
npm publish
```

## Dependencies

- React >= 17.0.0
- Lucide React (for icons)
- Tailwind CSS (for styling)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Icons provided by [Lucide](https://lucide.dev/)
- Styling powered by [Tailwind CSS](https://tailwindcss.com/)
