var map;
var geojsonObject,popup,sensors,json;
var image,image_sensor,styles,styleFunction;
var geoJsonLayer,satellite,basemap,road,layers,admin_grouped;
var sensorsLayer;
var attri=new ol.Attribution({
    html: 'Maps provided by <a href="http://bhuvan.nrsc.gov.in">Bhuvan</a>'
});
function loadData(){
    $.ajax({
        dataType: "html",
        cache: true,
        url: "getDumps.php?type=locs",
        async: false,
        success: function(data){
            geojsonObject=data;
        }
    });
}
function loadSensors(){
    var dump=$("#dumpyard").val();
    var dist=$("#range").val();
    json=$.parseJSON(geojsonObject);
    $(json['features']).each(function(){
        if((this['properties']['title']===dump)&&(this['properties']['type']==="dumpyard"))
            dump=this;
    });
    $.ajax({
        dataType: "html",
        cache: true,
        url: "getSensors.php?dump="+dump['properties']['dump_id']+"&dist="+dist,
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
        json=$.parseJSON(geojsonObject);
        $(json['features']).each(function(){
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
    var selected=$("#sorts").serializeArray();
    selected=selected[0].value;
    $("#"+selected).attr("style","visibility:visible");
    $("#dates,#seasonal,#months").each(function(){
        if($(this).attr("id")!==selected)
            $(this).attr("style","visibility:collapse");
    });
}
$(function() {
    $("#content").css({
        width:$(window).width()
    });
    $("#navigation").jMenu({
        openClick:false,
        ulWidth :'auto',
        TimeBeforeOpening : 100,
        TimeBeforeClosing : 11,
        animatedText : false,
        paddingLeft: 1,
        effects : {
            effectSpeedOpen : 150,
            effectSpeedClose : 150,
            effectTypeOpen : 'slide',
            effectTypeClose : 'slide',
            effectOpen : 'swing',
            effectClose : 'swing'
        }
    });
    $("#dumpyard").selectmenu({
        width:200,
        change: function(event,data){
            gotoCenter($("#dumpyard").val());
            loadSensors();
        }
    });
    var currDate=new Date();
    $("#yearm,#years").attr({
       max : currDate.getFullYear(),
       min : 2015,
       value : currDate.getFullYear()
    });
    $("#week").selectmenu({
        width:200
    });
    $("#month").selectmenu({
        width:200
    });
    $( "#datepicker" ).datepicker({
        showButtonPanel: true,
        showOn: "both",
        buttonImageOnly: true,
        buttonImage: "CSS/images/Cal_but.png",
        buttonText: "Calendar",
        appendText: "(yyyy-mm-dd)",
        dateFormat: "yy-mm-dd",
        maxDate: currDate,
        changeMonth: true,
        changeYear: true,
        onClose: function(dateText,int){

        }
    }).datepicker('setDate', currDate);
    $("#gas,#season,#sort").buttonset();
    $( "#slider" ).slider({
        value:1,
        min: 1,
        max: 5,
        step: 1,
        slide:function(event,ui){
            $("#range").val(ui.value);
            loadSensors();
        }
    });
    $( "#range" ).val( $( "#slider" ).slider( "value" ));
    $("input[type=submit]").button();
    $("#seasonal,#months").attr("style","visibility:collapse");
    $("#sort").on("change",function(){
        updatePanel();
    });
    updatePanel();
    loadData();
    function init(){
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
            target: 'map-canvas',
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
        var jTarget = typeof target === "string" ? $("#" + target) : $(target);
        // change mouse cursor when over marker
        $(map.getViewport()).on('mousemove', function (e) {
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
                var dump=$("#dumpyard").val();
                var coor=feature.getGeometry().getCoordinates();
                if(feature.get('type')==="dumpyard"){
                    if(dump!==feature.get('title')){
                        $("#dumpyard").val(feature.get('title')).selectmenu('refresh', true);
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
                    var sort=$("input[name=sort]:checked").val();
                    var data="";
                    var tableData="";
                    if(sort==="dates"){
                        data=$("#datepicker").val();
                    }
                    else if(sort==="seasonal"){
                        data=$("input[name=season]:checked").val()+","+$("#years").val();
                    }
                    else if(sort==="months"){
                        data=$("#month").val()+","+$("#yearm").val();
                    }
                    $.ajax({
                        dataType: "json",
                        cache: true,
                        url: "getData.php?sensor_id="+sensor_id+"&data="+data+"&sort="+sort,
                        async: false,
                        success: function(data){
                            //var newData=$.parseJSON(data);
                            var newData=data;
                            tableData=newData['tableData'];
                            $("#tabularData tbody").html(newData['tabularData']);
                            $("#graphData").show();
                        }
                    });
                    var content="<style>.withBorder{border:1}</style><div style='width:400px;max-height:300px;overflow-y:auto'>"+
                            "<colgroup><col colspan='2' style='width:100%'><col colspan='2' style='width:100%'></colgroup>"+
                            "<table border=1 style='border-collapse:collapse;font-size:0.8em;width:100%;height:100%' class='withBorder'>"+
                            "<tr><td colspan='2'>Sensor ID: "+sensor_id+"</td><td colspan='2'><b>"+title+"</b></td></tr>"+
                            "<tr><td colspan='2'>Direction from dump yard:</td><td colspan='2'>"+direction+"</td></tr>"+
                            "<tr><td colspan='2'>Address:</td><td colspan='2'>"+streetAddress+", "+locality+", "+rest+"</td></tr>"+
                            "<tr><td colspan='2'>Contact:</td><td colspan='2'>"+contact+"</td></tr>"+
                            "<tr><td colspan='2'>Distance from dump yard:</td><td colspan='2'>"+distance+" km</td></tr>"+
                            "<tr><th colspan='4'>Averaged values from sensor</th></tr>"+
                            "<tr><th>CO<sub>2 (ppm)</sub></th><th>CH<sub>4 (ppm)</sub></th><th>Temperature (*C)</th><th>Humidity (%RH)</th>"+//<th>Wind Speed</th><th>Wind Direction</th></tr>"+
                            tableData+
                            "</table>";
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
    }
    init();
    $("#sat").click(function () {
        satellite.setVisible(true);
        admin_grouped.setVisible(true);
        basemap.setVisible(false);
    });
    $("#bas").click(function () {
        satellite.setVisible(false);
        admin_grouped.setVisible(false);
        basemap.setVisible(true);
    });
    $("#road").click(function () {
        if(road.getVisible())
            road.setVisible(false);
        else
            road.setVisible(true);
    });
    $("#dumpyard").val('-').selectmenu('refresh', true);
});