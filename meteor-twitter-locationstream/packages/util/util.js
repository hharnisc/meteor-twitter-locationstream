// file: twitter.js
util = Npm.require("util");
utilFacade = {
  get: function(options) {
    return new util(options);
  }
};