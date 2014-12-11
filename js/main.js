$(function () {
	
	var CENTRO = new google.maps.LatLng(-35.2413541,-60.343138);
	var ZOOM = 7;
	var MAP;

	$('body').loadie(0.6);

	var mapbox = [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}];
	var snazzy = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#333739"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2ecc71"}]},{"featureType":"poi","stylers":[{"color":"#2ecc71"},{"lightness":-7}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-28}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"visibility":"on"},{"lightness":-15}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-18}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-34}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#333739"},{"weight":0.8}]},{"featureType":"poi.park","stylers":[{"color":"#2ecc71"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#333739"},{"weight":0.3},{"lightness":10}]}];
	var greyScale = [{"featureType":"poi","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":0},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"transit","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":0},{"lightness":-100},{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#dddddd"},{"saturation":-100},{"lightness":-3},{"visibility":"on"}]}];
	var muted = [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}];
	var vitamina = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#004358"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#1f8a70"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#1f8a70"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#fd7400"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#1f8a70"},{"lightness":-20}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#1f8a70"},{"lightness":-17}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":0.9}]},{"elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#1f8a70"},{"lightness":-10}]},{},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#1f8a70"},{"weight":0.7}]}];

	var vitamina = new google.maps.StyledMapType(vitamina,{name: "Wow"});
	var muted = new google.maps.StyledMapType(muted,{name: "Negro"});
	var greyScale = new google.maps.StyledMapType(greyScale,{name: "Gris"});
	var mapbox = new google.maps.StyledMapType(mapbox,{name: "MapBox"});
	var snazzy = new google.maps.StyledMapType(snazzy,{name: "Verde"});


	var MOPT = {
		zoom: ZOOM,
		center: CENTRO, 
		mapTypeControlOptions: {
	    	mapTypeIds: [google.maps.MapTypeId.ROADMAP, 
	      				google.maps.MapTypeId.HYBRID, 
	      				'Verde', 
	      				'Gris',
	      				'Wow',
	      				'Negro']
	    }
	};

	

	function tomarDatos (cb) {

		var heatMap = [];
		$.getJSON('data/r1.min.json', function (reclamos) {
			$('body').loadie(0.7);
			$("#r").html(reclamos.length)
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
		var localidades = ['Chivilcoy', 'SanNicolas', 'Junin', 'Campana', 'Mercedes'];

		tomarDatos(function (err, data) {
			pintarMapaDeCalor(data);
			agregarKML(localidades);
		})


	}

	
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

	

	// var MOPT = {
	// 	zoom: ZOOM,
	// 	center: CENTRO, 
	// 	mapTypeId: google.maps.MapTypeId.ROADMAP,
	// 	styles: estilo
	// };

	MAP = new google.maps.Map(document.getElementById('map'), MOPT);
	MAP.mapTypes.set('Verde', snazzy);
	MAP.mapTypes.set('Wow', vitamina);
	MAP.mapTypes.set('Gris', greyScale);
	MAP.mapTypes.set('Negro', muted);

	google.maps.event.addDomListener(window, 'load', inicio);
})

 
