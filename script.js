<script>
            // initialise map
            var map = L.map('map', {
            zoomControl: false // disable the default zoom control
            }).setView([-32.928, 151.750], 12.8);

            // custom zoom controls
            L.control.zoom({
            position: 'bottomright' // move zoom control to bottom right
            }).addTo(map);

            // base map
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidG11cnJhbnQiLCJhIjoiY2xpamh3aGh3MDdkMzNwcGVsNWtkYTRocCJ9.qCJ8olgYw2nqd4HPCXQ7-Q', {
            attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
                        '<a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'tmurrant/clvlz3ce8019i01q190ig5dvt',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoidG11cnJhbnQiLCJhIjoiY2xpamh3aGh3MDdkMzNwcGVsNWtkYTRocCJ9.qCJ8olgYw2nqd4HPCXQ7-Q' // replace this with your Mapbox access token
            }).addTo(map);


            // add playgrounds geojson
            // fetch GeoJSON data
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
                        
                        //amend pop-up
                        layer.bindPopup(
                        `
                            <h3>${feature.properties.Park}</h3>
                            <div class="pill-button">Playground</div>
                        <br>
                            <img src="${cafeIcon}" style="width:24px;height:24px;">
                            <img src="${fenceIcon}" style="width:24px;height:24px;">
                            <img src="${toiletIcon}" style="width:24px;height:24px;">
                            <img src="${inclusiveIcon}" style="width:24px;height:24px;">
                        `
                        );
                    }
                    }).addTo(map);
                })
</script>
