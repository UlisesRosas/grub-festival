// this file will serve to tell wbpack how to output the project
// NOTE webpack only recognise thos exact file name

const path = require('path');
// to inport wwebpack properties and methods
const webpack = require("webpack");
// this import is to analize the bundles
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
// Manifest is to turn the website in to a downloadable app, PWA
const WebpackPwaManifest = require("webpack-pwa-manifest");

// exports basic configuration for wbpack
const config = {
    // where webpack looks to start buildinf the module
    // entry points 
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    output: {

        // this file will br in the dist directory
        filename: '[name].bundle.js',
        // tells webpack where the files are going to go
        path: `${__dirname} + '/dist`
    },

    module: {
        rules: [
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  esModule: false,
                  name(file) {
                    return '[path][name].[ext]';
                  },
                  publicPath: function(url) {
                    return url.replace('../', '/assets/');
                  }
                }
              },
              {
                loader: 'image-webpack-loader'
              }
            ]
          }
        ]
      },
    

    // plugins helps web pack know what to do with libraries that use global variables scuh as '$' with JQuery
    // if not done there will be errors where thses global vars are not recognized
    plugins: [
      // NOTE: the "new" key word here indicates constructors
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            //   static will show a report of the bundle in the browser
            // ir will come in the form of a HTMl file in the dist directory
            analyzerMode: "static", // the report outputs to an HTML file in the dist folder
        }),
        // webpack manifest PWA plugin
        new WebpackPwaManifest({
          name: "Food Event",
          short_name: "Foodies",
          description: "An app that allows you to view upcoming food events.",
          start_url: "../index.html",
          background_color: "#01579b",
          theme_color: "#ffffff",
          fingerprints: false,
          inject: false,
          icons: [{
            src: path.resolve("assets/img/icons/icon-512x512.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            // location of icon after the manifest is created
            destination: path.join("assets", "icons")
          }]
        })
    ],

    // this gets changed when we want our code to be minified to 'production'
    mode: 'development'
};
module.exports = config;