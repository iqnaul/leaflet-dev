var map = L.map(document.getElementById('peta'), {
    center: [-7.80043, 110.38316],
    zoom: 13
});

// Basemaps
var osm_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
});
osm_HOT.addTo(map);

var baserelief = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {});

// Jalan
var jalan = L.geoPackageFeatureLayer([], {
      geoPackageUrl: './assets/data/jalan_kotayk.gpkg',
      layerName: 'jalan_kotayk',
      style: function (feature) {
        return {
          color: "#F00",
          weight: 2,
          opacity: 1
        };
      },
      onEachFeature: function (feature, layer) {
        var string = "";
        for (var key in feature.properties) {
          string += '<div class="item"><span class="label">' + key + ': </span><span class="value">' + feature.properties[key] + '</span></div>';
        }
        layer.bindPopup(string);
      }
  }).addTo(map);

// Rumah Sakit
var rumahsakit = L.geoPackageFeatureLayer([], {
      geoPackageUrl: './assets/data/hospital.gpkg',
      layerName: 'hospital',
      pointToLayer: function(feature, latlng){
          return L.circleMarker(latlng, {radius: 8,
                                        stroke: false,
                                        fillColor: '#01DF01',
                                        fillOpacity: 0.8});
      },
      onEachFeature: function( feature, layer){
          var name = feature.properties.NAMA_RS;

          layer.bindPopup('Nama RS: ' + name);
          layer.on('mouseover', function() {layer.openPopup();});
          layer.on('mouseout', function() {layer.closePopup();});
      }
  }).addTo(map);

  var baselayers = {
    'Shaded Relief': baserelief,
    'Openstreetmap': osm_HOT
};
var overlays = {
    'Jalan': jalan,
    'Rumah Sakit': rumahsakit
};
L.control.layers(baselayers, overlays).addTo(map);

// Add scalebar

var scale = L.control.scale()
scale.addTo(map)

// Add attribution
map.attributionControl.addAttribution('OpenTopoMap');
