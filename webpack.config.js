// this file will serve to tell wbpack how to output the project
// NOTE webpack only recognise thos exact file name

const path = require('path');
// to inport wwebpack properties and methods
const webpack = require("webpack");

// exports basic configuration for wbpack
module.exports = {
    // where webpack looks to start buildinf the module
    entry: './assets/js/script.js',
    output: {
    // tells webpack where the files are going to go
    path: path.resolve(__dirname, 'dist'),
    // this file will br in the dist directory
    filename: 'main.bundle.js'
    },
    // plugins helps web pack know what to do with libraries that use global variables scuh as '$' with JQuery
    // if not done there will be errors where thses global vars are not recognized
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
          }),
    ],
    // this gets changed when we want our code to be minified to 'production'
    mode: 'development'
};