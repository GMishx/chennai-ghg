<script type="text/javascript">
var map;
var geojsonObject,popup,sensors,json;
var image,image_sensor,styles,styleFunction;
var geoJsonLayer,satellite,basemap,road,layers,admin_grouped;
var sensorsLayer;
var attri=new ol.Attribution({
    html: 'Maps provided by <a href="http://bhuvan.nrsc.gov.in">Bhuvan</a>'
});
function loadData(){
    jQuery.ajax({
        dataType: "html",
        cache: true,
        url: "http://chennaighgemissions.in/getDumps.php?type=locs",
        async: false,
        success: function(data){
            geojsonObject=jQuery.parseJSON(data);
        }
    });
}
function loadSensors(){
    var dumpyr=jQuery("#dumpyard").val();
    if(dumpyr===null){
        alert("Select a dump yard first!");
        return;
    }
    var dist=jQuery("#range").val();
    var dump=null;
    var json=geojsonObject;
    jQuery(json['features']).each(function(){
        if((this['properties']['title']===dumpyr)&&(this['properties']['type']==="dumpyard"))
            dump=this;
    });
    jQuery.ajax({
        dataType: "html",
        cache: true,
        url: "http://chennaighgemissions.in/getSensors.php?dump="+dump['properties']['dump_id']+"&dist="+dist,
        async: true,
        success: function(data){
            sensors=data;
            map.removeLayer(sensorsLayer);
            sensorsLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: (new ol.format.GeoJSON()).readFeatures(sensors)
                }),
                style: styleFunction,
                zIndex:4
            });
            map.addLayer(sensorsLayer);
        }
    });
    var coor=dump['geometry']['coordinates'];
    map.getView().setCenter(coor);
    var sub=15;
    if(dist==1){
        sub=14;
    }
    else if(dist==2||dist==3){
        sub=13;
    }
    else if(dist==4||dist==5){
        sub=12;
    }
    map.getView().setZoom(sub);
}
function gotoCenter(center){
    var cor,zm;
    if(center==='-'){
        cor=[80.2090117,13.0475255];
        zm=11;
    }
    else{
        json=geojsonObject;
        jQuery(json['features']).each(function(){
            if((this['properties']['title']===center)&&(this['properties']['type']==="dumpyard")){
                cor=this['geometry']['coordinates'];
                zm=14;
            }
        });
    }
    map.getView().setCenter(cor);
    map.getView().setZoom(zm);
}
function updatePanel(){
    var selected=jQuery("#sorts").serializeArray();
    selected=selected[0].value;
    jQuery("#"+selected).attr("style","visibility:visible");
    jQuery("#dates,#seasonal,#months").each(function(){
        if(jQuery(this).attr("id")!==selected)
            jQuery(this).attr("style","visibility:collapse");
    });
}
    jQuery("#dumpyard").selectmenu({
        width:200,
        change: function(event,data){
            gotoCenter(jQuery("#dumpyard").val());
            loadSensors();
        }
    });
    var currDate=new Date();
    jQuery("#yearm,#years").attr({
       max : currDate.getFullYear(),
       min : 2015,
       value : currDate.getFullYear()
    });
    jQuery("#week").selectmenu({
        width:200
    });
    jQuery("#month").selectmenu({
        width:200
    });
    jQuery( "#datepicker" ).datepicker({
        showButtonPanel: true,
        showOn: "both",
        buttonImageOnly: true,
        buttonImage: "http://chennaighgemissions.in/CSS/images/Cal_but.png",
        buttonText: "Calendar",
        appendText: "(yyyy-mm-dd)",
        dateFormat: "yy-mm-dd",
        maxDate: currDate,
        changeMonth: true,
        changeYear: true,
        onClose: function(dateText,int){

        }
    }).datepicker('setDate', currDate);
    jQuery("#gas,#season,#sort").buttonset();
    jQuery( "#slider" ).slider({
        value:1,
        min: 1,
        max: 5,
        step: 1,
        slide:function(event,ui){
            jQuery("#range").val(ui.value);
            loadSensors();
        }
    });
    jQuery( "#range" ).val( jQuery( "#slider" ).slider( "value" ));
    jQuery("input[type=submit]").button();
    jQuery("#seasonal,#months").attr("style","visibility:collapse");
    jQuery("#sort").on("change",function(){
        updatePanel();
    });
    function init_map(){
        updatePanel();
        image = new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: 'http://chennaighgemissions.in/CSS/images/dumpyard.png'
        }));
        image_sensor = new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: 'http://chennaighgemissions.in/CSS/images/sensorM.png'
        }));

        styles = {
            'dumpyard': [new ol.style.Style({
                image: image
            })],
            'Polygon': [new ol.style.Style({
                    stroke: new ol.style.Stroke({
                    color: 'green',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(0, 255, 0, 0.1)'
                })
            })],
            'sensor': [new ol.style.Style({
                image: image_sensor
            })]
        };

        styleFunction = function(feature, resolution) {
            return styles[feature.get('type')];
        };
        geoJsonLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
            }),
            style: styleFunction,
            zIndex:4
        });
        satellite=new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url:'http://bhuvan.nrsc.gov.in/tilecache/tilecache.py?',
                params: {
                    'LAYERS':'bhuvan_imagery',
                    'PROJECTION':'EPSG:4326',
                    'VERSION':'1.0.0'
                },
                attributions: [attri]
            }),
            visible:false,
            zIndex:0
        });
        admin_grouped=new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url:'http://bhuvannuis.nrsc.gov.in/bhuvan/gwc/service/wms/',
                params: {
                    'LAYERS':'basemap:admin_group',
                    'PROJECTION':'EPSG:4326',
                    'VERSION':'1.0.0'
                },
                attributions: [attri]
            }),
            visible:false,
            zIndex:1
        });
        basemap=new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url:'http://bhuvannuis.nrsc.gov.in/bhuvan/gwc/service/wms/?',
                params: {
                    'LAYERS':'india3',
                    'PROJECTION':'EPSG:4326',
                    'VERSION':'1.0.0'
                },
                attributions: [attri]
            }),
            visible:true,
            zIndex:0
        });
        road=new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url:'http://bhuvannuis.nrsc.gov.in/bhuvan/gwc/service/wms/?',
                params: {
                    'LAYERS':'mmi:mmi_india',
                    'PROJECTION':'EPSG:4326',
                    'VERSION':'1.0.0'
                }
            }),
            visible:true,
            zIndex:2
        });
        layers = [
            satellite,basemap,road,
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url:'http://bhuvan5.nrsc.gov.in/bhuvan/wms?',
                    params: {
                        'LAYERS':'vector:city_hq',
                        'PROJECTION':'EPSG:4326',
                        'VERSION':'1.0.0'
                    }
                }),
                zIndex:3
            })
            ,geoJsonLayer
        ];
        var ctrl=ol.control.defaults();
        ctrl.item(2).setCollapsible(false);
        map = new ol.Map({
            controls: ctrl.extend([
                new ol.control.ZoomSlider()
            ]),//.extend([mousePositionControl]),
            layers: layers,
            view: new ol.View({
                projection: 'EPSG:4326',
                center: [80.2090117,13.0475255],
                zoom: 11,
                maxZoom: 19,
                minZoom: 5
            })
        });
        //PopUp
        popup = new ol.Overlay.Popup();
        map.addOverlay(popup);
        var target = map.getTarget();
        var jTarget = typeof target === "string" ? jQuery("#" + target) : jQuery(target);
        // change mouse cursor when over marker
        jQuery(map.getViewport()).on('mousemove', function (e) {
            var pixel = map.getEventPixel(e.originalEvent);
            var hit = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                if(feature)
                    if(feature.getGeometry().getType()==="Point")
                        return true;
            });
            if (hit) {
                jTarget.css("cursor", "pointer");
            } else {
                jTarget.css("cursor", "");
            }
        });
        map.on('singleclick', function(evt) {
            var feature = map.forEachFeatureAtPixel(evt.pixel,
                function(feature, layer) {
                    return feature;
            });
            if(feature){
                var dump=jQuery("#dumpyard").val();
                var coor=feature.getGeometry().getCoordinates();
                if(feature.get('type')==="dumpyard"){
                    if(dump!==feature.get('title')){
                        jQuery("#dumpyard").val(feature.get('title')).selectmenu('refresh', true);
                        map.getView().setCenter(coor);
                        map.getView().setZoom(14);
                        loadSensors();
                    }
                    popup.hide();
                }
                else if(feature.get('type')==="sensor"){
                    var title=feature.get("title");
                    var sensor_id=feature.get("sensor_id");
                    var direction=feature.get("direction");
                    var streetAddress=feature.get("streetAddress");
                    var locality=feature.get("locality");
                    var rest=feature.get("rest");
                    var contact=feature.get("contact");
                    var distance=feature.get("distance");
                    var sort=jQuery("input[name=sort]:checked").val();
                    var data="";
                    var tableData="";
                    if(sort==="dates"){
                        data=jQuery("#datepicker").val();
                    }
                    else if(sort==="seasonal"){
                        data=jQuery("input[name=season]:checked").val()+","+jQuery("#years").val();
                    }
                    else if(sort==="months"){
                        data=jQuery("#month").val()+","+jQuery("#yearm").val();
                    }
                    jQuery.ajax({
                        dataType: "json",
                        cache: true,
                        url: "http://chennaighgemissions.in/getData.php?sensor_id="+sensor_id+"&data="+data+"&sort="+sort,
                        async: false,
                        success: function(data){
                            var newData=data;
                            tableData=newData['tableData'];
                            jQuery("#tabularData tbody").html(newData['tabularData']);
                            jQuery("#graphData").show();
                        }
                    });
                    var content="<div style='width:400px;max-height:300px;overflow-y:auto'>"+
                            "<table border=1 style='border-collapse:collapse;font-size:0.8em;width:100%;height:100%' id='popupTable'>"+
                            "<tr><td colspan='3'>Sensor ID: "+sensor_id+"</td><td colspan='2'><b>"+title+"</b></td></tr>"+
                            "<tr><td colspan='3'>Direction from dump yard:</td><td colspan='2'>"+direction+"</td></tr>"+
                            "<tr><td colspan='3'>Address:</td><td colspan='2'>"+streetAddress+", "+locality+", "+rest+"</td></tr>"+
                            "<tr><td colspan='3'>Contact:</td><td colspan='2'>"+contact+"</td></tr>"+
                            "<tr><td colspan='3'>Distance from dump yard:</td><td colspan='2'>"+distance+" km</td></tr>"+
                            "<tr><th colspan='5'>Averaged values from sensor</th></tr>"+
                            "<tr><th>CO<sub>2</sub></th><th>CH<sub>4</sub></th><th>Humidity</th><th>Wind Speed</th><th>Wind Direction</th></tr>"+
                            tableData+
                            "</table></div>";
                    popup.show(coor,content);
                }
                else{
                    popup.hide();
                }
            }
            else{
                popup.hide();
            }
        });
        jQuery("#sat").click(function () {
            satellite.setVisible(true);
            admin_grouped.setVisible(true);
            basemap.setVisible(false);
        });
        jQuery("#bas").click(function () {
            satellite.setVisible(false);
            admin_grouped.setVisible(false);
            basemap.setVisible(true);
        });
        jQuery("#road").click(function () {
            if(road.getVisible())
                road.setVisible(false);
            else
                road.setVisible(true);
        });
        map.setTarget('bhuvan-map-canvas');
        jQuery("#dumpyard").val('-').selectmenu('refresh', true);
    }
</script>
<script type="text/javascript">
jQuery(document).ready( function($) { // jQuery handler called when DOM is ready
	loadData();
	init_map();
});
</script>
