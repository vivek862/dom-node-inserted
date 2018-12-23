/*------------------------
RUN CODE WHEN ELEMENT EXISTS
used for dynamically added content
Based on the work by David Walsh and Daniel Buchner
------------------------*/

var onElementInserted = function(selector, callback){
    //use existing stylesheet or create a new one if one doesn't exist already
    var style = document.getElementById("insert-detection-css") || 
        (function(){
            var style = document.createElement("style");
            style.id = "insert-detection-css";
            style.setAttribute( "media", "screen" );
            style.appendChild( document.createTextNode("") );
            document.head.appendChild(style);
            return style;
        })();
    
    //add all prefixes to the animation rules
    var Prefix = function(str){
        var returnStr = "";
        var prefixList = ["", "-o-", "-ms-", "-webkit-"];
        for ( x in prefixList ){
            returnStr += prefixList[x] + str;
        }
        return returnStr
    };
    
    //add our new rules to this stylesheet
    style.sheet.insertRule(selector + "{"+
        Prefix("animation-duration: 0.001s;")+
        Prefix("animation-name: nodeInserted;")+
        "}", 0
    );
    
    //set up the callback for when the animation runs
    var insertListener = function(event){
        if (event.animationName == "nodeInserted") {
            callback(event.target);
        }
    }
    
    //wait for 'nodeInserted' animation to run
    document.addEventListener("animationend", insertListener, false); // standard + firefox
    document.addEventListener("oanimationend", insertListener, false); //opera		
    document.addEventListener("MSAnimationEnd", insertListener, false); // IE
    document.addEventListener("webkitAnimationEnd", insertListener, false); // Chrome + Safari
}

