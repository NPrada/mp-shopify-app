require("dotenv").config();
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const webpack = require('webpack');


const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);

// module.exports = withCSS({
//   webpack: (config) => {
//     const env = { API_KEY: apiKey };
//     config.plugins.push(new webpack.DefinePlugin(env));
//     return config;
//   },
// });




module.exports = withSass({
  cssModules: false,
  cssLoaderOptions: {
    importLoaders: 2,
  },
  webpack: config => {
    const env = { API_KEY: apiKey };
    config.plugins.push(new webpack.DefinePlugin(env));
    config.module.rules.forEach(rule => {
      if (rule.test.toString().includes('.scss')) {
        rule.rules = rule.use.map(useRule => {
          if (typeof useRule === 'string') {
            return { loader: useRule };
          }          if (useRule.loader === 'css-loader') {
            return {
              oneOf: [
                {
                  test: new RegExp('.global.scss$'),
                  loader: useRule.loader,
                  options: {},
                },
                {
                  loader: useRule.loader,
                  options: { modules: true }
                },
              ],
            };
          }
          return useRule;
        });
        delete rule.use;
      }
    });
    return config;
  },
});