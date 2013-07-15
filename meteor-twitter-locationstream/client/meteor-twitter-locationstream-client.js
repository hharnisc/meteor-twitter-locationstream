locStream = new Meteor.Stream('loc');

if (Meteor.isClient) {
  Meteor.startup(function () {
    paper = Raphael('world', 1000, 400);

    // make sure that the world is positioned relative
    $('#world').css({'position': 'relative'})

    // draw the background
    paper.rect(0, 0, 1000, 400, 5).attr({
      stroke: "none",
      fill: "0-#9bb7cb-#adc8da"
    });

    // draw the world map
    for (var country in worldmap.shapes) {
      paper.path(worldmap.shapes[country]).attr({stroke: "#ccc6ae", fill: "#f0efeb", "stroke-opacity": 0.25});
    }

    // ddd user location on the map -- or if they decline just silently fail
    try {
      navigator.geolocation && navigator.geolocation.getCurrentPosition(function (pos) {
        var circle = paper.circle().attr({fill: "#DB7093", stroke: "#fff", r: 5})
                      .attr(getXY(pos.coords.latitude, pos.coords.longitude));
        addHover(circle, "This is your location!", paper);
      });
    } catch(e){}

    // language map
    var langColor = {
      'en': '#3CB371',
      'es': '#9370DB',
      'fr': '#AFEEEE',
      'ru': '#F0E68C'
    }

    // handler for new locations from the server
    locStream.on('update', function(update) {
      var color = update.lang in langColor ? langColor[update.lang] : '#CD5C5C';
      var coords = getXY(update.coords[0], update.coords[1])
      var circle = paper.circle().attr({fill: color, stroke: "#fff", r: 0})
                    .attr(coords);
      var msg = update.msg;
      var msgHover;

      circle.animate({r: 5}, 1000, "elastic");
      addHover(circle, msg, paper);

      setTimeout(function(){
        circle.remove();
      }, 20000);
    });
  });

  // add a hover to a dot on the map
  function addHover(element, msg, ctx) {
    element.hover(function(evt){
        $('body').append('<div class="msg" style="left:' + evt.x + 'px; top:' 
                  + (evt.y + 20) + 'px; ">' + msg + '</div>')
      }, function(){
        $('.msg').remove();
      }, ctx, ctx);
  }

  // convert lat and long into x and y coords
  function getXY(lat, lon)  {
    return {
      cx: lon * 2.6938 + 465.4,
      cy: lat * -2.6938 + 227.066
    };
  };

  // hook up follow button js
  Template.twitter.rendered = function () {
    ! function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = "//platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, "script", "twitter-wjs");
  };
}