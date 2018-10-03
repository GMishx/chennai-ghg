var map;
var dumps=new Array();
var dumpMarkers=new Array();
var sensors=new Array();
var sensorMarkers=new Array();
function loadData(){
    $.ajax({
        dataType: "json",
        url: 'getDumps.php',
        data: 'type=dump',
        async: false,
        success: function(data){
            $.each(data,function(i, value){
                dumps.push({
                    loc:new google.maps.LatLng(value.loc.lat,value.loc.long),
                    name:value.name
                });
            });
        }
    });
    $.ajax({
        dataType: "json",
        url: "getSensors.php",
        async: false,
        success: function(data){
            $.each(data,function(i, value){
                sensors.push({
                    id:value.SID,
                    loc:new google.maps.LatLng(value.loc.lat,value.loc.long),
                    data:value.data,
                    dist:value.dist,
                    dump:value.dump
                });
            });
        }
    });
}
function initDumpMarkers(){
    var image = 'http://chennaighgemissions.in/CSS/images/dumpyard.png';
    $.each(dumps,function(i,value){
        var loc=value.loc,name=value.name;
        dumpMarkers.push({
            marker:new google.maps.Marker({
                position: loc,
                map: map,
                title: name,
                animation: google.maps.Animation.DROP,
                icon: image
            }),
            loc:loc
        });
    });
    $.each(dumpMarkers,function(i,value){
        var marker=value.marker;
        google.maps.event.addListener(marker,'click',function(){
            gotoCenter(marker);
        });
    });
}
function initSensorMarkers(){
    $.each(sensors,function(i,value){
        var id=value.id,loc=value.loc,data=value.data,dist=value.dist,dump=value.dump;
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading">'+id+'</h3>'+
            '<div id="bodyContent">'+
            '<p>'+data+'</p>'+
            '</div>'+
            '</div>';
        sensorMarkers.push({
            marker:new google.maps.Marker({
                position: loc,
                map: null,
                title: id,
                animation: google.maps.Animation.DROP
            }),
            dist:dist,
            dump:dump,
            data:data,
            infowindow:new google.maps.InfoWindow({
                content: contentString
            })
        });
    });
    $.each(sensorMarkers,function(i,value){
        var marker=value.marker;
        google.maps.event.addListener(marker,'click',function(){
            showInfoWindow(value);
        });
    });
}
function gotoCenter(yard){
    if($.type(yard)===$.type($("#dumpyard").val())){
        $.each(dumpMarkers,function(i,value){
            if(value.marker.getTitle()===yard)
                yard=value.marker;
        });
    }
    $("#dumpyard").val(yard.getTitle()).selectmenu('refresh', true);
    map.setCenter(yard.getPosition());
    map.setZoom(15);
    loadSensors();
}
function loadSensors(){
    var selectedDump=$("#dumpyard").val(),selectedDist=parseFloat($("#range").val());
    var lower=(selectedDist-0.5),upper=(selectedDist+0.5);
    $.each(sensorMarkers,function(i,value){
        var sensDump=value.dump,sensDist=value.dist,marker=value.marker;
        if(sensDump==selectedDump&&sensDist>=lower&&sensDist<upper){
            marker.setMap(map);
            map.setZoom(14-sensDist);
        }
        else{
            marker.setMap(null);
        }
    });
}
function showInfoWindow(sentMarker){
    $.each(sensorMarkers,function(i,value){
        var thisMarker=value.marker,infowindow=value.infowindow;
        if(sentMarker.marker.getPosition()===thisMarker.getPosition()){
            sentMarker.infowindow.open(map,sentMarker.marker);
        }
        else{
            infowindow.close();
        }
    });
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
        }
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
        appendText: "(m/dd/yyyy)",
        dateFormat: "m/dd/yy",
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        onClose: function(dateText,int){
            
        }
    });
    $("#gas,#season,#sort").buttonset();
    $('input[type=radio][name=season]').change(function() {
        
    });
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
    function initialize() {
        loadData();
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
            center: new google.maps.LatLng(13.0475255,80.2090117),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(mapCanvas, mapOptions);
        initDumpMarkers();
        initSensorMarkers();
        map.data.loadGeoJson("getDumps.php?type=locs");
        map.data.setStyle(function(feature) {
            var type = feature.getProperty('type');
            if(type==="polygon"){
                return{
                    fillColor: 'green',
                    strokeWeight: 1,
                    fillOpacity: 0.1
                };
            }
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
});