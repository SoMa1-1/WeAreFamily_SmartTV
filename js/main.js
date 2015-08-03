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
	$("#content-black-background").css('left', '22%');
	$("#content-black-background").animate({ width: "77%" }, 250);
}

function naviUnFocus() {
	$(".navigator").animate({ width: "7%" }, 250);
	$(".content-main").animate({ width: "93%" }, 250);
	$("#content-black-background").css('left', '8.5%');
	$("#content-black-background").animate({ width: "90%" }, 250);
}

function naviOnClick() {
	$("#navi-home").click(function() {
		changePage(0);
    });
	
	$("#navi-story").click(function() {
		changePage(1);
    });
	
	$("#navi-location").click(function() {
		changePage(2);
    });
	
	$("#navi-message").click(function() {
		changePage(3);
    });
	
	$("#navi-lifestyle").click(function() {
		changePage(4);
    });
	
	$("#navi-setting").click(function() {
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
	var page_title = ["Main", "Story", "Location", "Message", "LifeStyle", "Option"];
	$("#content-title").text(page_title[index]);
	
	if(index == 0) {
		$("#content-black-background").fadeOut();
		$("#main_title").fadeIn();
	} else {
		$("#main_title").fadeOut();
		$("#content-black-background").fadeIn();
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
