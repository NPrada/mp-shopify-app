require("dotenv").config();
const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);



module.exports = {
   webpack (config, options) {

      const env = { API_KEY: apiKey };
      config.plugins.push(new webpack.DefinePlugin(env));

      config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/,
          use: {
              loader: 'url-loader',
              options: {
                  limit: 100000
              }
          }
      });

      config.module.rules.unshift({
        test: /\.css$/,
        loaders: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          }
        ],
      });

      config.module.rules.unshift({
        test: /\.(scss)$/,
        loaders: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
        ],
      });


      console.log(config.module.rules)

       return config;
   }
};


// module.exports = withPlugins(
//   [withBundleAnalyzer, withImages, withSass, withCSS],
//   {
//     webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {

//       console.log(config.module.rules)
//       const env = { API_KEY: apiKey };
//       config.plugins.push(new webpack.DefinePlugin(env));

//       config.module.rules.push({
//         test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
//         use: [
//           defaultLoaders.babel,
//           {
//             loader: "url-loader",
//             options: {
//               limit: 100000,
//               name: "[name].[ext]"
//             }
//           }
//         ]
//       });


      // config.module.rules.shift({
      //   test: /\.(scss)$/,
      //   loaders: [
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: process.env.NODE_ENV !== 'production',
      //       },
      //     },
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         sourceMap: process.env.NODE_ENV !== 'production',
      //       },
      //     },
      //   ],
      // });

//       return config;
// }})







// module.exports = withSass({
//   cssModules: false,
//   cssLoaderOptions: {
//     importLoaders: 2,
//   },
//   webpack: config => {
//     const env = { API_KEY: apiKey };
//     config.plugins.push(new webpack.DefinePlugin(env));

//     // config.module.rules.forEach(rule => {

//     //   if (rule.test.toString().includes('.scss')) {
//     //     rule.rules = rule.use.map(useRule => {
//     //       if (typeof useRule === 'string') {
//     //         return { loader: useRule };
//     //       }          

//     //       if (useRule.loader === 'css-loader') {
//     //         return {
//     //           oneOf: [
//     //             {
//     //               test: new RegExp('.global.scss$'),
//     //               loader: useRule.loader,
//     //               options: {},
//     //             },
//     //             {
//     //               loader: useRule.loader,
//     //               options: { modules: true }
//     //             },
//     //           ],
//     //         };
//     //       }
//     //       return useRule;
//     //     });
//     //     delete rule.use;
//     //   }
//     // });

//     config.module.rules.push({
//       test: /\.(scss)$/,
//       loaders: [
//         {
//           loader: 'css-loader',
//           options: {
//             sourceMap: process.env.NODE_ENV !== 'production',
//           },
//         },
//         {
//           loader: 'sass-loader',
//           options: {
//             sourceMap: process.env.NODE_ENV !== 'production',
//           },
//         },
//       ],
//     });
    



//     // config.module.rules.push(
//     //   {
//     //     test: /\.(ttf|eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//     //     use: [
//     //         {
//     //           loader: 'file-loader',
//     //           options: { publicPath: '/_next/static/images', outputPath: 'static/images' }
//     //         }
//     //       ]
//     //     }
//     //   );

//     // config.module.rules.push( {
//     //   test: /\.(ttf|eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//     //   loader: 'file-loader'
//     // })

//     return config;
//   },
// });