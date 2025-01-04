// src/index.js
import { RichTextEditor } from './RichTextEditor';

export default RichTextEditor;
export { RichTextEditor };

// package.json
{
  "name": "react-wysiwyg-editor",
  "version": "1.0.0",
  "description": "A lightweight WYSIWYG editor for React and Next.js applications",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "test": "jest",
    "prepare": "npm run build"
  },
  "keywords": [
    "react",
    "wysiwyg",
    "editor",
    "rich-text",
    "text-editor",
    "nextjs"
  ],
  "author": "Your Name",
  "license": "MIT",
  "peerDependencies": {
    "react": "^17.0.0 || ^18.0.0",
    "react-dom": "^17.0.0 || ^18.0.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@babel/core": "^7.23.7",
    "@babel/preset-env": "^7.23.8",
    "@babel/preset-react": "^7.23.3",
    "@rollup/plugin-babel": "^6.0.4",
    "@rollup/plugin-commonjs": "^25.0.7",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-typescript": "^11.1.6",
    "@types/react": "^18.2.48",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.33",
    "rollup": "^4.9.5",
    "rollup-plugin-dts": "^6.1.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-postcss": "^4.0.2",
    "rollup-plugin-terser": "^7.0.2",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3"
  },
  "dependencies": {
    "@types/node": "^20.11.5"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/react-wysiwyg-editor.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/react-wysiwyg-editor/issues"
  },
  "homepage": "https://github.com/yourusername/react-wysiwyg-editor#readme",
  "publishConfig": {
    "access": "public"
  }
}

// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', '@babel/preset-react'],
      }),
      postcss({
        config: {
          path: './postcss.config.js',
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      }),
      terser(),
    ],
    external: ['react', 'react-dom', 'lucide-react'],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
