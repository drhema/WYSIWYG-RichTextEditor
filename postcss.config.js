// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-import'),
    process.env.NODE_ENV === 'production' && require('cssnano')({
      preset: 'default',
    }),
  ].filter(Boolean),
};
