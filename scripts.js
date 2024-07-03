// Initialise map
var map = L.map('map', {
    zoomControl: false // disable the default zoom control
}).setView([-32.928, 151.750], 12.8);

// Base map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidG11cnJhbnQiLCJhIjoiY2xpamh3aGh3MDdkMzNwcGVsNWtkYTRocCJ9.qCJ8olgYw2nqd4HPCXQ7-Q', {
    attribution: '<a href="https://www.openstreetmap.org/copyright" target=”_blank">OpenStreetMap</a>, ' +
                '<a href="https://www.mapbox.com/" target=”_blank">Mapbox</a>',
    minZoom: 10,
    maxZoom: 18,
    id: 'tmurrant/clvlz3ce8019i01q190ig5dvt',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidG11cnJhbnQiLCJhIjoiY2xpamh3aGh3MDdkMzNwcGVsNWtkYTRocCJ9.qCJ8olgYw2nqd4HPCXQ7-Q'
}).addTo(map);

// Create icon cluster colour function
function createClusterIcon(color) {
    return function(cluster) {
        return L.divIcon({
                html: `<div style="background-color:${color}; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-family: 'Roboto', sans-serif;" class="marker-cluster">${cluster.getChildCount()}</div>`,
                className: 'marker-cluster-custom',
                iconSize: L.point(30, 30)
            });
        }
}

var playgroundCluster = L.markerClusterGroup({
    iconCreateFunction: createClusterIcon('#FF8593'),
    showCoverageOnHover: false,
    disableClusteringAtZoom: 16,
    maxClusterRadius: 100
});
var playgroupCluster = L.markerClusterGroup({
    iconCreateFunction: createClusterIcon('#FFA3A3'),
    showCoverageOnHover: false,
    disableClusteringAtZoom: 16,
    maxClusterRadius: 100
});
var classesCluster = L.markerClusterGroup({
    iconCreateFunction: createClusterIcon('#B19CD9'),
    showCoverageOnHover: false,
    disableClusteringAtZoom: 16,
    maxClusterRadius: 100
});
var communityGardenCluster = L.markerClusterGroup({
    iconCreateFunction: createClusterIcon('#64BE53'),
    showCoverageOnHover: false,
    disableClusteringAtZoom: 16,
    maxClusterRadius: 100
});
var poolCluster = L.markerClusterGroup({
    iconCreateFunction: createClusterIcon('#00B7FF'),
    showCoverageOnHover: false,
    disableClusteringAtZoom: 16,
    maxClusterRadius: 100
});
var libraryCluster = L.markerClusterGroup({
    iconCreateFunction: createClusterIcon('#9370DB'),
    showCoverageOnHover: false,
    disableClusteringAtZoom: 16,
    maxClusterRadius: 100
});
var cafeCluster = L.markerClusterGroup({
    iconCreateFunction: createClusterIcon('#FFD700'),
    showCoverageOnHover: false,
    disableClusteringAtZoom: 16,
    maxClusterRadius: 100
});
var restaurantCluster = L.markerClusterGroup({
    iconCreateFunction: createClusterIcon('#FFA500'),
    showCoverageOnHover: false,
    disableClusteringAtZoom: 16,
    maxClusterRadius: 100
});

var gymCluster = L.markerClusterGroup({
    iconCreateFunction: createClusterIcon('#4682b4'),
    showCoverageOnHover: false,
    disableClusteringAtZoom: 16,
    maxClusterRadius: 100
});

var attractionCluster = L.markerClusterGroup({
    iconCreateFunction: createClusterIcon('#FF6347'),
    showCoverageOnHover: false,
    disableClusteringAtZoom: 16,
    maxClusterRadius: 100
});

// Layer toggle function
document.getElementById('layers-link').addEventListener('click', function() {
    document.getElementById('layers-popup').style.display = 'flex';
});

var playgroupLayerVisible = true;
var classesLayerVisible = true;
var communityGardenLayerVisible = true;
var poolLayerVisible = true;
var libraryLayerVisible = true;
var cafeLayerVisible = true;
var restaurantLayerVisible = true;
var gymLayerVisible = true;
var attractionLayerVisible = true;

function applyLayerToggle() {
    var playgroundLayer = document.getElementById('playground-layer').checked;
    var playgroupLayer = document.getElementById('playgroup-layer').checked;
    var classesLayer = document.getElementById('classes-layer').checked;
    var communityGardenLayer = document.getElementById('community-garden-layer').checked;
    var poolLayer = document.getElementById('pool-layer').checked;
    var libraryLayer = document.getElementById('library-layer').checked;
    var cafeLayer = document.getElementById('cafe-layer').checked;
    var restaurantLayer = document.getElementById('restaurant-layer').checked;
    var gymLayer = document.getElementById('gym-layer').checked;
    var attractionLayer = document.getElementById('attraction-layer').checked;

    if (playgroundLayer) {
        map.addLayer(playgroundCluster);
    } else {
        map.removeLayer(playgroundCluster);
    }

    if (playgroupLayer) {
        map.addLayer(playgroupCluster);
    } else {
        map.removeLayer(playgroupCluster);
    }

    if (classesLayer) {
        map.addLayer(classesCluster);
    } else {
        map.removeLayer(classesCluster);
    }

    if (communityGardenLayer) {
        map.addLayer(communityGardenCluster);
    } else {
        map.removeLayer(communityGardenCluster);
    }

    if (poolLayer) {
        map.addLayer(poolCluster);
    } else {
        map.removeLayer(poolCluster);
    }

    if (libraryLayer) {
        map.addLayer(libraryCluster);
    } else {
        map.removeLayer(libraryCluster);
    }

    if (cafeLayer) {
        map.addLayer(cafeCluster);
    } else {
        map.removeLayer(cafeCluster);
    }

    if (restaurantLayer) {
        map.addLayer(restaurantCluster);
    } else {
        map.removeLayer(restaurantCluster);
    }

    if (gymLayer) {
        map.addLayer(gymCluster);
    } else {
        map.removeLayer(gymCluster);
    }

    if (attractionLayer) {
        map.addLayer(attractionCluster);
    } else {
        map.removeLayer(attractionCluster);
    }

    closePopup('layers-popup');
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Add playgrounds geojson
var allPlaygroundData;

function loadAllData() {
    fetch('https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/layers/playgrounds.geojson')
        .then(response => response.json())
        .then(data => {
            allPlaygroundData = data;

            var geoJsonLayer = L.geoJSON(allPlaygroundData, {
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: L.icon({
                            iconUrl: 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/icons/playground.svg',
                            iconSize: [26, 26],
                            iconAnchor: [16, 16],
                            popupAnchor: [0, -16]
                        })
                    });
                },
                onEachFeature: function (feature, layer) {
                    let cafeIcon = feature.properties.Cafes === 'Yes' 
                        ? 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/31b9945b09883cb8eb6e4719f803f0d1145d13d2/icons/cafe_true.svg'
                        : 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/68d9d3d2835765086bdc78859024032690682e0a/icons/cafe_null.svg';

                    let fenceIcon = feature.properties.Fenced === 'Yes' 
                        ? 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/31b9945b09883cb8eb6e4719f803f0d1145d13d2/icons/fence_true.svg'
                        : 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/68d9d3d2835765086bdc78859024032690682e0a/icons/fence_null.svg';

                    let toiletIcon = feature.properties.Toilets === 'Yes' 
                        ? 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/31b9945b09883cb8eb6e4719f803f0d1145d13d2/icons/toilet_true.svg'
                        : 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/31b9945b09883cb8eb6e4719f803f0d1145d13d2/icons/toilet_null.svg';

                    let inclusiveIcon = feature.properties.Inclusive === 'Yes' 
                        ? 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/ee43a773f9a7a825cb5c7735648e92c4be77ede3/icons/inclusive_true.svg'
                        : 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/ee43a773f9a7a825cb5c7735648e92c4be77ede3/icons/inclusive_null.svg';

                    layer.bindPopup(
                    `
                        <h3>
                            <a href="https://www.google.com/maps/search/?api=1&query=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}" target="_blank" class="google-maps-link">
                                <img src="https://github.com/torimurrant/familyfriendmapproject/blob/main/icons/icon.png?raw=true" style="width:24px;height:24px;">
                                ${feature.properties.Park}
                            </a>
                        </h3>
                        <div class="pill-button-1">Playground</div><br>
                        <img src="${cafeIcon}" style="width:24px;height:24px;">
                        <img src="${fenceIcon}" style="width:24px;height:24px;">
                        <img src="${toiletIcon}" style="width:24px;height:24px;">
                        <img src="${inclusiveIcon}" style="width:24px;height:24px;">
                    `);
                }
            });

            playgroundCluster.addLayer(geoJsonLayer);
            map.addLayer(playgroundCluster);
        })
}

loadAllData();
document.getElementById('filter-link').addEventListener('click', function() {
    document.getElementById('filter-popup').style.display = 'flex';
});

function applyFilters() {
    var form = document.getElementById('filter-form');
    var filters = {
        cafe: form.elements['cafe'].checked ? form.elements['cafe'].value : null,
        fence: form.elements['fence'].checked ? form.elements['fence'].value : null,
        toilet: form.elements['toilet'].checked ? form.elements['toilet'].value : null,
        inclusive: form.elements['inclusive'].checked ? form.elements['inclusive'].value : null,
        age: []
    };

    // Gather all selected age values
    var ageElements = form.elements['age'];
    for (var i = 0; i < ageElements.length; i++) {
        if (ageElements[i].checked) {
            filters.age.push(ageElements[i].value);
        }
    }

    playgroundCluster.clearLayers();

    var filteredData = allPlaygroundData.features.filter(function(feature) {
        return (!filters.cafe || feature.properties.Cafes === filters.cafe) &&
            (!filters.fence || feature.properties.Fenced === filters.fence) &&
            (!filters.toilet || feature.properties.Toilets === filters.toilet) &&
            (!filters.inclusive || feature.properties.Inclusive === filters.inclusive) &&
            (filters.age.length === 0 || filters.age.includes(feature.properties.Age));
    });

    var geoJsonLayer = L.geoJSON(filteredData, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/icons/playground.svg',
                    iconSize: [26, 26],
                    iconAnchor: [16, 16],
                    popupAnchor: [0, -16]
                })
            });
        },
        onEachFeature: function (feature, layer) {
            let cafeIcon = feature.properties.Cafes === 'Yes' 
                ? 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/31b9945b09883cb8eb6e4719f803f0d1145d13d2/icons/cafe_true.svg'
                : 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/68d9d3d2835765086bdc78859024032690682e0a/icons/cafe_null.svg';

            let fenceIcon = feature.properties.Fenced === 'Yes' 
                ? 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/31b9945b09883cb8eb6e4719f803f0d1145d13d2/icons/fence_true.svg'
                : 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/68d9d3d2835765086bdc78859024032690682e0a/icons/fence_null.svg';

            let toiletIcon = feature.properties.Toilets === 'Yes' 
                ? 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/31b9945b09883cb8eb6e4719f803f0d1145d13d2/icons/toilet_true.svg'
                : 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/31b9945b09883cb8eb6e4719f803f0d1145d13d2/icons/toilet_null.svg';

            let inclusiveIcon = feature.properties.Inclusive === 'Yes' 
                ? 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/ee43a773f9a7a825cb5c7735648e92c4be77ede3/icons/inclusive_true.svg'
                : 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/ee43a773f9a7a825cb5c7735648e92c4be77ede3/icons/inclusive_null.svg';

            layer.bindPopup(
            `
                <h3>
                    <a href="https://www.google.com/maps/search/?api=1&query=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}" target="_blank" class="google-maps-link">
                        <img src="https://github.com/torimurrant/familyfriendmapproject/blob/main/icons/icon.png?raw=true" style="width:24px;height:24px;">
                        ${feature.properties.Park}
                    </a>
                </h3>
                <div class="pill-button-1">Playground</div><br>
                <img src="${cafeIcon}" style="width:24px;height:24px;">
                <img src="${fenceIcon}" style="width:24px;height:24px;">
                <img src="${toiletIcon}" style="width:24px;height:24px;">
                <img src="${inclusiveIcon}" style="width:24px;height:24px;">
            `);
        }
    });

    playgroundCluster.addLayer(geoJsonLayer);
    map.addLayer(playgroundCluster);
    closePopup('filter-popup');
}

// Add playgroups geojson
fetch('https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/layers/playgroup.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/a5501473253880135fcc20a96d8702264c9ed1f3/icons/playgroup.svg',
                        iconSize: [26, 26],
                        iconAnchor: [16, 16],
                        popupAnchor: [0, -16]
                    })
                }).bindPopup(
                    `<h3>
                        <a href="https://www.google.com/maps/search/?api=1&query=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}" target="_blank" class="google-maps-link">
                        <img src="https://github.com/torimurrant/familyfriendmapproject/blob/main/icons/icon.png?raw=true" style="width:24px;height:24px;">
                        ${feature.properties.Name}
                        </a>
                    </h3>
                    <div class="pill-button-2">Playgroup</div>
                    <br>
                    The cost is ${feature.properties.Cost}. Click <a href="${feature.properties.URL}" target=”_blank">here</a> 
                    for more information.`
                );
            }
        }).addTo(playgroupCluster);
    })
    map.addLayer(playgroupCluster);

// Add classes geojson
fetch('https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/layers/classes.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/a5501473253880135fcc20a96d8702264c9ed1f3/icons/classes.svg',
                        iconSize: [26, 26],
                        iconAnchor: [16, 16],
                        popupAnchor: [0, -16]
                    })
                }).bindPopup(
                    `<h3>
                        <a href="https://www.google.com/maps/search/?api=1&query=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}" target="_blank" class="google-maps-link">
                        <img src="https://github.com/torimurrant/familyfriendmapproject/blob/main/icons/icon.png?raw=true" style="width:24px;height:24px;">
                        ${feature.properties.Name}
                        </a>
                    </h3>
                    <div class="pill-button-3">Class</div>
                    <br>
                    The cost is ${feature.properties.Cost}. Click <a href="${feature.properties.URL}" target=”_blank">here</a> 
                    for more information.`
                );
            }
        }).addTo(classesCluster);
    })
    map.addLayer(classesCluster);

// Add community gardens geojson
fetch('https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/layers/community_garden.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/a5501473253880135fcc20a96d8702264c9ed1f3/icons/community_garden.svg',
                        iconSize: [26, 26],
                        iconAnchor: [16, 16],
                        popupAnchor: [0, -16]
                    })
                }).bindPopup(
                    `<h3>
                        <a href="https://www.google.com/maps/search/?api=1&query=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}" target="_blank" class="google-maps-link">
                        <img src="https://github.com/torimurrant/familyfriendmapproject/blob/main/icons/icon.png?raw=true" style="width:24px;height:24px;">
                        ${feature.properties.Name}
                        </a>
                    </h3>
                    <div class="pill-button-4">Community Garden</div>
                    <br>
                    Click <a href="${feature.properties.URL}" target=”_blank">here</a> for more information.`
                );
            }
        }).addTo(communityGardenCluster);
    })
    map.addLayer(communityGardenCluster);

// Add pools geojson
fetch('https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/layers/pool.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/a5501473253880135fcc20a96d8702264c9ed1f3/icons/pool.svg',
                        iconSize: [26, 26],
                        iconAnchor: [16, 16],
                        popupAnchor: [0, -16]
                    })
                }).bindPopup(
                    `<h3>
                        <a href="https://www.google.com/maps/search/?api=1&query=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}" target="_blank" class="google-maps-link">
                        <img src="https://github.com/torimurrant/familyfriendmapproject/blob/main/icons/icon.png?raw=true" style="width:24px;height:24px;">
                        ${feature.properties.Name}
                        </a>
                    </h3>
                    <div class="pill-button-5">Pool</div>
                    <br>
                    The cost is ${feature.properties.Price}. Click <a href="${feature.properties.Website}" target=”_blank">here</a> for more information.`
                );
            }
        }).addTo(poolCluster);
    })
    map.addLayer(poolCluster);

// Add libraries geojson
fetch('https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/layers/library.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/a5501473253880135fcc20a96d8702264c9ed1f3/icons/library.svg',
                        iconSize: [26, 26],
                        iconAnchor: [16, 16],
                        popupAnchor: [0, -16]
                    })
                }).bindPopup(
                    `<h3>
                        <a href="https://www.google.com/maps/search/?api=1&query=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}" target="_blank" class="google-maps-link">
                        <img src="https://github.com/torimurrant/familyfriendmapproject/blob/main/icons/icon.png?raw=true" style="width:24px;height:24px;">
                        ${feature.properties.Name}
                        </a>
                    </h3>
                    <div class="pill-button-6">Library</div>
                    <br>
                    Click <a href="${feature.properties.URL}" target=”_blank">here</a> for more information.`
                );
            }
        }).addTo(libraryCluster);
    })
    map.addLayer(libraryCluster);

// Add cafes geojson
fetch('https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/layers/cafe.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/a5501473253880135fcc20a96d8702264c9ed1f3/icons/cafe.svg',
                        iconSize: [26, 26],
                        iconAnchor: [16, 16],
                        popupAnchor: [0, -16]
                    })
                }).bindPopup(
                    `<h3>
                        <a href="https://www.google.com/maps/search/?api=1&query=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}" target="_blank" class="google-maps-link">
                        <img src="https://github.com/torimurrant/familyfriendmapproject/blob/main/icons/icon.png?raw=true" style="width:24px;height:24px;">
                        ${feature.properties.Name}
                        </a>
                    </h3>
                    <div class="pill-button-7">Cafe</div>
                    <br>
                    Click <a href="${feature.properties.URL}" target=”_blank">here</a> for more information.`
                );
            }
        }).addTo(cafeCluster);
    })
    map.addLayer(cafeCluster);

// Add restaurants geojson
fetch('https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/layers/restaurant.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/a5501473253880135fcc20a96d8702264c9ed1f3/icons/restaurant.svg',
                        iconSize: [26, 26],
                        iconAnchor: [16, 16],
                        popupAnchor: [0, -16]
                    })
                }).bindPopup(
                    `<h3>
                        <a href="https://www.google.com/maps/search/?api=1&query=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}" target="_blank" class="google-maps-link">
                        <img src="https://github.com/torimurrant/familyfriendmapproject/blob/main/icons/icon.png?raw=true" style="width:24px;height:24px;">
                        ${feature.properties.Name}
                        </a>
                    </h3>
                    <div class="pill-button-7">Restaurant</div>
                    <br>
                    Click <a href="${feature.properties.URL}" target=”_blank">here</a> for more information.`
                );
            }
        }).addTo(restaurantCluster);
    })
    map.addLayer(restaurantCluster);

// Add gyms geojson
fetch('https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/layers/gyms.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/4431624ecf06f1c59aa7ddd163dcc12b9ab850d5/icons/gym.svg',
                        iconSize: [26, 26],
                        iconAnchor: [16, 16],
                        popupAnchor: [0, -16]
                    })
                }).bindPopup(
                    `<h3>
                        <a href="https://www.google.com/maps/search/?api=1&query=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}" target="_blank" class="google-maps-link">
                        <img src="https://github.com/torimurrant/familyfriendmapproject/blob/main/icons/icon.png?raw=true" style="width:24px;height:24px;">
                        ${feature.properties.Name}
                        </a>
                    </h3>
                    <div class="pill-button-9">Gym</div>
                    <br>
                    Click <a href="${feature.properties.URL}" target="_blank">here</a> for more information.`
                );
            }
        }).addTo(gymCluster);
    })
    map.addLayer(gymCluster);

// Add attractions geojson
fetch('https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/main/layers/attractions.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                function getIconUrl(type) {
                    switch (type) {
                        case 'Attraction':
                            return 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/03f9f01719d0c755cc07787ab88f794a5e60f2d5/icons/attractions_camera.svg';
                        case 'Zoo':
                            return 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/03f9f01719d0c755cc07787ab88f794a5e60f2d5/icons/attractions_zoo.svg';
                        case 'Museum':
                            return 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/03f9f01719d0c755cc07787ab88f794a5e60f2d5/icons/attractions_museum.svg';
                        case 'Art Gallery':
                            return 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/03f9f01719d0c755cc07787ab88f794a5e60f2d5/icons/attractions_art-gallery.svg';
                        case 'Playground':
                            return 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/a8e6936d54ad91c68d7fb00548bb8563920d9696/icons/attractions_playground.svg';
                        default:
                            return 'https://raw.githubusercontent.com/torimurrant/familyfriendmapproject/03f9f01719d0c755cc07787ab88f794a5e60f2d5/icons/attractions_camera.svg';
                    }
                }

                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: getIconUrl(feature.properties.Type),
                        iconSize: [26, 26],
                        iconAnchor: [16, 16],
                        popupAnchor: [0, -16]
                    })
                }).bindPopup(
                    `<h3>
                        <a href="https://www.google.com/maps/search/?api=1&query=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}" target="_blank" class="google-maps-link">
                        <img src="https://github.com/torimurrant/familyfriendmapproject/blob/main/icons/icon.png?raw=true" style="width:24px;height:24px;">
                        ${feature.properties.Name}
                        </a>
                    </h3>
                    <div class="pill-button-10">${feature.properties.Type}</div>
                    <br>
                    Click <a href="${feature.properties.URL}" target="_blank">here</a> for more information.`
                );
            }
        }).addTo(attractionCluster);
    });
map.addLayer(attractionCluster);

// Page pop-ups
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    var popup = document.getElementById("welcome-popup");
    popup.style.display = "flex";
});

document.getElementById('about-link').addEventListener('click', function() {
    document.getElementById('about-popup').style.display = 'flex';
});

document.getElementById('howto-link').addEventListener('click', function() {
    document.getElementById('howto-popup').style.display = 'flex';
});

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Open location in google maps
function openInGoogleMaps(lat, lng) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
}
