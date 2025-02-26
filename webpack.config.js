const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/main.ts', // Ruta al archivo principal de entrada de tu aplicación TypeScript
  output: {

    filename: '../web/project-js/project.js', // Nombre del archivo de salida
  },
  resolve: {
    extensions: ['.ts', '.js', ".tsx"], // Extensiones de archivo que Webpack debe manejar
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Utilizar TypeScript para archivos con extensión .ts
        use: 'ts-loader', // Utilizar el cargador TypeScript
        exclude: /node_modules/,
      },
    ],
  },
};