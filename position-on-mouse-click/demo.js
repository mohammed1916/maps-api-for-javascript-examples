
// /**
//  * An event listener is added to listen to tap events on the map.
//  * Clicking on the map displays an alert box containing the latitude and longitude
//  * of the location pressed.
//  * @param  {H.Map} map      A HERE Map instance within the application
//  */
// function setUpClickListener(map)
// {
//   // Attach an event listener to map display
//   // obtain the coordinates and display in an alert box.
//   map.addEventListener('tap', function (evt)
//   {
//     var coord = map.screenToGeo(evt.currentPointer.viewportX,
//       evt.currentPointer.viewportY);
//     logEvent('Clicked at ' + Math.abs(coord.lat.toFixed(4)) +
//       ((coord.lat > 0) ? 'N' : 'S') +
//       ' ' + Math.abs(coord.lng.toFixed(4)) +
//       ((coord.lng > 0) ? 'E' : 'W'));
//   });
// }



// /**
//  * Boilerplate map initialization code starts below:
//  */

// //Step 1: initialize communication with the platform
// // In your own code, replace variable window.apikey with your own apikey
// var platform = new H.service.Platform({
//   apikey: "pWeYDWkQb_citdxQIiHestMcjrTwF3M8_QtMkPz657Q"
// });
// var defaultLayers = platform.createDefaultLayers();

// //Step 2: initialize a map
// var map = new H.Map(document.getElementById('map'),
//   defaultLayers.vector.normal.map, {
//   center: { lat: 30.94625288456589, lng: -54.10861860580418 },
//   zoom: 1,
//   pixelRatio: window.devicePixelRatio || 1
// });
// // add a resize listener to make sure that the map occupies the whole container
// window.addEventListener('resize', () => map.getViewPort().resize());

// //Step 3: make the map interactive
// // MapEvents enables the event system
// // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
// var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// // Step 4: create custom logging facilities
// var logContainer = document.createElement('ul');
// logContainer.className = 'log';
// logContainer.innerHTML = '<li class="log-entry">Try clicking on the map</li>';
// map.getElement().appendChild(logContainer);

// // Helper for logging events
// function logEvent(str)
// {
//   var entry = document.createElement('li');
//   entry.className = 'log-entry';
//   entry.textContent = str;
//   logContainer.insertBefore(entry, logContainer.firstChild);
// }


// setUpClickListener(map);
















/**
 * An event listener is added to listen to tap events on the map.
 * Clicking on the map displays an alert box containing the latitude and longitude
 * of the location pressed.
 * @param  {H.Map} map      A HERE Map instance within the application
 */
var clickedPoints = [];

// Create logContainer and append it to the document body
var logContainer = document.createElement('ul');
logContainer.className = 'log';
document.body.appendChild(logContainer);

/**
 * An event listener is added to listen to tap events on the map.
 * Clicking on the map displays an alert box containing the latitude and longitude
 * of the location pressed.
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function setUpClickListenerWithMultiplePoints(map, polygon)
{
  map.addEventListener('tap', function (evt)
  {
    var coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);

    // Store the clicked point in the array
    clickedPoints.push(coord);

    // Log the clicked points
    logEvent('Clicked at ' + Math.abs(coord.lat.toFixed(4)) +
      ((coord.lat > 0) ? 'N' : 'S') +
      ' ' + Math.abs(coord.lng.toFixed(4)) +
      ((coord.lng > 0) ? 'E' : 'W'));

    // Log all clicked points
    console.log('All Clicked Points:', clickedPoints);

    // Update the polygon with the new points
    updatePolygon(polygon, clickedPoints);
  });
}

/**
 * Updates the polygon with the provided set of points.
 * @param {H.map.Polygon} polygon - The polygon to update
 * @param {Array} points - An array of {lat, lng} points
 */
function updatePolygon(polygon, points)
{
  var geoLineString = new H.geo.LineString();
  points.forEach(function (point)
  {
    geoLineString.pushPoint(point);
  });

  // Update the polygon geometry
  polygon.setGeometry(new H.geo.Polygon(geoLineString));
}

/**
 * Adds resizable geo polygon to map
 *
 * @param {H.Map} map - A HERE Map instance within the application
 */
function createResizablePolygon(map)
{
  // Existing resizable polygon code...

  // Create a polygon with default points
  var defaultPoints = [
    { lat: 50, lng: 24 },
    { lat: 50.5, lng: 25 },
    { lat: 49.5, lng: 25 }
  ];

  var geoLineString = new H.geo.LineString();
  defaultPoints.forEach(function (point)
  {
    geoLineString.pushPoint(point);
  });

  var polygon = new H.map.Polygon(new H.geo.Polygon(geoLineString), {
    style: { fillColor: 'rgba(150, 100, 0, .8)', lineWidth: 0 }
  });

  // Add the polygon to the map
  map.addObject(polygon);

  // Handle multiple points on click
  setUpClickListenerWithMultiplePoints(map, polygon);
}

/**
 * Helper for logging events
 * @param {string} str - The string to log
 */
function logEvent(str)
{
  var entry = document.createElement('li');
  entry.className = 'log-entry';
  entry.textContent = str;
  logContainer.insertBefore(entry, logContainer.firstChild);
}


/**
 * Boilerplate map initialization code starts below:
 */

// Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: "pWeYDWkQb_citdxQIiHestMcjrTwF3M8_QtMkPz657Q"
});
var defaultLayers = platform.createDefaultLayers();

// Step 2: initialize a map - this map is centered over Boston
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: { lat: 50, lng: 24 },
  zoom: 6,
  pixelRatio: window.devicePixelRatio || 1
});

// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Step 4: Create the default UI:
var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');

// Step 5: Add resizable geo polygon with multiple points
createResizablePolygon(map);