locStream = new Meteor.Stream('loc');

if (Meteor.isServer) {
  Meteor.startup(function () {
    // connect the twitter api
    var twit = new twitter({
      consumer_key: '<your keys here>',
      consumer_secret: '<your keys here>',
      access_token_key: '<your keys here>',
      access_token_secret: '<your keys here>'
    });

    // callback for tweets
    twit.stream('statuses/sample', function(stream) {
      stream.on('data', function(data) {
        if (data.geo){
          locStream.emit('update', {coords: data.geo.coordinates, lang: data.lang, msg:data.text});
        }
      });
    });
  });
}
