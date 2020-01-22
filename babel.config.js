// module.exports = {
//   presets: ["@vue/cli-plugin-babel/preset"],

// };

module.exports = function(api) {
  api.cache(true);
  const presets = ["@vue/cli-plugin-babel/preset"];
  const plugins = [
    [
      "babel-plugin-dynamic-import-override",
      {
        errorHandler: `console.log('inside error handler, perform error handling here, error is available in err');`
      }
    ]
  ];

  return {
    presets,
    plugins
  };
};
