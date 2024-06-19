const map_palermo = new maplibregl.Map({
  container: 'map_palermo',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [13.352108121306717, 38.13022556003949],
  zoom: 11,
  minZoom: 9.5,
  maxZoom: 17,
  style: {
    "version": 8,
    "name": "PT_interhanges_map_style",
    "metadata": {"maputnik:renderer": "mlgljs"},
    "light": {"anchor": "viewport"},
    "sources": {
      "OpenMapTiles": {
        "type": "vector",
        "url": "https://wms.wheregroup.com/tileserver/tile/world-0-14.json"
      }
    },
    "sprite": "",
    "glyphs": "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",
    "layers": [
      {
        "id": "background",
        "type": "background",
        "layout": {"visibility": "visible"},
        "paint": {"background-color": "#dfdfdf"}
      },
      {
        "id": "green_area",
        "type": "fill",
        "source": "OpenMapTiles",
        "source-layer": "landcover",
        "filter": ["any", ["==", "subclass", "wood"], ["==", "subclass", "park"]],
        "layout": {"visibility": "visible"},
        "paint": {"fill-color": "#ededed", "fill-opacity": 0.8}
      },
      {
        "id": "water_line",
        "type": "line",
        "source": "OpenMapTiles",
        "source-layer": "waterway",
        "filter": ["all", ["==", "$type", "LineString"]],
        "layout": {"visibility": "visible"},
        "paint": {"line-color": "#b9b9bd"}
      },
      {
        "id": "water_body",
        "type": "fill",
        "source": "OpenMapTiles",
        "source-layer": "water",
        "filter": ["all", ["!=", "brunnel", "tunnel"]],
        "layout": {"visibility": "visible"},
        "paint": {"fill-color": "#b9b9bd"}
      },
      {
        "id": "water_label",
        "type": "symbol",
        "source": "OpenMapTiles",
        "source-layer": "waterway",
        "minzoom": 12,
        "filter": ["all", ["==", "class", "river"]],
        "layout": {
          "symbol-placement": "line-center",
          "text-font": ["Open Sans Italic"],
          "text-field": "{name_en}",
          "text-size": {"stops": [[12, 8], [16, 16], [20, 25]]},
          "text-padding": 50,
          "text-pitch-alignment": "viewport",
          "symbol-avoid-edges": false
        },
        "paint": {
          "text-color": "rgba(172, 173, 174, 0.7)",
          "text-translate-anchor": "map"
        }
      },
      {
        "id": "railway",
        "type": "line",
        "source": "OpenMapTiles",
        "source-layer": "transportation",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", "$type", "LineString"],
          ["==", "class", "rail"],
          ["!=", "brunnel", "tunnel"]
        ],
        "layout": {"visibility": "visible"},
        "paint": {
          "line-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            13,
            "hsl(220, 0%, 93%)",
            17,
            "hsl(220, 0%, 87%)"
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.5,
            20,
            1
          ]
        }
      },
      {
        "id": "building",
        "type": "fill",
        "source": "OpenMapTiles",
        "source-layer": "building",
        "minzoom": 15,
        "filter": ["all"],
        "layout": {"visibility": "visible"},
        "paint": {
          "fill-color": "#e8e8e8",
          "fill-opacity": 0.8,
          "fill-outline-color": "#c7c7c7",
          "fill-translate-anchor": "map"
        }
      },
      {
        "id": "street_pedestrian",
        "type": "line",
        "source": "OpenMapTiles",
        "source-layer": "transportation",
        "minzoom": 10,
        "filter": [
          "all",
          ["==", "$type", "LineString"],
          ["==", "subclass", "pedestrian"]
        ],
        "layout": {
          "line-join": "round",
          "line-cap": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "hsl(220, 1%, 100%)",
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            0.5,
            18,
            12
          ],
          "line-opacity": 1
        }
      },
      {
        "id": "street",
        "type": "line",
        "source": "OpenMapTiles",
        "source-layer": "transportation",
        "minzoom": 0,
        "maxzoom": 24,
        "filter": [
          "all",
          ["!=", "class", "transit"],
          ["!=", "class", "rail"],
          ["==", "$type", "LineString"],
          ["!=", "class", "path"],
          ["!=", "class", "track"],
          ["!=", "class", "path_construction"],
          ["!=", "class", "service"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-opacity": 1,
          "line-color": "hsl(220, 1%, 100%)",
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            5,
            [
              "match",
              ["get", "class"],
              ["motorway", "trunk", "primary"],
              0.5,
              ["secondary", "tertiary"],
              0.06,
              0
            ],
            13,
            [
              "match",
              ["get", "class"],
              ["motorway", "trunk", "primary"],
              2.4,
              ["secondary", "tertiary"],
              1.5,
              [
                "motorway_link",
                "trunk_link",
                "primary_link",
                "street",
                "street_limited"
              ],
              0.6,
              0.3
            ],
            18,
            [
              "match",
              ["get", "class"],
              ["motorway", "trunk", "primary"],
              19.2,
              ["secondary", "tertiary"],
              15.6,
              [
                "motorway_link",
                "trunk_link",
                "primary_link",
                "street",
                "street_limited"
              ],
              10.8,
              6
            ],
            22,
            [
              "match",
              ["get", "class"],
              ["motorway", "trunk", "primary"],
              192,
              ["secondary", "tertiary"],
              156,
              [
                "motorway_link",
                "trunk_link",
                "primary_link",
                "street",
                "street_limited"
              ],
              108,
              60
            ]
          ]
        }
      },
      {
        "id": "street_label",
        "type": "symbol",
        "source": "OpenMapTiles",
        "source-layer": "transportation_name",
        "minzoom": 12,
        "filter": [
          "all",
          ["!=", "class", "transit"],
          ["!=", "class", "rail"],
          ["!=", "class", "track"],
          ["!=", "class", "path"],
          ["!=", "class", "path_construction"],
          ["!=", "class", "service"]
        ],
        "layout": {
          "text-field": "{name_en}",
          "visibility": "visible",
          "text-font": ["Open Sans Regular"],
          "symbol-placement": "line-center",
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            [
              "match",
              ["get", "class"],
              ["motorway", "trunk", "primary", "secondary", "tertiary"],
              10,
              9
            ],
            18,
            [
              "match",
              ["get", "class"],
              ["motorway", "trunk", "primary", "secondary", "tertiary"],
              16,
              14
            ]
          ],
          "symbol-spacing": 200,
          "symbol-avoid-edges": true,
          "symbol-z-order": "source",
          "text-ignore-placement": false,
          "text-letter-spacing": 0.1,
          "text-pitch-alignment": "viewport",
          "text-max-angle": 30,
          "text-padding": 5,
          "text-rotation-alignment": "map"
        },
        "paint": {"text-color": "#7c7d7e"}
      }
    ],
    "id": "evk7f70",
    "owner": ""
  }
});

const map_helsinki = new maplibregl.Map({
  container: 'map_helsinki',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [24.984457803338294, 60.20223222447209],
  zoom: 10,
  minZoom: 9.5,
  maxZoom: 17,
  style: {
    "version": 8,
    "name": "PT_interhanges_map_style",
    "metadata": {"maputnik:renderer": "mlgljs"},
    "light": {"anchor": "viewport"},
    "sources": {
      "OpenMapTiles": {
        "type": "vector",
        "url": "https://wms.wheregroup.com/tileserver/tile/world-0-14.json"
      }
    },
    "sprite": "",
    "glyphs": "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",
    "layers": [
      {
        "id": "background",
        "type": "background",
        "layout": {"visibility": "visible"},
        "paint": {"background-color": "#dfdfdf"}
      },
      {
        "id": "green_area",
        "type": "fill",
        "source": "OpenMapTiles",
        "source-layer": "landcover",
        "filter": ["any", ["==", "subclass", "wood"], ["==", "subclass", "park"]],
        "layout": {"visibility": "visible"},
        "paint": {"fill-color": "#ededed", "fill-opacity": 0.8}
      },
      {
        "id": "water_line",
        "type": "line",
        "source": "OpenMapTiles",
        "source-layer": "waterway",
        "filter": ["all", ["==", "$type", "LineString"]],
        "layout": {"visibility": "visible"},
        "paint": {"line-color": "#b9b9bd"}
      },
      {
        "id": "water_body",
        "type": "fill",
        "source": "OpenMapTiles",
        "source-layer": "water",
        "filter": ["all", ["!=", "brunnel", "tunnel"]],
        "layout": {"visibility": "visible"},
        "paint": {"fill-color": "#b9b9bd"}
      },
      {
        "id": "water_label",
        "type": "symbol",
        "source": "OpenMapTiles",
        "source-layer": "waterway",
        "minzoom": 12,
        "filter": ["all", ["==", "class", "river"]],
        "layout": {
          "symbol-placement": "line-center",
          "text-font": ["Open Sans Italic"],
          "text-field": "{name_en}",
          "text-size": {"stops": [[12, 8], [16, 16], [20, 25]]},
          "text-padding": 50,
          "text-pitch-alignment": "viewport",
          "symbol-avoid-edges": false
        },
        "paint": {
          "text-color": "rgba(172, 173, 174, 0.7)",
          "text-translate-anchor": "map"
        }
      },
      {
        "id": "railway",
        "type": "line",
        "source": "OpenMapTiles",
        "source-layer": "transportation",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", "$type", "LineString"],
          ["==", "class", "rail"],
          ["!=", "brunnel", "tunnel"]
        ],
        "layout": {"visibility": "visible"},
        "paint": {
          "line-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            13,
            "hsl(220, 0%, 93%)",
            17,
            "hsl(220, 0%, 87%)"
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.5,
            20,
            1
          ]
        }
      },
      {
        "id": "building",
        "type": "fill",
        "source": "OpenMapTiles",
        "source-layer": "building",
        "minzoom": 15,
        "filter": ["all"],
        "layout": {"visibility": "visible"},
        "paint": {
          "fill-color": "#e8e8e8",
          "fill-opacity": 0.8,
          "fill-outline-color": "#c7c7c7",
          "fill-translate-anchor": "map"
        }
      },
      {
        "id": "street_pedestrian",
        "type": "line",
        "source": "OpenMapTiles",
        "source-layer": "transportation",
        "minzoom": 10,
        "filter": [
          "all",
          ["==", "$type", "LineString"],
          ["==", "subclass", "pedestrian"]
        ],
        "layout": {
          "line-join": "round",
          "line-cap": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "hsl(220, 1%, 100%)",
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            0.5,
            18,
            12
          ],
          "line-opacity": 1
        }
      },
      {
        "id": "street",
        "type": "line",
        "source": "OpenMapTiles",
        "source-layer": "transportation",
        "minzoom": 0,
        "maxzoom": 24,
        "filter": [
          "all",
          ["!=", "class", "transit"],
          ["!=", "class", "rail"],
          ["==", "$type", "LineString"],
          ["!=", "class", "path"],
          ["!=", "class", "track"],
          ["!=", "class", "path_construction"],
          ["!=", "class", "service"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-opacity": 1,
          "line-color": "hsl(220, 1%, 100%)",
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            5,
            [
              "match",
              ["get", "class"],
              ["motorway", "trunk", "primary"],
              0.5,
              ["secondary", "tertiary"],
              0.06,
              0
            ],
            13,
            [
              "match",
              ["get", "class"],
              ["motorway", "trunk", "primary"],
              2.4,
              ["secondary", "tertiary"],
              1.5,
              [
                "motorway_link",
                "trunk_link",
                "primary_link",
                "street",
                "street_limited"
              ],
              0.6,
              0.3
            ],
            18,
            [
              "match",
              ["get", "class"],
              ["motorway", "trunk", "primary"],
              19.2,
              ["secondary", "tertiary"],
              15.6,
              [
                "motorway_link",
                "trunk_link",
                "primary_link",
                "street",
                "street_limited"
              ],
              10.8,
              6
            ],
            22,
            [
              "match",
              ["get", "class"],
              ["motorway", "trunk", "primary"],
              192,
              ["secondary", "tertiary"],
              156,
              [
                "motorway_link",
                "trunk_link",
                "primary_link",
                "street",
                "street_limited"
              ],
              108,
              60
            ]
          ]
        }
      },
      {
        "id": "street_label",
        "type": "symbol",
        "source": "OpenMapTiles",
        "source-layer": "transportation_name",
        "minzoom": 12,
        "filter": [
          "all",
          ["!=", "class", "transit"],
          ["!=", "class", "rail"],
          ["!=", "class", "track"],
          ["!=", "class", "path"],
          ["!=", "class", "path_construction"],
          ["!=", "class", "service"]
        ],
        "layout": {
          "text-field": "{name_en}",
          "visibility": "visible",
          "text-font": ["Open Sans Regular"],
          "symbol-placement": "line-center",
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            [
              "match",
              ["get", "class"],
              ["motorway", "trunk", "primary", "secondary", "tertiary"],
              10,
              9
            ],
            18,
            [
              "match",
              ["get", "class"],
              ["motorway", "trunk", "primary", "secondary", "tertiary"],
              16,
              14
            ]
          ],
          "symbol-spacing": 200,
          "symbol-avoid-edges": true,
          "symbol-z-order": "source",
          "text-ignore-placement": false,
          "text-letter-spacing": 0.1,
          "text-pitch-alignment": "viewport",
          "text-max-angle": 30,
          "text-padding": 5,
          "text-rotation-alignment": "map"
        },
        "paint": {"text-color": "#7c7d7e"}
      }
    ],
    "id": "evk7f70",
    "owner": ""
  }
});

map_palermo.on('load', () => {

    map_palermo.addSource('connections_pt_stops_palermo', {
        'type': 'geojson',
        'data': 'https://github.com/knifontova/interchanges_urban_nodes/main/data/l_shortest_lines_palermo_cln.geojson'
    });

    map_palermo.addLayer({
        'id': 'connections_pt_stops_layer_palermo',
        'type': 'line',
        'source': 'connections_pt_stops_palermo',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-color': [
            "interpolate",
            ["linear"],
            ["get", "distance"],
            2.32,
            "#054fb9",
            100,
            "#054fb9",
            200,
            "#0073e6",
            300,
            "#8babf1",
            400,
            "#f57600",
            499.81,
            "#c44601"
            ],
            'line-width': [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              0.1,
              13,
              1,
              22,
              3
            ],
            'line-opacity': 0.9
        }
    });

    map_palermo.addSource('pt_stops_palermo', {
        'type': 'geojson',
        'data': 'https://raw.githubusercontent.com/knifontova/pt_interchanges/main/p_palermo_PT_stops_allinfo_35N.geojson'
    });

    map_palermo.addLayer({
        'id': 'pt_stops_layer_palermo',
        'type': 'circle',
        'source': 'pt_stops_palermo',
        // 'layout': {
        // },
        'paint': {
          'circle-radius': [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            [
              "interpolate",
              ["linear"],
              ["get", "conn_count_all"],
              0,
              0,
              37,
              0.2
            ],
            11,
            [
              "interpolate",
              ["linear"],
              ["get", "conn_count_all"],
              0,
              0.5,
              37,
              1
            ],
            14,
            [
              "interpolate",
              ["linear"],
              ["get", "conn_count_all"],
              0,
              4,
              37,
              8
            ],
            22,
            [
              "interpolate",
              ["linear"],
              ["get", "conn_count_all"],
              0,
              7,
              37,
              14
            ]
          ],
          'circle-color': '#565254',
          'circle-opacity': 0.8,
          'circle-stroke-width': 0.2,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.9
        }
    });
});

map_palermo.on('click', 'pt_stops_layer_palermo', function(e) {

  if (!e.features[0].properties.median_distance) {
    e.features[0].properties.median_distance = 'no connections';
  }

  if (!e.features[0].properties.min_distance) {
    e.features[0].properties.min_distance = 'no connections';
  }

	new maplibregl.Popup()
		.setHTML('<b>' + e.features[0].properties.stop_name
              + '</b><br>Number of connections (within 500 m radius) – <b>' + e.features[0].properties.conn_count_all
              + '</b><br>Number of connections (within 100 m radius) – <b>' + e.features[0].properties.conn_count_less100m
              + '</b><br>Median connection length – <b>' + e.features[0].properties.median_distance
              + '</b><br>Minimum connection length – <b>' + e.features[0].properties.min_distance + '</b>')
		.setLngLat(e.lngLat)
		.addTo(map_palermo);
});

map_palermo.on('mouseenter', 'pt_stops_layer_palermo', function () {
	map_palermo.getCanvas().style.cursor = 'pointer';
})

map_palermo.on('mouseleave', 'pt_stops_layer_palermo', function () {
	map_palermo.getCanvas().style.cursor = 'default';
});

// The following code was taken and adapted from the code I worked on at my previous job
function check_toggles_palermo() {
  const toggles = ['toggle_less100', 'toggle_100_200', 'toggle_200_300', 'toggle_300_400', 'toggle_more_400'];
  toggles.forEach(toggle_id => {
    const toggle = document.getElementById(toggle_id);
    if (toggle) {
      toggle.checked = true;
    }
  });
  if (map_palermo && map_palermo.setFilter) {
    map_palermo.setFilter('connections_pt_stops_layer_palermo', null);
  }
};

function distance_filter_palermo(toggle_id, isChecked) {
  const distance_palermo = {
    'toggle_less100': ['<=', 'distance', 100],
    'toggle_100_200': ['all', ['>', 'distance', 100], ['<=', 'distance', 200]],
    'toggle_200_300': ['all', ['>', 'distance', 200], ['<=', 'distance', 300]],
    'toggle_300_400': ['all', ['>', 'distance', 300], ['<=', 'distance', 400]],
    'toggle_more_400': ['>', 'distance', 400]
  };

  let active_filters = [];
  Object.keys(distance_palermo).forEach(key => {
    const toggle = document.getElementById(key);
    if (!toggle.checked) {
      active_filters.push(['none', distance_palermo[key]]);
    }
  });

  const combined_filters = active_filters.length > 0 ? ['all', ...active_filters] : null;
  map_palermo.setFilter('connections_pt_stops_layer_palermo', combined_filters);
}

document.addEventListener('DOMContentLoaded', function() {
    check_toggles_palermo();
});

map_helsinki.on('load', () => {

    map_helsinki.addSource('connections_pt_stops_helsinki', {
        'type': 'geojson',
        'data': 'https://github.com/knifontova/interchanges_urban_nodes/main/data/l_shortest_lines_helsinki_cln.geojson'
    });

    map_helsinki.addLayer({
        'id': 'connections_pt_stops_layer_helsinki',
        'type': 'line',
        'source': 'connections_pt_stops_helsinki',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': [
              "interpolate",
              ["linear"],
              ["get", "distance"],
              2.32,
              "#054fb9",
              100,
              "#054fb9",
              200,
              "#0073e6",
              300,
              "#8babf1",
              400,
              "#f57600",
              499.81,
              "#c44601"
            ],
            'line-width': [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              0.1,
              13,
              1,
              22,
              3
            ],
            'line-opacity': 0.9
        }
    });

    map_helsinki.addSource('pt_stops_helsinki', {
        'type': 'geojson',
        'data': 'https://raw.githubusercontent.com/knifontova/pt_interchanges/main/p_helsinki_PT_stops_clipped_allinfo.geojson'
    });

    map_helsinki.addLayer({
        'id': 'pt_stops_layer_helsinki',
        'type': 'circle',
        'source': 'pt_stops_helsinki',
        // 'layout': {
        // },
        'paint': {
          'circle-radius': [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            [
              "interpolate",
              ["linear"],
              ["get", "conn_count_all"],
              0,
              0,
              37,
              0.2
            ],
            11,
            [
              "interpolate",
              ["linear"],
              ["get", "conn_count_all"],
              0,
              0.5,
              37,
              1
            ],
            14,
            [
              "interpolate",
              ["linear"],
              ["get", "conn_count_all"],
              0,
              4,
              37,
              8
            ],
            22,
            [
              "interpolate",
              ["linear"],
              ["get", "conn_count_all"],
              0,
              7,
              37,
              14
            ]
          ],
          'circle-color': '#565254',
          'circle-opacity': 0.8,
          'circle-stroke-width': 0.2,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.9
        }
    });
});

map_helsinki.on('click', 'pt_stops_layer_helsinki', function(e) {

  if (!e.features[0].properties.median_distance) {
    e.features[0].properties.median_distance = 'no connections';
  }

  if (!e.features[0].properties.min_distance) {
    e.features[0].properties.min_distance = 'no connections';
  }

	new maplibregl.Popup()
    .setHTML('<b>' + e.features[0].properties.stop_name
              + '</b><br>Number of connections (within 500 m radius) – <b>' + e.features[0].properties.conn_count_all
              + '</b><br>Number of connections (within 100 m radius) – <b>' + e.features[0].properties.conn_count_less100m
              + '</b><br>Median connection length – <b>' + e.features[0].properties.median_distance
              + '</b><br>Minimum connection length – <b>' + e.features[0].properties.min_distance + '</b>')
		.setLngLat(e.lngLat)
		.addTo(map_helsinki);
});

map_helsinki.on('mouseenter', 'pt_stops_layer_helsinki', function () {
	map_helsinki.getCanvas().style.cursor = 'pointer';
})

map_helsinki.on('mouseleave', 'pt_stops_layer_helsinki', function () {
	map_helsinki.getCanvas().style.cursor = 'default';
});

function check_toggles_helsinki() {
  const toggles = ['toggle_less100_h', 'toggle_100_200_h', 'toggle_200_300_h', 'toggle_300_400_h', 'toggle_more_400_h'];
  toggles.forEach(toggle_id => {
    const toggle = document.getElementById(toggle_id);
    if (toggle) {
      toggle.checked = true;
    }
  });
  if (map_helsinki && map_helsinki.setFilter) {
    map_helsinki.setFilter('connections_pt_stops_layer_helsinki', null);
  }
};

function distance_filter_helsinki(toggle_id, isChecked) {
  const distance_helsinki = {
    'toggle_less100_h': ['<=', 'distance', 100],
    'toggle_100_200_h': ['all', ['>', 'distance', 100], ['<=', 'distance', 200]],
    'toggle_200_300_h': ['all', ['>', 'distance', 200], ['<=', 'distance', 300]],
    'toggle_300_400_h': ['all', ['>', 'distance', 300], ['<=', 'distance', 400]],
    'toggle_more_400_h': ['>', 'distance', 400]
  };

  let active_filters = [];
  Object.keys(distance_helsinki).forEach(key => {
    const toggle = document.getElementById(key);
    if (!toggle.checked) {
      active_filters.push(['none', distance_helsinki[key]]);
    }
  });

  const combined_filters = active_filters.length > 0 ? ['all', ...active_filters] : null;
  map_helsinki.setFilter('connections_pt_stops_layer_helsinki', combined_filters);
}

document.addEventListener('DOMContentLoaded', function() {
    check_toggles_helsinki();
});
