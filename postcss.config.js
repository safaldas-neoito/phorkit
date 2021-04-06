var glob = require('glob');

/**
 * Due to https://github.com/egoist/rollup-plugin-postcss/compare/v2.4.0...v2.4.1
 * it's not possible to upgrade past 2.4.0 as long as postcss-import is used.
 */
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-mixins')({
      mixins: require('./src/postcss/mixins'),
    }),
    require('postcss-simple-vars')({
      variables: () => require('./src/postcss/vars'),
    }),
    require('postcss-nested'),
    require('postcss-extend-rule'),
    require('autoprefixer'),
    require('cssnano')({
      preset: [
        'default',
        {
          mergeLonghand: false,
          discardEmpty: true,
          normalizeWhitespace: true,
        },
      ],
    }),
  ],
};
