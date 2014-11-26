$(function () {
	$('body').loadie(0.6);
	function tomarDatos (cb) {

		var heatMap = [];
		$.getJSON('data/Reclamos-mini.json', function (reclamos) {
			$('body').loadie(0.7);
			$("#r").html('Reclamos mapeados: ' + reclamos.length)
			for (var i = 0; i < reclamos.length; i++) {
				heatMap.push(new google.maps.LatLng(reclamos[i].lat, reclamos[i].lon));
			}
			return cb(null, heatMap)
		})

	}

	function pintarMapaDeCalor(reclamosMapeados) {
		var pointArray = new google.maps.MVCArray(reclamosMapeados);
		var heatmap = new google.maps.visualization.HeatmapLayer({data: pointArray });
		$('body').loadie(0.8);
		heatmap.setMap(MAP);
		// heatmap.set('opacity', 0.6)
		// heatmap.set('radius', 5)
		
		heatmap.set('maxIntensity', 35)
	}

	function agregarKML(localidades) {

		for (var i = 0; i < localidades.length; i++) {
			var layer = new google
							.maps
							.KmlLayer('https://github.com/andresatencio/cosas/raw/master/'+ localidades[i] +'.kmz', 
								{ map: MAP, preserveViewport: true});
			layer.setMap(MAP);
			$('body').loadie(1);
		}
		
	}

	function inicio () {
		var localidades = ['Chivilcoy', 'SanNicolas'];

		tomarDatos(function (err, data) {
			pintarMapaDeCalor(data);
			agregarKML(localidades);
		})


	}

	var CENTRO = new google.maps.LatLng(-35.2413541,-60.343138);
	var ZOOM = 7;
	var MAP;
	var estilo = [
		{
			featureType: "all",
			stylers: [
			{ saturation: -80 }
			]
		},{
			featureType: "road.arterial",
			elementType: "geometry",
			stylers: [
			{ hue: "#00ffee" },
			{ saturation: 50 }
			]
		},{
			featureType: "poi.business",
			elementType: "labels",
			stylers: [
			{ visibility: "off" }
			]
		}
		];

	var MOPT = {
		zoom: ZOOM,
		center: CENTRO, 
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: estilo
	};

	MAP = new google.maps.Map(document.getElementById('map'), MOPT);
	google.maps.event.addDomListener(window, 'load', inicio);
})
