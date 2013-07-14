// file: twitter.js
twitter = Npm.require("twitter");
twitterFacade = {
  get: function(options) {
    return new twitter(options);
  }
};