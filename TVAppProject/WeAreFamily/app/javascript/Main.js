var Main = { // Main object 
}

var widgetAPI = new Common.API.Widget(); // Create Common module 
var tvKey = new Common.API.TVKeyValue();
 var map;
var geocoder;
var address;

var lat1 = 37.503926;
var lang1 = 127.044846;

var lat2 = 37.503926;
var lang2 = 125.044234;

var lat3 = 37.503926;
var lang3 = 37.503926;

var lat4 = 37.503926;
var lang4 = 125.044234;
var markers = [
               {
                   "title": '아빠',
                   "lat": '37.503926',
                   "lng": '127.044846',
                   "description": '아빠위치 입니다.'
               },
               {
            	   "title": '엄마',
                   "lat": '38.503926',
                   "lng": '127.044846',
                   "description": '엄마위치 입니다.'
               },
               {
            	   "title": '아들',
                   "lat": '39.503926',
                   "lng": '127.044846',
                   "description": '아들위치 입니다.'
               },
               {
            	   "title": '딸',
                   "lat": '40.503926',
                   "lng": '127.044846',
                   "description": '딸위치 입니다.'
               },
               {
            	   "title": '둘째딸',
                   "lat": '41.503926',
                   "lng": '127.044846',
                   "description": '둘째딸 위치 입니다.'
               }
               ];


Main.onLoad = function(){ // called by <body>'s onload event 
    LoadMap();

   

}

function LoadMap() {
	alert("Main.onLoad()"); 
	widgetAPI.sendReadyEvent(); // Send ready message to Application Manager 
	document.getElementById("anchor").focus(); // Focus to Anchor for handling key inputs 
	
	 // LoadMap();
	/*
	map = new GMap2(document.getElementById("map_canvas"));

	

	
	map.setCenter(new GLatLng(lat1,lang1), 15);
	point = new GLatLng(lat1,lang1);
	marker = new GMarker(point);
    map.addOverlay(marker);
    map.openInfoWindow(map.getCenter(),document.createTextNode("아남타워"));
  
    map.setUIToDefault();     
    infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.description + "</div>");
    //infoWindow.open(map, marker);
    
    */

	  var mapOptions = {
		        center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
		        zoom: 10,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		    };
		    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

		    //Create and open InfoWindow.
		    var infoWindow = new google.maps.InfoWindow();

		    for (var i = 0; i < markers.length; i++) {
		        var data = markers[i];
		        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
		        var marker = new google.maps.Marker({
		            position: myLatlng,
		            panControl: true,
		            zoomControl: true,

		            map: map,
		            title: data.title
		        });

		        //Attach click event to the marker.
//		        (function (marker, data) {
//		            google.maps.event.addListener(marker, "click", function (e) {
//		                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
		                infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.description + "</div>");
		                infoWindow.open(map, marker);
//		            });
//		        })(marker, data);
		    }
		    
		    Main.keyDown = function(){ // Key handler 
		    	   var keyCode = event.keyCode;
		    	   alert("Main Key code : " + keyCode); 
		    	   
		    	   switch (keyCode) { 
		    		case tvKey.KEY_LEFT: 
		    			alert("left"); 
		    			//map.panDirection(-1, 0);
		    			//google.maps.ControlPosition.LEFT_CENTER
		    			 map.panBy(-128,0);
		    	        break; 
		    	     
		    		case tvKey.KEY_RIGHT: 
		    			alert("right"); 
		                map.panBy(128,0);
		    			break; 
		    	      
		    		 case tvKey.KEY_UP: 
		    			alert("up"); 
		                map.panBy(0,-128);
		    			break;
		    	      
		    		 case tvKey.KEY_DOWN: 
		    	        alert("down"); 
		                map.panBy(0,128);

		    				//map.panDirection(0, 1);							//moving map down when mapZoomFlag is false
		    			break; 
		    		 case tvKey.KEY_VOL_UP:
		    			 map.setZoom(map.getZoom() + 1);
		    			 
		    			 break;
		    			 
		    		 case tvKey.KEY_VOL_DOWN:
		    			 map.setZoom(map.getZoom() - 1);
		    			 
		    			 break;
		    		 case tvKey.KEY_ENTER: 
		    	         alert("enter"); 
		    			 mapZoomFlag = (mapZoomFlag) ? false : true;		//toggling mapZoomFlag's value
		    	         break; 
		    		 
		    	     
		    		 case tvKey.KEY_RETURN: 
		    			
		    	        break; 
		    	   } 
		    
		    
}


var mapZoomFlag = true;


}   