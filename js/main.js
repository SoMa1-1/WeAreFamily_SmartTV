var view_stack = new Array();
var backEventListener = null;

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
}

//Initialize function
var init = function () {
    // register once
    if ( backEventListener !== null ) {
        return;
    }
    
    // TODO:: Do your initialization job
    console.log("init() called");
    
    var backEvent = function(e) {
        if ( e.keyName == "back" ) {
            try {
                if ( $.mobile.urlHistory.activeIndex <= 0 ) {
                    // if first page, terminate app
                    unregister();
                } else {
                    // move previous page
                    $.mobile.urlHistory.activeIndex -= 1;
                    $.mobile.urlHistory.clearForward();
                    window.history.back();
                }
            } catch( ex ) {
                unregister();
            }
        }
    }
    
    // add eventListener for tizenhwkey (Back Button)
    document.addEventListener( 'tizenhwkey', backEvent );
    backEventListener = backEvent;
};

$(document).bind( 'pageinit', init );
$(document).unload( unregister );

function naviToggle() {
	$(".navigator").mouseenter(function() {
		naviFocus();
    }).mouseleave(function() {
    	naviUnFocus();
    });
}

function naviFocus() {
	$(".navigator").animate({ width: "20%" }, 250);
	$(".content-main").animate({ width: "80%"}, 250);
	$("#content-background").css('left', '22%');
	$("#content-background").animate({ width: "77%" }, 250);
}

function naviUnFocus() {
	$(".navigator").animate({ width: "7%" }, 250);
	$(".content-main").animate({ width: "93%" }, 250);
	$("#content-background").css('left', '8.5%');
	$("#content-background").animate({ width: "90%" }, 250);
}

function naviOnClick() {
	$("#navi-home").click(function() {
		changePage(0);
    });
	
	$("#navi-location").click(function() {
		changePage(1);
    });
	
	$("#navi-message").click(function() {
		changePage(2);
    });
	
	$("#navi-lifestyle").click(function() {
		changePage(3);
    });
	
	$("#navi-mission").click(function() {
		changePage(4);
    });
	
	$("#navi-option").click(function() {
		changePage(5);
    });
}

function setFocusVisible(index1,state){
	var list = $.mobile.activePage.find("a[href]");
	
	$item = list[index1];
	if (state) {
		$item.focus();
		if(index1 != 0) {
			naviFocus();
		} else {
			naviUnFocus();
		}
	}
	else {
		$item.blur();
	}
}

function changePage(index){
	
	var page_title = ["Main", "Location", "Message", "LifeStyle", "Mission", "Options"];
	$("#section-title").text(page_title[index]);
	
	if(index == 0) {
		$("#content-background").fadeOut();
		$("#main_title").fadeIn();
	} else {
		$("#main_title").fadeOut();
		$("#content-background").fadeIn();
		$("#section-" + page_title[view_stack[view_stack.length-1]]).hide();
		
		view_stack.push(index);
		$("#section-" + page_title[index]).fadeIn();
		
		if(index == 3) {
			var ctx_move = document.getElementById("canvas_move").getContext("2d");
			var move_bar = new Chart(ctx_move).Bar(barChartData, {
				responsive : true
			});
			
			var ctx_phone = document.getElementById("canvas_phone").getContext("2d");
			var phone_line = new Chart(ctx_phone).Line(lineChartData, {
				responsive: true
			});
			
			var ctx_sleep1 = document.getElementById("canvas_sleep1").getContext("2d");
			var pie1 = new Chart(ctx_sleep1).Pie(pieData);
			
			var ctx_sleep2 = document.getElementById("canvas_sleep2").getContext("2d");
			var pie2 = new Chart(ctx_sleep2).Pie(pieData);
			
			var ctx_sleep3 = document.getElementById("canvas_sleep3").getContext("2d");
			var pie3 = new Chart(ctx_sleep3).Pie(pieData);
			
			var ctx_sleep4 = document.getElementById("canvas_sleep4").getContext("2d");
			var pie4 = new Chart(ctx_sleep4).Pie(pieData);
			
			$(function() {
			    var progressbar = $( ".progressbar" ),
			      progressLabel = $( ".progress-label" );
			 
			    progressbar.progressbar({
			      value: false,
			      change: function() {
			        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
			      },
			      complete: function() {
			        progressLabel.text( "Tired...!" );
			      }
			    });
			 
			    function progress() {
			      var val = progressbar.progressbar( "value" ) || 0;
			 
			      progressbar.progressbar( "value", val + 2 );
			 
			      if ( val < 99 ) {
			        setTimeout( progress, 80 );
			      }
			    }
			 
			    setTimeout( progress, 2000 );
			  });
		}
	}
}
var index = 0;

function handelPageOne(e) {
	switch(e.keyCode){
		case TvKeyCode.KEY_LEFT:
		case TvKeyCode.KEY_UP:
			if(index != 0  && index >0){
				index--;
			}
			setFocusVisible(index+1,false);
			setFocusVisible(index,true);
			break;
		case TvKeyCode.KEY_RIGHT:
		case TvKeyCode.KEY_DOWN:
			if (index == 0){
				index = index +1;
				setFocusVisible(index-1,false);
				setFocusVisible(index,true);
			}
			else if(index != 5 && index < 5){
				index++;
				setFocusVisible(index-1,false);
				setFocusVisible(index,true);
			}
			break;
		case TvKeyCode.KEY_ENTER:
			changePage(index);
			break;
		default:
			break;
	}
}

function bindKeyToPage(){
	
	naviToggle();
	naviOnClick();
	
	index = 0;
	setFocusVisible(index,true);
	document.body.removeEventListener("keydown",handelPageOne,false);
	document.body.addEventListener("keydown",handelPageOne ,false);
}

$(document).on("pageshow", "#main", bindKeyToPage);
