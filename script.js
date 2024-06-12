// initialise map
var map = L.map('map', {
  zoomControl: false // Disable the default zoom control to re-position it later
}).setView([-32.928, 151.750], 12.8);

// custom zoom controls
L.control.zoom({
  position: 'bottomright' // Move zoom control to bottom right
}).addTo(map);

// base map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidG11cnJhbnQiLCJhIjoiY2xpamh3aGh3MDdkMzNwcGVsNWtkYTRocCJ9.qCJ8olgYw2nqd4HPCXQ7-Q', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
               '© <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'tmurrant/clvlz3ce8019i01q190ig5dvt',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoidG11cnJhbnQiLCJhIjoiY2xpamh3aGh3MDdkMzNwcGVsNWtkYTRocCJ9.qCJ8olgYw2nqd4HPCXQ7-Q' // Replace this with your actual Mapbox access token
}).addTo(map);


// add playgrounds geojson
// Fetch GeoJSON data
fetch('https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/layers/playgrounds.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/icons/playground.svg',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
              })
            });
          },
          onEachFeature: (feature, layer) => {
            layer.bindPopup(`<h3>${feature.properties.Park}</h3><p>INSERT ICONS HERE :)</p>`);
          }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Error fetching Playground layer:', error);
    });
