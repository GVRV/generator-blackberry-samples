function invite() {
blackberry.bbm.platform.users.inviteToDownload()
}

function setPM() {
blackberry.bbm.platform.self.setPersonalMessage('According to Hex Clock, the time is currently ' + document.getElementById('color2').innerHTML + '.')
}

function onLoadFunctions() {
setInterval(makeClock, 100);
// Register the app. Make sure you get a unique UUID!
    blackberry.event.addEventListener('onaccesschanged', function (accessible, status) {
        if (status === 'unregistered') {
            blackberry.bbm.platform.register({
                uuid: 'cd71c7d5-1d17-41c6-84e1-2dec70fd57d2'
            });
        } else if (status === 'allowed') {
            bbm.registered = accessible;
        }
    }, false)
    }

    
 function inverse(theString) {
    theString=theString.toLowerCase();
    var validHexChar=/[^a-f0-9]/gi
    var a=theString.slice(0,2);
    var b=theString.slice(2,4);
    var c=theString.slice(4,6);
    var a1=16*giveHex(a.slice(0,1));
    var a2=giveHex(a.slice(1,2));
    a=a1+a2;
    var b1=16*giveHex(b.slice(0,1));
    var b2=giveHex(b.slice(1,2));
    b=b1+b2;
    var c1=16*giveHex(c.slice(0,1));
    var c2=giveHex(c.slice(1,2));
    c=c1+c2;
    
    newColor=DecToHex(255-a)+""+DecToHex(255-b)+""+DecToHex(255-c)
    document.getElementById('color').style.backgroundColor = '#' + newColor;
    
 }
 var hexbase="0123456789ABCDEF";
 function DecToHex(number) {
           return hexbase.charAt((number>> 4)& 0xf)+ hexbase.charAt(number& 0xf);
         }
 function giveHex(s){
    s=s.toUpperCase();
    return parseInt(s,16);
 }


function makeClock() {
  var currentTime = new Date ( );

  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  
  hours = ( hours < 10 ? "0" :"" ) + hours;
  minutes = ( minutes < 10 ? "0" :"" ) + minutes;
  seconds = ( seconds < 10 ? "0" : "" ) + seconds;

inverse(hours + '' +  minutes + '' + seconds)
document.getElementById('color2').style.color = '#' + hours + '' +  minutes + '' + seconds
document.getElementById('color2').innerHTML = hours + ':' +  minutes + ':' + seconds
}

// You must call init on bbUI before any other code loads.  
// If you want default functionality simply don't pass any parameters.. bb.init();
bb.init({actionBarDark: true,
    controlsDark: true,
    listsDark: false,
    bb10ForPlayBook: true,
    // Fires "before" styling is applied and "before" the screen is inserted in the DOM
    onscreenready: function(element, id) {
        if (id == 'dataOnLoad') {
            dataOnLoad_initialLoad(element);
        } else if (id == 'masterDetail') {
            masterDetail_initialLoad(element);
        }
        
        // Remove all titles "except" input and pill buttons screen if running on BB10
        if (bb.device.isBB10 && (id != 'input') && (id != 'pillButtons') && (id != 'titlePillButtons')) {
            var titles = element.querySelectorAll('[data-bb-type=title]');
            if (titles.length > 0) {
                titles[0].parentNode.removeChild(titles[0]);
            }
        } 
        
        // Initialize our title pill buttons screen
        if (bb.device.isBB10 && (id == 'titlePillButtons')) {
            titlePillButtons_Init(element);
        }
        
    },
    // Fires "after" styling is applied and "after" the screen is inserted in the DOM
    ondomready: function(element, id) {
        if (id == 'dataOnTheFly') {
            dataOnTheFly_initialLoad(element);
        } 
    onLoadFunctions();
    }
});

bb.pushScreen('includes/clock.htm','clock');