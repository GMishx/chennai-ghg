/**
 * @product    RoboMap
 * @link       http://robosoft.co
 * @since      1.0.1
 *
 * @package    Robo_Maps
 * @subpackage Robo_Maps/public
 *
 * @author     RoboSoft Team <team@robosoft.co>
*/
jQuery(function(){
	jQuery('.robo-maps-wrap').each(function(index, el) {
		var obj = jQuery(el);
		if(obj.data('gmap')==1){

			var coorLat = obj.data('lat'), coorLng = obj.data('lng');
			var address = obj.data('address');
			var options = {};

			if(address){
				options.address = address;
			} else if(coorLat && coorLng){
				options.latitude = coorLat;
				options.longitude = coorLng;
			}
			
			var marker = obj.data('marker');
			if(marker){
				var markersOptions = jQuery.extend({}, options);
				var caption = obj.data('caption');
				if(caption){
					if(marker==1) markersOptions.popup = true;
					markersOptions.html = caption;
				}
				options.markers = [markersOptions];
			}
			
			var map = obj.data('map');
			if(map) options.maptype = map;

			options.scrollwheel = obj.data('scroll');

			var controlsOptions = {};
			controlsOptions.streetViewControl = obj.data('street') ;
			controlsOptions.zoomControl = obj.data('zoomcontrol');
			controlsOptions.panControl = obj.data('pan');
			controlsOptions.mapTypeControl = obj.data('mapcontrol');
			controlsOptions.overviewMapControl = obj.data('overview');

			controlsOptions.scaleControl =1 ;

    		options.controls = controlsOptions;
			//zoom need down
			var zoom = obj.data('zoom');
			if(zoom) options.zoom = zoom; else options.zoom = 10;

			var marker1 = obj.data('address1');
			if(marker1){
				options.markers.push( { 
						address: marker1,
						html: marker1,
						popup: true
					});
			}
			
			obj.gMap(options);
		}
	});
});
