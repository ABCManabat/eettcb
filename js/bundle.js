(function(){
/**
 * Javascript toolbox
 * By Rémi Vansteelandt - http://www.remvst.com/
 * 
 * This toolbox should be useful for common operations when creating 
 * HTML5 games.
 * It features simple DOM manipulation, simplified AJAX and cookie usage,
 * as well as many useful functions.
 * 
 */
 
// animationFrame API
var requestAnimFrame = window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(callback){
                window.setTimeout(callback,1000/60);
            };
})();
var cancelAnimFrame = window.cancelAnimFrame = (function(){
    return  window.cancelAnimationFrame       || 
            window.webkitCancelAnimationFrame || 
            window.mozCancelAnimationFrame    || 
            window.oCancelAnimationFrame      || 
            window.msCancelAnimationFrame     || 
            function(){
                window.clearTimeout.apply(window,arguments);
            }
})();

// Vibration api
navigator.vibrate = (function(){
    return navigator.vibrate 
        || navigator.mozVibrate
        || navigator.webkitVibrate
        || navigator.oVibrate
        || navigator.msVibrate
        || (navigator.notification ? function(l){
			navigator.notification.vibrate(l);
		} : null)
        || new Function();
})();

// Creating a fake console if needed
// It could be better to use a DOM-based console in some cases.
var console = (function(){
    return window.console
            || { 
                log : new Function(),
                debug : new Function(),
                warn : new Function(),
                error : new Function(),
                clear : new Function()
             };
})();

// DOM class to simplify simple DOM operations
var DOM = {
    /**
     * Returns the element matching the specified id.
     */
    get : function(el){
       
        r = (el == document || el == window || el instanceof HTMLElement ? el : document.getElementById(el));
        if(r == null){
            console.log(el);
        }
        
        return r;
    },
    /**
     * Returns the specified attribute of the specified element.
     */
    attr : function(el,attr,value){
        if(value){
            this.get(el).setAttribute(attr,value);
        }else{
            return this.get(el).getAttribute(attr);
        }
    },
    /**
     * Adds an event listener to the specified element.
     */
    on : function(el,evt,handler){
        var split = evt.split(' ');
        for(var i in split){
            this.get(el).addEventListener(split[i],handler,false);
        }
    },
    /**
     * Removes the specified event handler.
     */
    un : function(el,evt,handler){
        var split = evt.split(' ');
        for(var i in split){
            this.get(el).removeEventListener(split[i],handler,false);
        }
    },
    /**
     * Shows the specified element.
     */
    show : function(el){
        this.get(el).style.display = 'block';
    },
    /**
     * Hides the specified element.
     */
    hide : function(el){
        this.get(el).style.display = 'none';
    },
    /**
     * Gets the element's position on the document.
     */
    offset : function(el) {
        el = this.get(el);
        
        return {
            x : el.clientLeft + window.scrollLeft,
            y : el.clientTop + window.scrollTop
        }
        
        var pos = {x:0,y:0};
        do {
            pos.x += el.offsetLeft || 0;
            pos.y += el.offsetTop || 0;
        } while ((el = el.parentNode) !== null);        
        return pos;
    },
    /**
     * Returns an array of elements matching the query.
     */
    query : function(query){
        if(!document.querySelectorAll)
            return null;
            
        var q = document.querySelectorAll(query);
        return q;
    },
    /**
     * Returns the element returned by the query.
     */
    queryOne : function(query){
        if(!document.querySelector)
            return null;
            
        var q = document.querySelector(query);
        return q;
    },
    /**
     * Creates an element of the specified type.
     */
    create : function(type){
        return document.createElement(type);
    },
    /**
     * Gets the position relative to the given element for the given 
     * coordinates.
     */
    positionRelativeTo : function(element,clientX,clientY){
        var offset = DOM.offset(element);
        return {
            x : clientX - offset.x,
            y : clientY - offset.y
        }
    },
    /**
     * Makes the specified element fit screen size.
     * Once the window is resized, you will need to call this function
     * again.
     */
    fitScreen : function(element,ratio){
        var clientRatio = window.innerWidth / window.innerHeight;
        
        var width, height;
        if(clientRatio <= ratio){
            width = window.innerWidth;
            height = width / ratio;
        }else{
            height = window.innerHeight;
            width = height * ratio;
        }
        
        element = DOM.get(element);
        element.style.width = width + 'px';
        element.style.height = height + 'px';
        
        // Returning the element's size
        return {
            width : width,
            height : height
        };
    },
    /**
     * Saving a canvas state in an off-screen canvas.
     */
    saveCanvas : function(element){
        var src = this.get(element);
        var can = this.create('canvas');
        can.width = src.width;
        can.height = src.height;
        
        var c = can.getContext('2d');
        c.drawImage(src,0,0);
        return can;
    },
    /**
     * Fades the element in
     */
    fadeIn : function(element,duration,callback){
        element = this.get(element);
        duration = duration || 1000;
        
        this.show(element); // in case it was hidden
        element.style.opacity = 0;
        Util.interpolate(element.style,{opacity:1},duration,callback);
    },
    /**
     * Fades the element out
     */
    fadeOut : function(element,duration,callback){
        element = this.get(element);
        duration = duration || 1000;
        
        this.show(element); // in case it was hidden
        element.style.opacity = 1;
        Util.interpolate(element.style,{opacity:0},duration,function(){
            DOM.hide(element);
            if(callback)
                callback();
        });
    },
    /**
     * Shows a message to the user
     */
    notify : function(htmlMessage,duration,container){
        container = container ? this.get(container) : document.body;
        
        this.notification = this.notification || (function(){
            var block = DOM.create('div');
            container.appendChild(block);
            DOM.applyStyle(block,{
                zIndex : 999999,
                position : 'absolute',
                bottom : '10px',
                width : '100%',
                textAlign : 'center'
            });
            
            var message = DOM.create('span');
            block.appendChild(message);
            DOM.applyStyle(message,{
                backgroundColor :'rgba(0,0,0,0.7)',
                border : '1px solid white',
                borderRadius : '3px',
                margin : 'auto',
                color : 'white',
                padding : '2px',
                paddingLeft : '10px',
                paddingRight : '10px',
                width : '50%',
                fontSize : '0.7em',
                boxShadow : '0px 0px 2px black'
            });
            
            return {
                block : block,
                message : message,
                queue : [],
                add : function(message,duration){
                    this.queue.push({
                        message : message,
                        duration : duration
                    });
                    
                    if(this.queue.length == 1){
                        this.applyOne();
                    }
                },
                applyOne : function(){
                    var notif = this.queue[0];
                    
                    this.message.innerHTML = notif.message;
                    
                    DOM.fadeIn(this.block,500);
                    setTimeout(function(){
                        DOM.fadeOut(DOM.notification.block,500,function(){
                            DOM.notification.queue.shift();
                            if(DOM.notification.queue.length > 0){
                                DOM.notification.applyOne();
                            }
                        });
                    },notif.duration + 500);
                }
            }
        })();
        
        duration = duration || 3000;
        
        this.notification.add(htmlMessage,duration);
    },
    /**
     * Applying a series of CSS properties
     */
    applyStyle : function(element,style){
        element = this.get(element);
        for(var i in style){
            element.style[i] = style[i];
        }
    },
    /**
     * Populates an array with the DOM elements.
     * elements must have a name => elementID structure.
     */
    populate : function(elements){
        var res = {};
        for(var i in elements){
            res[i] = DOM.get(elements[i]);
            if(!res[i]) console.log('Element #'+elements[i]+' not found');
        }
        return res;
    }
}

// Utility class
var Util = {
    /**
     * Preloads a set of images.
     */
    preload : function(images,callbackProgress,callbackEnd,callbackError){
        var loadOne = function(){
            if(remaining.length == 0){
                end(loaded);
            }else{                
                // Take one image from the array of remaining images.
                var img = new Image();
                img.onerror = function(){
                    console.log('Couldn\'t load ' + src);
                    error(src);
                }
                img.onload = function(){
                    if(this.complete){
                        progress(this,1 - remaining.length / nbImages);
                        setTimeout(loadOne,document.location.search.indexOf('fakelag') >= 0 ? 1000:1); // loading the next one
                    }
                }
                
                var src = remaining.pop();
                img.src = src;
                loaded[src] = img; // we need the unmodified src attribute
            }
        }
        
        var remaining = images.slice(0);
        var end = callbackEnd || new Function();
        var progress = callbackProgress || new Function();
        var error = callbackError || new Function();
        var nbImages = remaining.length;
        var loaded = {}; // hashmap src => image
        
        setTimeout(loadOne,1); // Loading the first one asynchronously
    },
    /**
     * Generates a random floatting point number between min and max.
     */
    rand : function(min,max){
        return Math.random() * (max - min) + min;
    },
    /**
     * Randomly picking a value from the parameters.
     */
    randomPick : function(){
        var i = parseInt(Util.rand(0,arguments.length));
        return arguments[i];
    },
    /**
     * Returns n if between min and max, min if lower than min, max if higher than max.
     */
    limit : function(n,min,max){
        if(n < min)
            return min;
        else if(n > max)
            return max;
        else
            return n;
    },
    /**
     * Getting the sign of a number.
     */
    sign : function(n){
        if(n > 0)         return 1;
        else if(n == 0)    return 0;
        else             return -1;
    },
    /**
     * Setting and getting cookies
     */
    cookie : {
        /**
         * Setting a cookie with the specified key with the specified TTL
         */
        set : function(name,value,ttl){
            // By default, a cookie is available for one year
            if(ttl == undefined)
                ttl = 1000 * 3600 * 24 * 365;
            
            document.cookie = name + "=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT";
            
            var expires = new Date();
            expires.setTime(expires.getTime() + ttl);
            
            document.cookie = [
                name+'='+value+'; ',
                'expires='+expires.toGMTString() +'; ',
                'path=/'
            ].join('');
        },
        /**
         * Getting the value of a cookie with the specified key.
         */
        get : function(name){
            var cookie = document.cookie.split('; ');
            for(var i in cookie){
                var spl = cookie[i].split('=');
                if(spl.length == 2 && spl[0] == name){
                    return spl[1];
                }
            }
            return undefined;
        }
    },
    /**
     * Storage : uses localStorage if supported, or cookies otherwise.
     */
    storage : 
        // TODO Clay.io
        window.localStorage ? {
            getItem : function(item){
				try{
                	return window.localStorage.getItem(item);
				}catch(e){
					return null;
				}
            },
            setItem : function(item,value){
                try{
                    window.localStorage.setItem(item,value);
                }catch(e){
                    console.log('Local storage issue: ' + e);
                }
            } } : {
            getItem : function(item){
                return Util.cookie.get(item);
            },
            setItem : function(item,value){
                Util.cookie.set(item,value);
            }
        },
    /**
     * Copy of an object into another (adds missing fields).
     */
    merge : function(template,object){
        if(!object){
            return template;
        }
        
        for(var i in template){
            if(!(i in object)){
                object[i] = template[i];
            }else{
                // If it's an object, we go deeper
                if(typeof(template[i]) == 'object' && !(object[i] instanceof Array)){
                    object[i] = arguments.callee.call(this,template[i],object[i]);
                }
            }
        }
        
        return object;
    },
    copyObject : function(obj){
		var res = {};
		for(var i in obj){
			res[i] = obj[i];
		}
		return res;
	},
    /**
     * Returns true if the client is using a touchscreen.
     */
    isTouchScreen : function(){
		var bool =  (
			'orientation' in window
			|| 'orientation' in window.screen
			|| 'mozOrientation' in window.screen
            || 'ontouchstart' in window
            || window.DocumentTouch && document instanceof DocumentTouch
            || 'ontouchstart' in document.documentElement 
        );
        if(bool){
			bool = bool && Detect.isMobile();
		}
		return bool || window.location.search.indexOf('touch') >= 0;
    },
    /**
     * Calculating the distance between two points.
     */
    distance : function(x1,y1,x2,y2){
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    },
    /**
     * Removing duplicate elements from an array
     */
    arrayUnique : function(a){
        for(var i = 0 ; i < a.length ; i++){
            var j = i+1;
            while(a[j]){
                if(a[i] == a[j]){
                    a.splice(j,1);
                }else{
                    j++;
                }
            }
        }
    },
    /**
     * Converts URL parameters to a hashmap
     */
    analyzeParameters : function(){
        var res = {};
        var tmp;
        var params = window.location.search.substr(1).split('&'); // Removes the "?"
        for(var i = 0 ; i < params.length ; i++){
            tmp = params[i].split('=');
            res[tmp[0]] = tmp[1];
        }
        return res;
    },
    interpolate : function(obj,props,duration,callback){
        // Getting the state before the interpolation
        var before = {};
        for(var i in props){
            before[i] = parseFloat(obj[i]);
        }
        
        var tStart = Date.now();
        (function(){
            var now = Date.now();
            var prct = Math.min(1,(now - tStart) / duration);
            
            // Updating each property
            for(var i in props){
                obj[i] = prct * (props[i] - before[i]) + before[i];
            }
            
            if(prct < 1){
                requestAnimFrame(arguments.callee);
            }else{
                if(callback){
                    callback.call(obj);
                }
            }
        })();
    },
    addZeros : function(n,length){
        var res = n.toString();
        while(res.length < length)
            res = '0' + res;
        return res;
    },
    formatDate : function(format,date,options){
        date = date || new Date();
        options = Util.merge({
            months : ['January','February','March','April','May','June','August','September','October','November','December']
        },options);
   
        var res = '';
        var formatNext = false;
        for(var i = 0 ; i < format.length ; i++){
            if(format.charAt(i) == '%'){
                formatNext = true;
            }else if(formatNext){
                formatNext = false;
                switch(format.charAt(i)){
                    // TODO add more formats
                    case '%': res += '%'; break;
                    case 'M': res += options.months[date.getMonth()]; break;
                    case 'd': res += date.getDate(); break;
                    case 'Y': res += date.getFullYear(); break;
                    case 'm': res += date.getMonth(); break;
                }
            }else{
                res += format.charAt(i);
            }
        }
        return res;
    },
    /**
     * Returns the key of an element in an object.
     */
    keyOf : function(object,element){
        for(var i in object){
            if(object[i] == element){
                return i;
            }
        }
        return null;
    }
};

// AJAX-related functions
var Ajax = {
    /**
     * Sends an AJAX request.
     */
    send : function(url,method,params,success,fail){
        // Creating the right object.
        var xhr;
        if(window.XMLHttpRequest){ // Firefox et autres
            xhr = new XMLHttpRequest();
        }else if(window.ActiveXObject) {// Internet Explorer
            try{
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }catch (e){
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }else { // Not supported by the browser
            console.log('AJAX not supported by your browser.');
            return false;
        }
        
        // Creating default parameters if needed.
        success = success || new Function();
        fail = fail || new Function();
        method = method.toUpperCase();
        params = params || {};
        
        // Creating parameters string
        var paramsArray = [];
        for(var i in params){
            paramsArray.push(i + '=' + params[i]);
        }
        var paramsString = paramsArray.join('&');
        
        if(method == 'GET'){
            url += '?' + paramsString;
        }
        
        xhr.open(method,url, true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState != 4)    
                return;
                
            if(xhr.status < 200 || xhr.status >= 300){
                fail(xhr.status,xhr.responseText);
            }else{
                success(xhr.status,xhr.responseText);
            }
        };
        
        if(method == 'POST'){
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhr.send(paramsString);
        }else{
            xhr.send(null);
        }
    }
};

// ArrayManager : allows you not to copy arrays every time you make a 
// loop on it. This is useful when working on large arrays when only 
// a few elements will be removed at the same time (or none).
// TODO : add a function to add new elements to the arrays.
var ArrayManager = {
    // Arrays of elements to remove. The reason why I use two arrays 
    // instead of a simple array with objects is to avoid to instantiate
    // too many objects, which might be a bit slower. It shouldn't make 
    // such a big difference though.
    elements : [],
    arrays : [],
    /**
     * Set an element to be removed at the next call of flush()
     * Element can either be the index or the actual element to be removed.
     */
    remove : function(array,element){
        // Adding the description of the removal
        this.arrays.push(array);
        this.elements.push(element);
    },
    /**
     * Making all the removing operations.
     */
    flush : function(){
        // The loop could actually be optimized by using while (TODO)
        var ind;
        for(var i in this.arrays){
            ind = this.arrays[i].indexOf(this.elements[i]);
            if(ind >= 0){
                this.arrays[i].splice(ind,1);
            }
        }
        this.arrays = [];
        this.elements = [];
    },
    /**
     * Cancels all removing operations.
     */
    init : function(){
        this.arrays = [];
        this.elements = [];
    }
};

// Encoding tools : client side.
var Encoder = {
    buildString : function(tab){
        var s = "",content;
        for(var i in tab){
            content = tab[i].toString();
            
            // Replacing illegal characters (which could lead to parsing issues)
            content = content.replace(/=/g,' ');
            content = content.replace(/\|/g,' ');
            
            s += i + '=' + content + '|'; 
        }
        return s;
    },
    encode : function(hash){
        var str = Encoder.buildString(hash);
        var key = ~~Util.rand(1,255);
        var encodedString = Encoder.encodeString(str,key);
        return encodeURIComponent(encodedString);
    },
    encodeString : function(s,cle){
        // Deuxième étape : on crypte ces paramètres
        var enc = "",c;
        for(var i = 0 ; i < s.length; i++){
            c = s.charCodeAt(i);
            enc += String.fromCharCode((c + cle)%256);
        }
                    
        // Et on ajoute la clé en début de chaine pour permettre au script
        // à l'autre bout de la retrouver.
        enc = String.fromCharCode(cle) + enc;
        
        return enc;
    }
};

var Detect = {
	agent : navigator.userAgent.toLowerCase(),
	isMobile : function(){
		return this.isAndroid() 
			|| this.isFirefoxOS()
			|| this.isWindowsMobile()
			|| this.isIOS();
	},
	isAndroid : function(){
		return this.agent.indexOf('android') >= 0;
	},
	isFirefoxOS : function(){
		return !this.isAndroid()
			&& this.agent.indexOf('firefox') >= 0
			&& this.agent.indexOf('mobile') >= 0;
	},
	isIOS : function(){
		return this.agent.indexOf('ios') >= 0 
			|| this.agent.indexOf('ipod') >= 0
			|| this.agent.indexOf('ipad') >= 0
			|| this.agent.indexOf('iphone') >= 0;
	},
	isWindowsMobile : function(){
		return this.agent.indexOf('windows') >= 0 
			&& this.agent.indexOf('mobile') >= 0
			|| this.agent.indexOf('iemobile') >= 0;
	},
	isTizen : function(){
		return this.agent.indexOf('tizen') >= 0;
	}
}

/**
 * Makes necessary operations with resources, based on the R object.
 */
var resourceManager = {
    processImages : function(images){
        // Creating an off-screen canvas to create patterns
        var canvas = DOM.create('canvas');
        var c = canvas.getContext('2d');
        
        resources.folder = resources.folder || '';
        
        // Adding simple images
        R.image = R.image || {};
        if(resources.image){
            for(var i in resources.image){
                R.image[i] = images[resources.folder + resources.image[i]];
            }
        }
        
        // Creating patterns
        R.pattern = R.pattern || {};
        if(resources.pattern){
            for(var i in resources.pattern){
                R.pattern[i] = c.createPattern(images[resources.folder + resources.pattern[i]],'repeat');
            }
        }
        
        // Creating sprites
        R.sprite = R.sprite || {};
        if(resources.sprite){
            for(var i in resources.sprite){
                R.sprite[i] = this.createSprite(images[resources.folder + resources.sprite[i].sheet],resources.sprite[i]);
                if(resources.sprite[i].pattern){
                    R.pattern[i] = c.createPattern(R.sprite[i],'repeat');
                }
            }
        }
        
        // Storing animations
        R.animation = R.animation || {};
        if(resources.animation){
            for(var i in resources.animation){
                R.animation[i] = [];
                for(var j = 0 ; j < resources.animation[i].length ; j++){
                    if(R.sprite[resources.animation[i][j]]){
                        R.animation[i].push(R.sprite[resources.animation[i][j]]);
                    }else{
                        console.log('Error for animation ' + i + ': sprite "' + resources.animation[i][j] + '" not found');
                    }
                }
            }
        }
        
        // Copying raw elements
        R.raw = R.raw || {};
        if(resources.raw){
            for(var i in resources.raw){
                R.raw[i] = resources.raw[i] instanceof Function ? resources.raw[i]() : resources.raw[i];
            }
        }
        
        // Then, we just copy everything into R
        R.string = R.string || {};
        if(resources.string){
            // Finding the language to use
            var lang = this.getLanguage(resources.string); // Picking the right language
            
            if(!resources.string[lang]){
                var pp = function(obj){
                    if(typeof obj == 'string'){
                        return ;
                    }else{
                        var o = {};
                        for(var i in obj){
                            if(typeof obj[i] == 'string'){
                                o[i] = '{' + i + '}';
                            }else{
                                o[i] = pp(obj[i]);
                            }
                        }
                        return o;
                    }
                }
                resources.string[lang] = pp(resources.string.en);
            }
            for(var i in resources.string[lang]){
                R.string[i] = resources.string[lang][i];
            }
            
            // Updating DOM elements
            for(var i in R.string){
                if(i.charAt(0) == '$'){
                    try{
                        DOM.get(i.substring(1)).innerHTML = R.string[i];
                    }catch(e){
                        console.log('DOM element ' + i + ' does not exist');
                    }
                }
            }
        }
        
        
        // Clearing some memory
        resources = null;
        resourceManager = null;
    },
    createSprite : function(image,details){
        var canvas = DOM.create('canvas');
        var c = canvas.getContext('2d');
        
        canvas.width = details.width;
        canvas.height = details.height;
        
        c.drawImage(image,details.x,details.y,details.width,details.height,0,0,details.width,details.height);
        
        return canvas;
    },
    getNecessaryImages : function(){
        var res = [];
        for(var i in resources.image){
            res.push(resources.folder + resources.image[i]);
        }
        for(var i in resources.pattern){
            res.push(resources.folder + resources.pattern[i]);
        }
        for(var i in resources.sprite){
            res.push(resources.folder + resources.sprite[i].sheet);
        }
        
        // On enlève les images en double
        Util.arrayUnique(res);
        
        return res;
    },
    getLanguage : function(languages){
        var lang = null;
        var browser_language = null;
        
        var params = Util.analyzeParameters();
        if(params.lang){
            return params.lang;
        }
        
        // Android : user agent language
        if(navigator && navigator.userAgent && (browser_language = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))){
            browser_language = browser_language[1];
        }
        
        // Otherwise, we try to take the right variable
        if(!browser_language && navigator) {
            if(navigator.language){
                browser_language = navigator.language;
            }else if (navigator.browserLanguage){
                browser_language = navigator.browserLanguage;
            }else if (navigator.systemLanguage){
                browser_language = navigator.systemLanguage;
            }else if (navigator.userLanguage){
                browser_language = navigator.userLanguage;
            }
            browser_language = browser_language.substr(0, 2);
        }
        
        // Finally, we try to choose the best language from the parameter
        for(var i in languages){
            if(browser_language.indexOf(i) >= 0){
                lang = i;
                break;
            }else if(!lang){
                // If there is no language selected, we just take the first one.
                lang = i; 
            }
        }
        
        return lang;
    }
};

/**
 * Cyclemanager : handles frame
 */
var cycleManager = {
    init : function(cycle,fpsMin){
        this.pause = false;
        this.oncycle = cycle;
        
        var hidden, visibilityChange; 
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
          hidden = "hidden";
          visibilityChange = "visibilitychange";
        } else if (typeof document.mozHidden !== "undefined") {
          hidden = "mozHidden";
          visibilityChange = "mozvisibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
          hidden = "msHidden";
          visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
          hidden = "webkitHidden";
          visibilityChange = "webkitvisibilitychange";
        }
        
        // Gestion du focus
        this.focus = true;
        
        if(!hidden){
            DOM.on(window,'focus',function(){
                cycleManager.focus = true;
            });
            DOM.on(window,'blur',function(){
                cycleManager.focus = false;
            });
        }else{
            DOM.on(document,visibilityChange,function(){
                cycleManager.focus = !document[hidden];
            });
        }
        
        this.lastCycle = Date.now();
        this.fpsMin = fpsMin || 10;
        this.framesUntilNextStat = 0;
        this.lastStat = 0;
        this.fakeLag = document.location.search.indexOf('fakelag') >= 0;
        this.fps = 0;
        this.requestId = null;
        
        this.init = null;
        
        this.resume();
        
		if(window.kik && kik.browser && kik.browser.on){
			kik.browser.on('background', function () {
				cycleManager.stop();
			});
			kik.browser.on('foreground', function () {
				cycleManager.resume();
			});
		}
    },
    stop : function(){
		this.pause = true;
		cancelAnimFrame(this.requestId);
	},
	resume : function(){
		this.pause = false;
		
		// Avoid double cycles
		cancelAnimFrame(this.requestId);
		
        (function(){
            cycleManager.cycle();
			cycleManager.requestId = requestAnimFrame(arguments.callee);
        })();
	},
    cycle : function(){
        var now = Date.now();
        var elapsed = Math.min((now - this.lastCycle) / 1000,1/this.fpsMin);
        this.lastCycle = now;
        
        // Triggering cycle only if not paused and with focus
        if(!this.pause){
            //try{
                this.oncycle(elapsed);
            //}catch(e){
                //console.log('Error: ' + e + ' - ');
                //throw e;
                //e.printStack();
            //}
            
            // Calculating FPS
            this.framesUntilNextStat--;
            if(this.framesUntilNextStat <= 0){
                this.framesUntilNextStat = 60; // Scheduling the next statistics
                this.fps = ~~(60 * 1000 / (Date.now() - this.lastStat + elapsed));
                this.lastStat = Date.now();
            }
        }
    }
};

/**
 * Resizer : handles screen size for a specific element.
 */
var resizer = {
    init : function(width,height,element,desktop){
        // Storing parameters
        this.enabled = Util.isTouchScreen() || desktop;
        this.targetWidth = width;
        this.targetHeight = height;
        this.element = element;
        
        // Storing dimensions and scale
        this.dimensions = {
            width : width,
            height : height
        };
        this.scale = 1;
        
        // No need to resize on a desktop computer
        if(Util.isTouchScreen() || desktop){
            DOM.on(window,'resize orientationchange',function(){
                resizer.resize();
            });
            this.resize();
            this.toResize = null;
        }
        
        // Just freeing some memory
        this.init = null;
    },
    resize : function(){
        // If a resizing is already planned, no need to do it another time
        if(!this.toResize && this.enabled){        
            // Scheduling a resizing with a short delay
            this.toResize = setTimeout(function(){
                if(!resizer.enabled) return;
                
                window.scrollTo(0,1); // Skipping the address bar
                
                resizer.toResize = null;
                resizer.dimensions = DOM.fitScreen(resizer.element,resizer.targetWidth / resizer.targetHeight);
                resizer.scale = (resizer.dimensions.height / resizer.targetHeight);
            },1000);
        }
    }
};

// Managing cache manifest changes
/*if(window.applicationCache){
    window.applicationCache.addEventListener('updateready',function(e){
        if(window.applicationCache.status == window.applicationCache.UPDATEREADY){
            // Browser downloaded a new app cache.
            // Swap it in and reload the page to get the new hotness.
            window.applicationCache.swapCache();
            if(confirm('A new version of the game is available. Load it?')){
                window.location.reload();
            }
        }
    },false);
}*/

// If using cordova, we hide the splashscreen, and display a message.
if(window.cordova){
    document.addEventListener("deviceready", function(){
        cordova.exec(null, null, "SplashScreen", "hide", []);
        DOM.notify('More HTML5 games available at <a style="color:white" href="'+GameParams.moregamesurl+'">'+GameParams.moregamesurl+'</a>',3000);
    }, false);
}

/**
 * bind() polyfill
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 */
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
/*
DOM.on(document,'touchstart touchmove touchend touchcancel',function(){
	Util.isTouchScreen = function(){
		return true;
	}
});
DOM.on(document,'mousemove',function(){
	// Mouse down/up might be emulated, therefore that detection wouldn't work
	Util.isTouchScreen = function(){
		return false;
	}
});
*/

window.originalOpen = window.open;

Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
}

window.noop = new Function();
function extend(subClass,superClass){
	if(!subClass.extendsClasses || !subClass.extendsClasses[superClass]){
		for(var i in superClass.prototype){
			if(!subClass.prototype[i]){
				subClass.prototype[i] = superClass.prototype[i];
			}
		}
		
		subClass.extendsClasses = subClass.extendsClasses || {};
		subClass.extendsClasses[superClass] = true;
	}
};

function extendPrototype(superClasses,proto){
    superClasses = superClasses instanceof Array ? superClasses : [superClasses];
    //superClasses = [superClasses];
    
	var subProto = {};
    for(var i in superClasses){
        for(var j in superClasses[i].prototype){
            subProto[j] = superClasses[i].prototype[j];
        }
    }
    
    if(proto){
        for(var i in proto){
            subProto[i] = proto[i];
        }
    }
	return subProto;
};

function quickImplementation(object,prototype){
    for(var i in prototype){
        object[i] = prototype[i];
    }
    return object;
};
function ResourceLoader(settings){
	this.settings = settings;
	
	this.appCache = window.applicationCache;
	
	this.finished = false;
	
	this.message = null;
}

ResourceLoader.prototype.load = function(end,canvas){
	this.endCallback = end;
	this.canvasOutput = canvas;
	
	if(!this.appCache || this.appCache.status === this.appCache.UNCACHED){
		this.loadResources();
	}else{
		this.loadCache();
	}
}

ResourceLoader.prototype.loadCache = function(){
	console.log('cache');
	this.message = 'Updating...';
	
	this.appCache.addEventListener('checking', this.checkingCache.bind(this), false);
				
	this.appCache.addEventListener('noupdate', this.loadResources.bind(this), false);
	this.appCache.addEventListener('obsolete', this.loadResources.bind(this), false);
	this.appCache.addEventListener('error', this.loadResources.bind(this), false);
	this.appCache.addEventListener('cached', this.loadResources.bind(this), false);
	
	this.appCache.addEventListener('downloading', this.updatingCache.bind(this), false);
	this.appCache.addEventListener('progress', this.updatingCacheProgress.bind(this), false);
	this.appCache.addEventListener('updateready', this.updatingCacheReady.bind(this), false);
	
	if (this.appCache.status === this.appCache.IDLE) {
		try {
			this.appCache.update();
		} catch (e) {
			this.loadResources();
		}
	}
};

ResourceLoader.prototype.checkingCache = function(){
	if(!this.finished){
		this.showProgress(this.canvasOutput,0);
	}
}

ResourceLoader.prototype.updatingCache = function(e){
	if(this.canvasOutput && !this.finished){
		this.showProgress(this.canvasOutput,0);
	}
}

ResourceLoader.prototype.updatingCacheProgress = function(e){
	if(this.canvasOutput && !this.finished){
		this.showProgress(this.canvasOutput,(e.loaded / e.total) || 0);
	}
}

ResourceLoader.prototype.updatingCacheReady = function(e){
	if (!this.finished) {
		this.finished = true;
		try {
			this.appCache.swapCache();
		} catch (e) {}
		
		location.reload();
	}
}

/**
 * @param end The function to be called when loading is over.
 */
ResourceLoader.prototype.loadResources = function(){
	this.message = 'Loading assets. Please wait...';
	
	this.R = {};

	// Applying language settings
	this.processLanguage(this.R);
	
	// Getting the images to load and actually load them
	var images = this.getNecessaryImages();
	var loader = this;
	Util.preload(
		images,
		this.resourcesProgress.bind(this),
		this.resourcesLoaded.bind(this),
		this.resourcesError.bind(this)
	);
}

ResourceLoader.prototype.resourcesError = function(imageSrc){
	alert('Could not load ' + imageSrc + ".\nUnable to launch.");
}

ResourceLoader.prototype.resourcesProgress = function(img,progress){
	if(this.canvasOutput && !this.finished){
		this.showProgress(this.canvasOutput,progress);
	}
}

ResourceLoader.prototype.resourcesLoaded = function(loadedImages){
	if(!this.finished){
		this.finished = true;
		
		this.processImages(loadedImages,this.R);
		this.endCallback(this.R);
	}
}

ResourceLoader.prototype.showProgress = function(canvas,progress){
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	// Loading message
	ctx.font = '10px Arial';
	ctx.fillStyle = 'gray';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	
	ctx.fillText(this.message,canvas.width / 2,canvas.height/2 - 20);
	
	// Gray background
	ctx.fillRect(0,canvas.height / 2 - 5,canvas.width,10);
	
	// Progress bar
	ctx.fillStyle = 'white';
	ctx.fillRect(0,canvas.height / 2 - 5,progress * canvas.width,10);
	
	// Progress label
	ctx.fillStyle = 'black';
	ctx.textAlign = 'right';
	ctx.fillText(~~(progress * 100) + '%',progress * canvas.width - 2,canvas.height / 2);
}

ResourceLoader.prototype.createSprite = function(image,details){
	var canvas = document.createElement('canvas');
	var c = canvas.getContext('2d');
	
	canvas.width = details.width;
	canvas.height = details.height;
	
	c.drawImage(image,details.x,details.y,details.width,details.height,0,0,details.width,details.height);
	
	return canvas;
}

ResourceLoader.prototype.getNecessaryImages = function(){
	var res = [];
	for(var i in this.settings.image){
		res.push(this.settings.folder + this.settings.image[i]);
	}
	for(var i in this.settings.pattern){
		res.push(this.settings.folder + this.settings.pattern[i]);
	}
	for(var i in this.settings.sprite){
		res.push(this.settings.folder + this.settings.sprite[i].sheet);
	}
	
	// Removing double images
	Util.arrayUnique(res);
	
	return res;
}

ResourceLoader.prototype.getLanguage = function(languages){
	var lang = null;
	var browser_language = null;
	
	// If a language is specified in the language parameters, we force it.
	var params = Util.analyzeParameters();
	if(params.lang){
		return params.lang;
	}
	
	// Android : user agent language
	if(navigator && navigator.userAgent && (browser_language = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))){
		browser_language = browser_language[1];
	}
	
	// Otherwise, we try to take the right variable
	if(!browser_language && navigator) {
		if(navigator.language){
			browser_language = navigator.language;
		}else if (navigator.browserLanguage){
			browser_language = navigator.browserLanguage;
		}else if (navigator.systemLanguage){
			browser_language = navigator.systemLanguage;
		}else if (navigator.userLanguage){
			browser_language = navigator.userLanguage;
		}
		browser_language = browser_language.substr(0, 2);
	}
	
	// Finally, we try to choose the best language from the parameter
	for(var i in languages){
		if(browser_language.indexOf(i) >= 0){
			lang = i;
			break;
		}else if(!lang){
			// If there is no language selected, we just take the first one.
			lang = i; 
		}
	}
	
	return lang;
};

ResourceLoader.prototype.processImages = function(images,R){
	// Creating an off-screen canvas to create patterns
	var canvas = DOM.create('canvas');
	var c = canvas.getContext('2d');
	
	this.settings.folder = this.settings.folder || '';
	
	// Adding simple images
	R.image = R.image || {};
	if(this.settings.image){
		for(var i in this.settings.image){
			R.image[i] = images[this.settings.folder + this.settings.image[i]];
		}
	}
	
	// Creating patterns
	R.pattern = R.pattern || {};
	if(this.settings.pattern){
		for(var i in this.settings.pattern){
			R.pattern[i] = c.createPattern(images[this.settings.folder + this.settings.pattern[i]],'repeat');
			R.pattern[i].width = images[this.settings.folder + this.settings.pattern[i]].width;
			R.pattern[i].height = images[this.settings.folder + this.settings.pattern[i]].height;
		}
	}
	
	// Creating sprites
	R.sprite = R.sprite || {};
	if(this.settings.sprite){
		for(var i in this.settings.sprite){
			R.sprite[i] = this.createSprite(images[this.settings.folder + this.settings.sprite[i].sheet],this.settings.sprite[i]);
			if(this.settings.sprite[i].pattern){
				R.pattern[i] = c.createPattern(R.sprite[i],'repeat');
				R.pattern[i].width = R.sprite[i].width;
				R.pattern[i].height = R.sprite[i].height;
			}
		}
	}
	
	// Storing animations
	R.animation = R.animation || {};
	if(this.settings.animation){
		for(var i in this.settings.animation){
			R.animation[i] = [];
			for(var j = 0 ; j < this.settings.animation[i].length ; j++){
				if(R.sprite[this.settings.animation[i][j]]){
					R.animation[i].push(R.sprite[this.settings.animation[i][j]]);
				}else{
					console.log('Error for animation ' + i + ': sprite "' + this.settings.animation[i][j] + '" not found');
				}
			}
		}
	}
	
	// Copying raw elements
	R.raw = R.raw || {};
	if(this.settings.raw){
		for(var i in this.settings.raw){
			R.raw[i] = this.settings.raw[i] instanceof Function ? this.settings.raw[i]() : this.settings.raw[i];
		}
	}
};

ResourceLoader.prototype.processLanguage = function(R){
	// Then, we just copy everything into R
	R.string = R.string || {};
	if(this.settings.string){
		// Finding the language to use
		this.language = this.getLanguage(this.settings.string); // Picking the right language
		
		if(!this.settings.string[this.language]){
			var pp = function(obj){
				if(typeof obj == 'string'){
					return ;
				}else{
					var o = {};
					for(var i in obj){
						if(typeof obj[i] == 'string'){
							o[i] = '{' + i + '}';
						}else{
							o[i] = pp(obj[i]);
						}
					}
					return o;
				}
			}
			this.settings.string[this.language] = pp(this.settings.string.en);
		}
		for(var i in this.settings.string[this.language]){
			R.string[i] = this.settings.string[this.language][i];
		}
		
		// Updating DOM elements
		for(var i in R.string){
			if(i.charAt(0) == '$'){
				try{
					DOM.get(i.substring(1)).innerHTML = R.string[i];
				}catch(e){
					console.log('DOM element ' + i + ' does not exist');
				}
			}
		}
	}
};

function Resizer(options){
	this.delay = options.delay || 0;
	this.element = options.element || null;
	this.baseWidth = options.baseWidth;
	this.baseHeight = options.baseHeight;
	this.onResize = options.onResize;
	this.enabled = true;
	this.scale = 1;

	this.resizeTimeout = null;
};

Resizer.prototype = {
	needsResize : function(maxWidth,maxHeight){
		clearTimeout(this.resizeTimeout);

		if(this.enabled){
			this.maxWidth = maxWidth;
			this.maxHeight = maxHeight;

			this.resizeTimeout = setTimeout(this.resize.bind(this),this.delay);
		}
	},
	resize : function(){
		this.resizeTimeout = null;

		var dimensions = this.getFittingDimensions(this.maxWidth,this.maxHeight);
		this.element.style.width = dimensions.width + 'px';
		this.element.style.height = dimensions.height + 'px';

		if(this.onResize){
			this.onResize.call(this);
		}
	},
	scaleX : function(){
		var rect = this.element.getBoundingClientRect();
		return (rect.width / this.baseWidth) || 1;
	},
	scaleY : function(){
		var rect = this.element.getBoundingClientRect();
		return (rect.height / this.baseHeight) || 1;
	},
	getFittingDimensions : function(maxWidth,maxHeight){
		var availableRatio = maxWidth / maxHeight;
		var baseRatio = this.baseWidth / this.baseHeight;
		var ratioDifference = Math.abs(availableRatio - baseRatio);

        var width, height;
		if(ratioDifference <= 0.17){
			width = maxWidth;
			height = maxHeight;
		}else if(availableRatio <= baseRatio){
            width = maxWidth;
            height = width / baseRatio;
        }else{
            height = maxHeight;
            width = height * baseRatio;
        }

        // Returning the element's size
        return {
            width : width,
            height : height
        };
	}
};

window.googletag = window.googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
var gads = document.createElement('script');
gads.async = true;
gads.type = 'text/javascript';
var useSSL = 'https:' == document.location.protocol;
gads.src = (useSSL ? 'https:' : 'http:') + 
'//www.googletagservices.com/tag/js/gpt.js';
var node = document.getElementsByTagName('script')[0];
node.parentNode.insertBefore(gads, node);
})();
/*
  Easing Equations v1.5
  May 1, 2003
  (c) 2003 Robert Penner, all rights reserved. 
  This work may not be redistributed in any form--original,
  modified, or derivative--without express prior permission of the author.
  This work is subject to the terms in http://www.robertpenner.com/terms_of_use.html.
  
  These tweening functions provide different flavors of 
  math-based motion under a consistent API. 
  
  Types of easing:
  
	  Linear
	  Quadratic
	  Cubic
	  Quartic
	  Quintic
	  Sinusoidal
	  Exponential
	  Circular
	  Elastic
	  Back
	  Bounce

  Changes:
  1.5 - added bounce easing
  1.4 - added elastic and back easing
  1.3 - tweaked the exponential easing functions to make endpoints exact
  1.2 - inline optimizations (changing t and multiplying in one step)--thanks to Tatsuo Kato for the idea
  
  Discussed in Chapter 7 of 
  Robert Penner's Programming Macromedia Flash MX
  (including graphs of the easing equations)
  
  http://www.robertpenner.com/profmx
  http://www.amazon.com/exec/obidos/ASIN/0072223561/robertpennerc-20
*/


// simple linear tweening - no easing
// t: current time, b: beginning value, c: change in value, d: duration
Math.linearTween = function (t, b, c, d) {
	return c*t/d + b;
};


 ///////////// QUADRATIC EASING: t^2 ///////////////////

// quadratic easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be in frames or seconds/milliseconds
Math.easeInQuad = function (t, b, c, d) {
	return c*(t/=d)*t + b;
};

// quadratic easing out - decelerating to zero velocity
Math.easeOutQuad = function (t, b, c, d) {
	return -c *(t/=d)*(t-2) + b;
};

// quadratic easing in/out - acceleration until halfway, then deceleration
Math.easeInOutQuad = function (t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t + b;
	return -c/2 * ((--t)*(t-2) - 1) + b;
};


 ///////////// CUBIC EASING: t^3 ///////////////////////

// cubic easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be frames or seconds/milliseconds
Math.easeInCubic = function (t, b, c, d) {
	return c*(t/=d)*t*t + b;
};

// cubic easing out - decelerating to zero velocity
Math.easeOutCubic = function (t, b, c, d) {
	return c*((t=t/d-1)*t*t + 1) + b;
};

// cubic easing in/out - acceleration until halfway, then deceleration
Math.easeInOutCubic = function (t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t*t + b;
	return c/2*((t-=2)*t*t + 2) + b;
};


 ///////////// QUARTIC EASING: t^4 /////////////////////

// quartic easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be frames or seconds/milliseconds
Math.easeInQuart = function (t, b, c, d) {
	return c*(t/=d)*t*t*t + b;
};

// quartic easing out - decelerating to zero velocity
Math.easeOutQuart = function (t, b, c, d) {
	return -c * ((t=t/d-1)*t*t*t - 1) + b;
};

// quartic easing in/out - acceleration until halfway, then deceleration
Math.easeInOutQuart = function (t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
	return -c/2 * ((t-=2)*t*t*t - 2) + b;
};


 ///////////// QUINTIC EASING: t^5  ////////////////////

// quintic easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be frames or seconds/milliseconds
Math.easeInQuint = function (t, b, c, d) {
	return c*(t/=d)*t*t*t*t + b;
};

// quintic easing out - decelerating to zero velocity
Math.easeOutQuint = function (t, b, c, d) {
	return c*((t=t/d-1)*t*t*t*t + 1) + b;
};

// quintic easing in/out - acceleration until halfway, then deceleration
Math.easeInOutQuint = function (t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
	return c/2*((t-=2)*t*t*t*t + 2) + b;
};



 ///////////// SINUSOIDAL EASING: sin(t) ///////////////

// sinusoidal easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in position, d: duration
Math.easeInSine = function (t, b, c, d) {
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
};

// sinusoidal easing out - decelerating to zero velocity
Math.easeOutSine = function (t, b, c, d) {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
};

// sinusoidal easing in/out - accelerating until halfway, then decelerating
Math.easeInOutSine = function (t, b, c, d) {
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};


 ///////////// EXPONENTIAL EASING: 2^t /////////////////

// exponential easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in position, d: duration
Math.easeInExpo = function (t, b, c, d) {
	return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
};

// exponential easing out - decelerating to zero velocity
Math.easeOutExpo = function (t, b, c, d) {
	return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
};

// exponential easing in/out - accelerating until halfway, then decelerating
Math.easeInOutExpo = function (t, b, c, d) {
	if (t==0) return b;
	if (t==d) return b+c;
	if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
	return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
};


 /////////// CIRCULAR EASING: sqrt(1-t^2) //////////////

// circular easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in position, d: duration
Math.easeInCirc = function (t, b, c, d) {
	return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
};

// circular easing out - decelerating to zero velocity
Math.easeOutCirc = function (t, b, c, d) {
	return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
};

// circular easing in/out - acceleration until halfway, then deceleration
Math.easeInOutCirc = function (t, b, c, d) {
	if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
};


 /////////// ELASTIC EASING: exponentially decaying sine wave  //////////////

// t: current time, b: beginning value, c: change in value, d: duration, a: amplitude (optional), p: period (optional)
// t and d can be in frames or seconds/milliseconds

Math.easeInElastic = function (t, b, c, d, a, p) {
	if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
	if (a < Math.abs(c)) { a=c; var s=p/4; }
	else var s = p/(2*Math.PI) * Math.asin (c/a);
	return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
};

Math.easeOutElastic = function (t, b, c, d, a, p) {
	if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
	if (a < Math.abs(c)) { a=c; var s=p/4; }
	else var s = p/(2*Math.PI) * Math.asin (c/a);
	return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
};

Math.easeInOutElastic = function (t, b, c, d, a, p) {
	if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
	if (a < Math.abs(c)) { a=c; var s=p/4; }
	else var s = p/(2*Math.PI) * Math.asin (c/a);
	if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
};


 /////////// BACK EASING: overshooting cubic easing: (s+1)*t^3 - s*t^2  //////////////

// back easing in - backtracking slightly, then reversing direction and moving to target
// t: current time, b: beginning value, c: change in value, d: duration, s: overshoot amount (optional)
// t and d can be in frames or seconds/milliseconds
// s controls the amount of overshoot: higher s means greater overshoot
// s has a default value of 1.70158, which produces an overshoot of 10 percent
// s==0 produces cubic easing with no overshoot
Math.easeInBack = function (t, b, c, d, s) {
	if (s == undefined) s = 1.70158;
	return c*(t/=d)*t*((s+1)*t - s) + b;
};

// back easing out - moving towards target, overshooting it slightly, then reversing and coming back to target
Math.easeOutBack = function (t, b, c, d, s) {
	if (s == undefined) s = 1.70158;
	return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
};

// back easing in/out - backtracking slightly, then reversing direction and moving to target,
// then overshooting target, reversing, and finally coming back to target
Math.easeInOutBack = function (t, b, c, d, s) {
	if (s == undefined) s = 1.70158; 
	if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
	return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
};


 /////////// BOUNCE EASING: exponentially decaying parabolic bounce  //////////////

// bounce easing in
// t: current time, b: beginning value, c: change in position, d: duration
Math.easeInBounce = function (t, b, c, d) {
	return c - Math.easeOutBounce (d-t, 0, c, d) + b;
};

// bounce easing out
Math.easeOutBounce = function (t, b, c, d) {
	if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
	}
};

// bounce easing in/out
Math.easeInOutBounce = function (t, b, c, d) {
	if (t < d/2) return Math.easeInBounce (t*2, 0, c, d) * .5 + b;
	return Math.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
};


//trace (">> Penner easing equations loaded");
/*!
 * Add to Homescreen v2.0.11 ~ Copyright (c) 2013 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
var addToHome = (function (w) {
	var nav = w.navigator,
		isIDevice = 'platform' in nav && (/iphone|ipod|ipad/gi).test(nav.platform),
		isIPad,
		isRetina,
		isSafari,
		isStandalone,
		OSVersion,
		startX = 0,
		startY = 0,
		lastVisit = 0,
		isExpired,
		isSessionActive,
		isReturningVisitor,
		balloon,
		overrideChecks,

		positionInterval,
		closeTimeout,

		options = {
			autostart: true,			// Automatically open the balloon
			returningVisitor: false,	// Show the balloon to returning visitors only (setting this to true is highly recommended)
			animationIn: 'drop',		// drop || bubble || fade
			animationOut: 'fade',		// drop || bubble || fade
			startDelay: 2000,			// 2 seconds from page load before the balloon appears
			lifespan: 15000,			// 15 seconds before it is automatically destroyed
			bottomOffset: 14,			// Distance of the balloon from bottom
			expire: 0,					// Minutes to wait before showing the popup again (0 = always displayed)
			message: '',				// Customize your message or force a language ('' = automatic)
			touchIcon: false,			// Display the touch icon
			arrow: true,				// Display the balloon arrow
			hookOnLoad: true,			// Should we hook to onload event? (really advanced usage)
			closeButton: true,			// Let the user close the balloon
			iterations: 100				// Internal/debug use
		},

		intl = {
			ar:    '<span dir="rtl">قم بتثبيت هذا التطبيق على <span dir="ltr">%device:</span>انقر<span dir="ltr">%icon</span> ،<strong>ثم اضفه الى الشاشة الرئيسية.</strong></span>',
			ca_es: 'Per instal·lar aquesta aplicació al vostre %device premeu %icon i llavors <strong>Afegir a pantalla d\'inici</strong>.',
			cs_cz: 'Pro instalaci aplikace na Váš %device, stiskněte %icon a v nabídce <strong>Přidat na plochu</strong>.',
			da_dk: 'Tilføj denne side til din %device: tryk på %icon og derefter <strong>Føj til hjemmeskærm</strong>.',
			de_de: 'Installieren Sie diese App auf Ihrem %device: %icon antippen und dann <strong>Zum Home-Bildschirm</strong>.',
			el_gr: 'Εγκαταστήσετε αυτήν την Εφαρμογή στήν συσκευή σας %device: %icon μετά πατάτε <strong>Προσθήκη σε Αφετηρία</strong>.',
			en_us: 'Install this web app on your %device: tap %icon and then <strong>Add to Home Screen</strong>.',
			es_es: 'Para instalar esta app en su %device, pulse %icon y seleccione <strong>Añadir a pantalla de inicio</strong>.',
			fi_fi: 'Asenna tämä web-sovellus laitteeseesi %device: paina %icon ja sen jälkeen valitse <strong>Lisää Koti-valikkoon</strong>.',
			fr_fr: 'Ajoutez cette application sur votre %device en cliquant sur %icon, puis <strong>Ajouter à l\'écran d\'accueil</strong>.',
			he_il: '<span dir="rtl">התקן אפליקציה זו על ה-%device שלך: הקש %icon ואז <strong>הוסף למסך הבית</strong>.</span>',
			hr_hr: 'Instaliraj ovu aplikaciju na svoj %device: klikni na %icon i odaberi <strong>Dodaj u početni zaslon</strong>.',
			hu_hu: 'Telepítse ezt a web-alkalmazást az Ön %device-jára: nyomjon a %icon-ra majd a <strong>Főképernyőhöz adás</strong> gombra.',
			it_it: 'Installa questa applicazione sul tuo %device: premi su %icon e poi <strong>Aggiungi a Home</strong>.',
			ja_jp: 'このウェブアプリをあなたの%deviceにインストールするには%iconをタップして<strong>ホーム画面に追加</strong>を選んでください。',
			ko_kr: '%device에 웹앱을 설치하려면 %icon을 터치 후 "홈화면에 추가"를 선택하세요',
			nb_no: 'Installer denne appen på din %device: trykk på %icon og deretter <strong>Legg til på Hjem-skjerm</strong>',
			nl_nl: 'Installeer deze webapp op uw %device: tik %icon en dan <strong>Voeg toe aan beginscherm</strong>.',
			pl_pl: 'Aby zainstalować tę aplikacje na %device: naciśnij %icon a następnie <strong>Dodaj jako ikonę</strong>.',
			pt_br: 'Instale este aplicativo em seu %device: aperte %icon e selecione <strong>Adicionar à Tela Inicio</strong>.',
			pt_pt: 'Para instalar esta aplicação no seu %device, prima o %icon e depois em <strong>Adicionar ao ecrã principal</strong>.',
			ru_ru: 'Установите это веб-приложение на ваш %device: нажмите %icon, затем <strong>Добавить в «Домой»</strong>.',
			sv_se: 'Lägg till denna webbapplikation på din %device: tryck på %icon och därefter <strong>Lägg till på hemskärmen</strong>.',
			th_th: 'ติดตั้งเว็บแอพฯ นี้บน %device ของคุณ: แตะ %icon และ <strong>เพิ่มที่หน้าจอโฮม</strong>',
			tr_tr: 'Bu uygulamayı %device\'a eklemek için %icon simgesine sonrasında <strong>Ana Ekrana Ekle</strong> düğmesine basın.',
			uk_ua: 'Встановіть цей веб сайт на Ваш %device: натисніть %icon, а потім <strong>На початковий екран</strong>.',
			zh_cn: '您可以将此应用安装到您的 %device 上。请按 %icon 然后选择<strong>添加至主屏幕</strong>。',
			zh_tw: '您可以將此應用程式安裝到您的 %device 上。請按 %icon 然後點選<strong>加入主畫面螢幕</strong>。'
		};

	function init () {
		// Preliminary check, all further checks are performed on iDevices only
		if ( !isIDevice ) return;

		var now = Date.now(),
			i;

		// Merge local with global options
		if ( w.addToHomeConfig ) {
			for ( i in w.addToHomeConfig ) {
				options[i] = w.addToHomeConfig[i];
			}
		}
		if ( !options.autostart ) options.hookOnLoad = false;

		isIPad = (/ipad/gi).test(nav.platform);
		isRetina = w.devicePixelRatio && w.devicePixelRatio > 1;
		isSafari = (/Safari/i).test(nav.appVersion) && !(/CriOS/i).test(nav.appVersion);
		isStandalone = nav.standalone;
		OSVersion = nav.appVersion.match(/OS (\d+_\d+)/i);
		OSVersion = OSVersion && OSVersion[1] ? +OSVersion[1].replace('_', '.') : 0;

		lastVisit = +w.localStorage.getItem('addToHome');

		isSessionActive = w.sessionStorage.getItem('addToHomeSession');
		isReturningVisitor = options.returningVisitor ? lastVisit && lastVisit + 28*24*60*60*1000 > now : true;

		if ( !lastVisit ) lastVisit = now;

		// If it is expired we need to reissue a new balloon
		isExpired = isReturningVisitor && lastVisit <= now;

		if ( options.hookOnLoad ) w.addEventListener('load', loaded, false);
		else if ( !options.hookOnLoad && options.autostart ) loaded();
	}

	function loaded () {
		w.removeEventListener('load', loaded, false);

		if ( !isReturningVisitor ) w.localStorage.setItem('addToHome', Date.now());
		else if ( options.expire && isExpired ) w.localStorage.setItem('addToHome', Date.now() + options.expire * 60000);

		if ( !overrideChecks && ( !isSafari || !isExpired || isSessionActive || isStandalone || !isReturningVisitor ) ) return;

		var touchIcon = '',
			platform = nav.platform.split(' ')[0],
			language = nav.language.replace('-', '_');

		balloon = document.createElement('div');
		balloon.id = 'addToHomeScreen';
		balloon.style.cssText += 'left:-9999px;-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);position:' + (OSVersion < 5 ? 'absolute' : 'fixed');

		// Localize message
		if ( options.message in intl ) {		// You may force a language despite the user's locale
			language = options.message;
			options.message = '';
		}
		if ( options.message === '' ) {			// We look for a suitable language (defaulted to en_us)
			options.message = language in intl ? intl[language] : intl['en_us'];
		}

		if ( options.touchIcon ) {
			touchIcon = isRetina ?
				document.querySelector('head link[rel^=apple-touch-icon][sizes="114x114"],head link[rel^=apple-touch-icon][sizes="144x144"],head link[rel^=apple-touch-icon]') :
				document.querySelector('head link[rel^=apple-touch-icon][sizes="57x57"],head link[rel^=apple-touch-icon]');

			if ( touchIcon ) {
				touchIcon = '<span style="background-image:url(' + touchIcon.href + ')" class="addToHomeTouchIcon"></span>';
			}
		}

		balloon.className = (OSVersion >=7 ? 'addToHomeIOS7 ' : '') + (isIPad ? 'addToHomeIpad' : 'addToHomeIphone') + (touchIcon ? ' addToHomeWide' : '');
		balloon.innerHTML = touchIcon +
			options.message.replace('%device', platform).replace('%icon', OSVersion >= 4.2 ? '<span class="addToHomeShare"></span>' : '<span class="addToHomePlus">+</span>') +
			(options.arrow ? '<span class="addToHomeArrow"' + (OSVersion >= 7 && isIPad && touchIcon ? ' style="margin-left:-32px"' : '') + '></span>' : '') +
			(options.closeButton ? '<span class="addToHomeClose">\u00D7</span>' : '');

		document.body.appendChild(balloon);

		// Add the close action
		if ( options.closeButton ) balloon.addEventListener('click', clicked, false);

		if ( !isIPad && OSVersion >= 6 ) window.addEventListener('orientationchange', orientationCheck, false);

		setTimeout(show, options.startDelay);
	}

	function show () {
		var duration,
			iPadXShift = 208;

		// Set the initial position
		if ( isIPad ) {
			if ( OSVersion < 5 ) {
				startY = w.scrollY;
				startX = w.scrollX;
			} else if ( OSVersion < 6 ) {
				iPadXShift = 160;
			} else if ( OSVersion >= 7 ) {
				iPadXShift = 143;
			}

			balloon.style.top = startY + options.bottomOffset + 'px';
			balloon.style.left = Math.max(startX + iPadXShift - Math.round(balloon.offsetWidth / 2), 9) + 'px';

			switch ( options.animationIn ) {
				case 'drop':
					duration = '0.6s';
					balloon.style.webkitTransform = 'translate3d(0,' + -(w.scrollY + options.bottomOffset + balloon.offsetHeight) + 'px,0)';
					break;
				case 'bubble':
					duration = '0.6s';
					balloon.style.opacity = '0';
					balloon.style.webkitTransform = 'translate3d(0,' + (startY + 50) + 'px,0)';
					break;
				default:
					duration = '1s';
					balloon.style.opacity = '0';
			}
		} else {
			startY = w.innerHeight + w.scrollY;

			if ( OSVersion < 5 ) {
				startX = Math.round((w.innerWidth - balloon.offsetWidth) / 2) + w.scrollX;
				balloon.style.left = startX + 'px';
				balloon.style.top = startY - balloon.offsetHeight - options.bottomOffset + 'px';
			} else {
				balloon.style.left = '50%';
				balloon.style.marginLeft = -Math.round(balloon.offsetWidth / 2) - ( w.orientation%180 && OSVersion >= 6 && OSVersion < 7 ? 40 : 0 ) + 'px';
				balloon.style.bottom = options.bottomOffset + 'px';
			}

			switch (options.animationIn) {
				case 'drop':
					duration = '1s';
					balloon.style.webkitTransform = 'translate3d(0,' + -(startY + options.bottomOffset) + 'px,0)';
					break;
				case 'bubble':
					duration = '0.6s';
					balloon.style.webkitTransform = 'translate3d(0,' + (balloon.offsetHeight + options.bottomOffset + 50) + 'px,0)';
					break;
				default:
					duration = '1s';
					balloon.style.opacity = '0';
			}
		}

		balloon.offsetHeight;	// repaint trick
		balloon.style.webkitTransitionDuration = duration;
		balloon.style.opacity = '1';
		balloon.style.webkitTransform = 'translate3d(0,0,0)';
		balloon.addEventListener('webkitTransitionEnd', transitionEnd, false);

		closeTimeout = setTimeout(close, options.lifespan);
	}

	function manualShow (override) {
		if ( !isIDevice || balloon ) return;

		overrideChecks = override;
		loaded();
	}

	function close () {
		clearInterval( positionInterval );
		clearTimeout( closeTimeout );
		closeTimeout = null;

		// check if the popup is displayed and prevent errors
		if ( !balloon ) return;

		var posY = 0,
			posX = 0,
			opacity = '1',
			duration = '0';

		if ( options.closeButton ) balloon.removeEventListener('click', clicked, false);
		if ( !isIPad && OSVersion >= 6 ) window.removeEventListener('orientationchange', orientationCheck, false);

		if ( OSVersion < 5 ) {
			posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY;
			posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth)/2) - startX;
		}

		balloon.style.webkitTransitionProperty = '-webkit-transform,opacity';

		switch ( options.animationOut ) {
			case 'drop':
				if ( isIPad ) {
					duration = '0.4s';
					opacity = '0';
					posY += 50;
				} else {
					duration = '0.6s';
					posY += balloon.offsetHeight + options.bottomOffset + 50;
				}
				break;
			case 'bubble':
				if ( isIPad ) {
					duration = '0.8s';
					posY -= balloon.offsetHeight + options.bottomOffset + 50;
				} else {
					duration = '0.4s';
					opacity = '0';
					posY -= 50;
				}
				break;
			default:
				duration = '0.8s';
				opacity = '0';
		}

		balloon.addEventListener('webkitTransitionEnd', transitionEnd, false);
		balloon.style.opacity = opacity;
		balloon.style.webkitTransitionDuration = duration;
		balloon.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
	}


	function clicked () {
		w.sessionStorage.setItem('addToHomeSession', '1');
		isSessionActive = true;
		close();
	}

	function transitionEnd () {
		balloon.removeEventListener('webkitTransitionEnd', transitionEnd, false);

		balloon.style.webkitTransitionProperty = '-webkit-transform';
		balloon.style.webkitTransitionDuration = '0.2s';

		// We reached the end!
		if ( !closeTimeout ) {
			balloon.parentNode.removeChild(balloon);
			balloon = null;
			return;
		}

		// On iOS 4 we start checking the element position
		if ( OSVersion < 5 && closeTimeout ) positionInterval = setInterval(setPosition, options.iterations);
	}

	function setPosition () {
		var matrix = new WebKitCSSMatrix(w.getComputedStyle(balloon, null).webkitTransform),
			posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY,
			posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth) / 2) - startX;

		// Screen didn't move
		if ( posY == matrix.m42 && posX == matrix.m41 ) return;

		balloon.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
	}

	// Clear local and session storages (this is useful primarily in development)
	function reset () {
		w.localStorage.removeItem('addToHome');
		w.sessionStorage.removeItem('addToHomeSession');
	}

	function orientationCheck () {
		balloon.style.marginLeft = -Math.round(balloon.offsetWidth / 2) - ( w.orientation%180 && OSVersion >= 6 && OSVersion < 7 ? 40 : 0 ) + 'px';
	}

	// Bootstrap!
	init();

	return {
		show: manualShow,
		close: close,
		reset: reset
	};
})(window);

(function(g,m,a,p,i){g['GameMixAPIName']=i;g[i]=g[i]||function(f){
g[i].q=g[i].q||[];g[i].q.push(f);};g[i]({apiDomain:p});
var s=m.createElement(a),d=m.getElementsByTagName(a)[0];s.type='text/javascript';
s.async=true;s.src=p+'/v1/gm.js';d.parentNode.insertBefore(s,d);
}(window,document,'script','http://gmapi.gamemix.com','gmapi'));
   
gmapi('karatecrush');
/*!
 *  howler.js v1.1.21
 *  howlerjs.com
 *
 *  (c) 2013-2014, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

(function() {
  // setup
  var cache = {};

  // setup the audio context
  var ctx = null,
    usingWebAudio = true,
    noAudio = false;
  try {
    if (typeof AudioContext !== 'undefined') {
      ctx = new AudioContext();
    } else if (typeof webkitAudioContext !== 'undefined') {
      ctx = new webkitAudioContext();
    } else {
      usingWebAudio = false;
    }
  } catch(e) {
    usingWebAudio = false;
  }

  if (!usingWebAudio) {
    if (typeof Audio !== 'undefined') {
      try {
        new Audio();
      } catch(e) {
        noAudio = true;
      }
    } else {
      noAudio = true;
    }
  }

  // create a master gain node
  if (usingWebAudio) {
    var masterGain = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(ctx.destination);
  }

  // create global controller
  var HowlerGlobal = function() {
    this._volume = 1;
    this._muted = false;
    this.usingWebAudio = usingWebAudio;
    this.noAudio = noAudio;
    this._howls = [];
  };
  HowlerGlobal.prototype = {
    /**
     * Get/set the global volume for all sounds.
     * @param  {Float} vol Volume from 0.0 to 1.0.
     * @return {Howler/Float}     Returns self or current volume.
     */
    volume: function(vol) {
      var self = this;

      // make sure volume is a number
      vol = parseFloat(vol);

      if (vol >= 0 && vol <= 1) {
        self._volume = vol;

        if (usingWebAudio) {
          masterGain.gain.value = vol;
        }

        // loop through cache and change volume of all nodes that are using HTML5 Audio
        for (var key in self._howls) {
          if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
            // loop through the audio nodes
            for (var i=0; i<self._howls[key]._audioNode.length; i++) {
              self._howls[key]._audioNode[i].volume = self._howls[key]._volume * self._volume;
            }
          }
        }

        return self;
      }

      // return the current global volume
      return (usingWebAudio) ? masterGain.gain.value : self._volume;
    },

    /**
     * Mute all sounds.
     * @return {Howler}
     */
    mute: function() {
      this._setMuted(true);

      return this;
    },

    /**
     * Unmute all sounds.
     * @return {Howler}
     */
    unmute: function() {
      this._setMuted(false);

      return this;
    },

    /**
     * Handle muting and unmuting globally.
     * @param  {Boolean} muted Is muted or not.
     */
    _setMuted: function(muted) {
      var self = this;

      self._muted = muted;

      if (usingWebAudio) {
        masterGain.gain.value = muted ? 0 : self._volume;
      }

      for (var key in self._howls) {
        if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
          // loop through the audio nodes
          for (var i=0; i<self._howls[key]._audioNode.length; i++) {
            self._howls[key]._audioNode[i].muted = muted;
          }
        }
      }
    }
  };

  // allow access to the global audio controls
  var Howler = new HowlerGlobal();

  // check for browser codec support
  var audioTest = null;
  if (!noAudio) {
    audioTest = new Audio();
    var codecs = {
      mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/, ''),
      opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
      ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
      wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
      aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
      m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
    };
  }

  // setup the audio object
  var Howl = function(o) {
    var self = this;

    // setup the defaults
    self._autoplay = o.autoplay || false;
    self._buffer = o.buffer || false;
    self._duration = o.duration || 0;
    self._format = o.format || null;
    self._loop = o.loop || false;
    self._loaded = false;
    self._sprite = o.sprite || {};
    self._src = o.src || '';
    self._pos3d = o.pos3d || [0, 0, -0.5];
    self._volume = o.volume !== undefined ? o.volume : 1;
    self._urls = o.urls || [];
    self._rate = o.rate || 1;

    // allow forcing of a specific panningModel ('equalpower' or 'HRTF'),
    // if none is specified, defaults to 'equalpower' and switches to 'HRTF'
    // if 3d sound is used
    self._model = o.model || null;

    // setup event functions
    self._onload = [o.onload || function() {}];
    self._onloaderror = [o.onloaderror || function() {}];
    self._onend = [o.onend || function() {}];
    self._onpause = [o.onpause || function() {}];
    self._onplay = [o.onplay || function() {}];

    self._onendTimer = [];

    // Web Audio or HTML5 Audio?
    self._webAudio = usingWebAudio && !self._buffer;

    // check if we need to fall back to HTML5 Audio
    self._audioNode = [];
    if (self._webAudio) {
      self._setupAudioNode();
    }

    // add this to an array of Howl's to allow global control
    Howler._howls.push(self);

    // load the track
    self.load();
  };

  // setup all of the methods
  Howl.prototype = {
    /**
     * Load an audio file.
     * @return {Howl}
     */
    load: function() {
      var self = this,
        url = null;

      // if no audio is available, quit immediately
      if (noAudio) {
        self.on('loaderror');
        return;
      }

      // loop through source URLs and pick the first one that is compatible
      for (var i=0; i<self._urls.length; i++) {
        var ext, urlItem;

        if (self._format) {
          // use specified audio format if available
          ext = self._format;
        } else {
          // figure out the filetype (whether an extension or base64 data)
          urlItem = self._urls[i].toLowerCase().split('?')[0];
          ext = urlItem.match(/.+\.([^?]+)(\?|$)/);
          ext = (ext && ext.length >= 2) ? ext : urlItem.match(/data\:audio\/([^?]+);/);

          if (ext) {
            ext = ext[1];
          } else {
            self.on('loaderror');
            return;
          }
        }

        if (codecs[ext]) {
          url = self._urls[i];
          break;
        }
      }

      if (!url) {
        self.on('loaderror');
        return;
      }

      self._src = url;

      if (self._webAudio) {
        loadBuffer(self, url);
      } else {
        var newNode = new Audio();

        // listen for errors with HTML5 audio (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror)
        newNode.addEventListener('error', function () {
          if (newNode.error && newNode.error.code === 4) {
            HowlerGlobal.noAudio = true;
          }

          self.on('loaderror', {type: newNode.error ? newNode.error.code : 0});
        }, false);

        self._audioNode.push(newNode);

        // setup the new audio node
        newNode.src = url;
        newNode._pos = 0;
        newNode.preload = 'auto';
        newNode.volume = (Howler._muted) ? 0 : self._volume * Howler.volume();

        // add this sound to the cache
        cache[url] = self;

        // setup the event listener to start playing the sound
        // as soon as it has buffered enough
        var listener = function() {
          // round up the duration when using HTML5 Audio to account for the lower precision
          self._duration = Math.ceil(newNode.duration * 10) / 10;

          // setup a sprite if none is defined
          if (Object.getOwnPropertyNames(self._sprite).length === 0) {
            self._sprite = {_default: [0, self._duration * 1000]};
          }

          if (!self._loaded) {
            self._loaded = true;
            self.on('load');
          }

          if (self._autoplay) {
            self.play();
          }

          // clear the event listener
          newNode.removeEventListener('canplaythrough', listener, false);
        };
        newNode.addEventListener('canplaythrough', listener, false);
        newNode.load();
      }

      return self;
    },

    /**
     * Get/set the URLs to be pulled from to play in this source.
     * @param  {Array} urls  Arry of URLs to load from
     * @return {Howl}        Returns self or the current URLs
     */
    urls: function(urls) {
      var self = this;

      if (urls) {
        self.stop();
        self._urls = (typeof urls === 'string') ? [urls] : urls;
        self._loaded = false;
        self.load();

        return self;
      } else {
        return self._urls;
      }
    },

    /**
     * Play a sound from the current time (0 by default).
     * @param  {String}   sprite   (optional) Plays from the specified position in the sound sprite definition.
     * @param  {Function} callback (optional) Returns the unique playback id for this sound instance.
     * @return {Howl}
     */
    play: function(sprite, callback) {
      var self = this;

      // if no sprite was passed but a callback was, update the variables
      if (typeof sprite === 'function') {
        callback = sprite;
      }

      // use the default sprite if none is passed
      if (!sprite || typeof sprite === 'function') {
        sprite = '_default';
      }

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.play(sprite, callback);
        });

        return self;
      }

      // if the sprite doesn't exist, play nothing
      if (!self._sprite[sprite]) {
        if (typeof callback === 'function') callback();
        return self;
      }

      // get the node to playback
      self._inactiveNode(function(node) {
        // persist the sprite being played
        node._sprite = sprite;

        // determine where to start playing from
        var pos = (node._pos > 0) ? node._pos : self._sprite[sprite][0] / 1000;

        // determine how long to play for
        var duration = 0;
        if (self._webAudio) {
          duration = self._sprite[sprite][1] / 1000 - node._pos;
          if (node._pos > 0) {
            pos = self._sprite[sprite][0] / 1000 + pos;
          }
        } else {
          duration = self._sprite[sprite][1] / 1000 - (pos - self._sprite[sprite][0] / 1000);
        }

        // determine if this sound should be looped
        var loop = !!(self._loop || self._sprite[sprite][2]);

        // set timer to fire the 'onend' event
        var soundId = (typeof callback === 'string') ? callback : Math.round(Date.now() * Math.random()) + '',
          timerId;
        (function() {
          var data = {
            id: soundId,
            sprite: sprite,
            loop: loop
          };
          timerId = setTimeout(function() {
            // if looping, restart the track
            if (!self._webAudio && loop) {
              self.stop(data.id).play(sprite, data.id);
            }

            // set web audio node to paused at end
            if (self._webAudio && !loop) {
              self._nodeById(data.id).paused = true;
              self._nodeById(data.id)._pos = 0;
            }

            // end the track if it is HTML audio and a sprite
            if (!self._webAudio && !loop) {
              self.stop(data.id);
            }

            // fire ended event
            self.on('end', soundId);
          }, duration * 1000);

          // store the reference to the timer
          self._onendTimer.push({timer: timerId, id: data.id});
        })();

        if (self._webAudio) {
          var loopStart = self._sprite[sprite][0] / 1000,
            loopEnd = self._sprite[sprite][1] / 1000;

          // set the play id to this node and load into context
          node.id = soundId;
          node.paused = false;
          refreshBuffer(self, [loop, loopStart, loopEnd], soundId);
          self._playStart = ctx.currentTime;
          node.gain.value = self._volume;

          if (typeof node.bufferSource.start === 'undefined') {
            node.bufferSource.noteGrainOn(0, pos, duration);
          } else {
            node.bufferSource.start(0, pos, duration);
          }
        } else {
          if (node.readyState === 4 || !node.readyState && navigator.isCocoonJS) {
            node.readyState = 4;
            node.id = soundId;
            node.currentTime = pos;
            node.muted = Howler._muted || node.muted;
            node.volume = self._volume * Howler.volume();
            setTimeout(function() { node.play(); }, 0);
          } else {
            self._clearEndTimer(soundId);

            (function(){
              var sound = self,
                playSprite = sprite,
                fn = callback,
                newNode = node;
              var listener = function() {
                sound.play(playSprite, fn);

                // clear the event listener
                newNode.removeEventListener('canplaythrough', listener, false);
              };
              newNode.addEventListener('canplaythrough', listener, false);
            })();

            return self;
          }
        }

        // fire the play event and send the soundId back in the callback
        self.on('play');
        if (typeof callback === 'function') callback(soundId);

        return self;
      });

      return self;
    },

    /**
     * Pause playback and save the current position.
     * @param {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    pause: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.pause(id);
        });

        return self;
      }

      // clear 'onend' timer
      self._clearEndTimer(id);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        activeNode._pos = self.pos(null, id);

        if (self._webAudio) {
          // make sure the sound has been created
          if (!activeNode.bufferSource || activeNode.paused) {
            return self;
          }

          activeNode.paused = true;
          if (typeof activeNode.bufferSource.stop === 'undefined') {
            activeNode.bufferSource.noteOff(0);
          } else {
            activeNode.bufferSource.stop(0);
          }
        } else {
          activeNode.pause();
        }
      }

      self.on('pause');

      return self;
    },

    /**
     * Stop playback and reset to start.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl}
     */
    stop: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.stop(id);
        });

        return self;
      }

      // clear 'onend' timer
      self._clearEndTimer(id);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        activeNode._pos = 0;

        if (self._webAudio) {
          // make sure the sound has been created
          if (!activeNode.bufferSource || activeNode.paused) {
            return self;
          }

          activeNode.paused = true;

          if (typeof activeNode.bufferSource.stop === 'undefined') {
            activeNode.bufferSource.noteOff(0);
          } else {
            activeNode.bufferSource.stop(0);
          }
        } else if (!isNaN(activeNode.duration)) {
          activeNode.pause();
          activeNode.currentTime = 0;
        }
      }

      return self;
    },

    /**
     * Mute this sound.
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    mute: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.mute(id);
        });

        return self;
      }

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (self._webAudio) {
          activeNode.gain.value = 0;
        } else {
          activeNode.muted = true;
        }
      }

      return self;
    },

    /**
     * Unmute this sound.
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    unmute: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.unmute(id);
        });

        return self;
      }

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (self._webAudio) {
          activeNode.gain.value = self._volume;
        } else {
          activeNode.muted = false;
        }
      }

      return self;
    },

    /**
     * Get/set volume of this sound.
     * @param  {Float}  vol Volume from 0.0 to 1.0.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl/Float}     Returns self or current volume.
     */
    volume: function(vol, id) {
      var self = this;

      // make sure volume is a number
      vol = parseFloat(vol);

      if (vol >= 0 && vol <= 1) {
        self._volume = vol;

        // if the sound hasn't been loaded, add it to the event queue
        if (!self._loaded) {
          self.on('play', function() {
            self.volume(vol, id);
          });

          return self;
        }

        var activeNode = (id) ? self._nodeById(id) : self._activeNode();
        if (activeNode) {
          if (self._webAudio) {
            activeNode.gain.value = vol;
          } else {
            activeNode.volume = vol * Howler.volume();
          }
        }

        return self;
      } else {
        return self._volume;
      }
    },

    /**
     * Get/set whether to loop the sound.
     * @param  {Boolean} loop To loop or not to loop, that is the question.
     * @return {Howl/Boolean}      Returns self or current looping value.
     */
    loop: function(loop) {
      var self = this;

      if (typeof loop === 'boolean') {
        self._loop = loop;

        return self;
      } else {
        return self._loop;
      }
    },

    /**
     * Get/set sound sprite definition.
     * @param  {Object} sprite Example: {spriteName: [offset, duration, loop]}
     *                @param {Integer} offset   Where to begin playback in milliseconds
     *                @param {Integer} duration How long to play in milliseconds
     *                @param {Boolean} loop     (optional) Set true to loop this sprite
     * @return {Howl}        Returns current sprite sheet or self.
     */
    sprite: function(sprite) {
      var self = this;

      if (typeof sprite === 'object') {
        self._sprite = sprite;

        return self;
      } else {
        return self._sprite;
      }
    },

    /**
     * Get/set the position of playback.
     * @param  {Float}  pos The position to move current playback to.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl/Float}      Returns self or current playback position.
     */
    pos: function(pos, id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.pos(pos);
        });

        return typeof pos === 'number' ? self : self._pos || 0;
      }

      // make sure we are dealing with a number for pos
      pos = parseFloat(pos);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (pos >= 0) {
          self.pause(id);
          activeNode._pos = pos;
          self.play(activeNode._sprite, id);

          return self;
        } else {
          return self._webAudio ? activeNode._pos + (ctx.currentTime - self._playStart) : activeNode.currentTime;
        }
      } else if (pos >= 0) {
        return self;
      } else {
        // find the first inactive node to return the pos for
        for (var i=0; i<self._audioNode.length; i++) {
          if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
            return (self._webAudio) ? self._audioNode[i]._pos : self._audioNode[i].currentTime;
          }
        }
      }
    },

    /**
     * Get/set the 3D position of the audio source.
     * The most common usage is to set the 'x' position
     * to affect the left/right ear panning. Setting any value higher than
     * 1.0 will begin to decrease the volume of the sound as it moves further away.
     * NOTE: This only works with Web Audio API, HTML5 Audio playback
     * will not be affected.
     * @param  {Float}  x  The x-position of the playback from -1000.0 to 1000.0
     * @param  {Float}  y  The y-position of the playback from -1000.0 to 1000.0
     * @param  {Float}  z  The z-position of the playback from -1000.0 to 1000.0
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl/Array}   Returns self or the current 3D position: [x, y, z]
     */
    pos3d: function(x, y, z, id) {
      var self = this;

      // set a default for the optional 'y' & 'z'
      y = (typeof y === 'undefined' || !y) ? 0 : y;
      z = (typeof z === 'undefined' || !z) ? -0.5 : z;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.pos3d(x, y, z, id);
        });

        return self;
      }

      if (x >= 0 || x < 0) {
        if (self._webAudio) {
          var activeNode = (id) ? self._nodeById(id) : self._activeNode();
          if (activeNode) {
            self._pos3d = [x, y, z];
            activeNode.panner.setPosition(x, y, z);
            activeNode.panner.panningModel = self._model || 'HRTF';
          }
        }
      } else {
        return self._pos3d;
      }

      return self;
    },

    /**
     * Fade a currently playing sound between two volumes.
     * @param  {Number}   from     The volume to fade from (0.0 to 1.0).
     * @param  {Number}   to       The volume to fade to (0.0 to 1.0).
     * @param  {Number}   len      Time in milliseconds to fade.
     * @param  {Function} callback (optional) Fired when the fade is complete.
     * @param  {String}   id       (optional) The play instance ID.
     * @return {Howl}
     */
    fade: function(from, to, len, callback, id) {
      var self = this,
        diff = Math.abs(from - to),
        dir = from > to ? 'down' : 'up',
        steps = diff / 0.01,
        stepTime = len / steps;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.fade(from, to, len, callback, id);
        });

        return self;
      }

      // set the volume to the start position
      self.volume(from, id);

      for (var i=1; i<=steps; i++) {
        (function() {
          var change = self._volume + (dir === 'up' ? 0.01 : -0.01) * i,
            vol = Math.round(1000 * change) / 1000,
            toVol = to;

          setTimeout(function() {
            self.volume(vol, id);

            if (vol === toVol) {
              if (callback) callback();
            }
          }, stepTime * i);
        })();
      }
    },

    /**
     * [DEPRECATED] Fade in the current sound.
     * @param  {Float}    to      Volume to fade to (0.0 to 1.0).
     * @param  {Number}   len     Time in milliseconds to fade.
     * @param  {Function} callback
     * @return {Howl}
     */
    fadeIn: function(to, len, callback) {
      return this.volume(0).play().fade(0, to, len, callback);
    },

    /**
     * [DEPRECATED] Fade out the current sound and pause when finished.
     * @param  {Float}    to       Volume to fade to (0.0 to 1.0).
     * @param  {Number}   len      Time in milliseconds to fade.
     * @param  {Function} callback
     * @param  {String}   id       (optional) The play instance ID.
     * @return {Howl}
     */
    fadeOut: function(to, len, callback, id) {
      var self = this;

      return self.fade(self._volume, to, len, function() {
        if (callback) callback();
        self.pause(id);

        // fire ended event
        self.on('end');
      }, id);
    },

    /**
     * Get an audio node by ID.
     * @return {Howl} Audio node.
     */
    _nodeById: function(id) {
      var self = this,
        node = self._audioNode[0];

      // find the node with this ID
      for (var i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].id === id) {
          node = self._audioNode[i];
          break;
        }
      }

      return node;
    },

    /**
     * Get the first active audio node.
     * @return {Howl} Audio node.
     */
    _activeNode: function() {
      var self = this,
        node = null;

      // find the first playing node
      for (var i=0; i<self._audioNode.length; i++) {
        if (!self._audioNode[i].paused) {
          node = self._audioNode[i];
          break;
        }
      }

      // remove excess inactive nodes
      self._drainPool();

      return node;
    },

    /**
     * Get the first inactive audio node.
     * If there is none, create a new one and add it to the pool.
     * @param  {Function} callback Function to call when the audio node is ready.
     */
    _inactiveNode: function(callback) {
      var self = this,
        node = null;

      // find first inactive node to recycle
      for (var i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
          // send the node back for use by the new play instance
          callback(self._audioNode[i]);
          node = true;
          break;
        }
      }

      // remove excess inactive nodes
      self._drainPool();

      if (node) {
        return;
      }

      // create new node if there are no inactives
      var newNode;
      if (self._webAudio) {
        newNode = self._setupAudioNode();
        callback(newNode);
      } else {
        self.load();
        newNode = self._audioNode[self._audioNode.length - 1];

        // listen for the correct load event and fire the callback
        var listenerEvent = navigator.isCocoonJS ? 'canplaythrough' : 'loadedmetadata';
        var listener = function() {
          newNode.removeEventListener(listenerEvent, listener, false);
          callback(newNode);
        };
        newNode.addEventListener(listenerEvent, listener, false);
      }
    },

    /**
     * If there are more than 5 inactive audio nodes in the pool, clear out the rest.
     */
    _drainPool: function() {
      var self = this,
        inactive = 0,
        i;

      // count the number of inactive nodes
      for (i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].paused) {
          inactive++;
        }
      }

      // remove excess inactive nodes
      for (i=self._audioNode.length-1; i>=0; i--) {
        if (inactive <= 5) {
          break;
        }

        if (self._audioNode[i].paused) {
          // disconnect the audio source if using Web Audio
          if (self._webAudio) {
            self._audioNode[i].disconnect(0);
          }

          inactive--;
          self._audioNode.splice(i, 1);
        }
      }
    },

    /**
     * Clear 'onend' timeout before it ends.
     * @param  {String} soundId  The play instance ID.
     */
    _clearEndTimer: function(soundId) {
      var self = this,
        index = 0;

      // loop through the timers to find the one associated with this sound
      for (var i=0; i<self._onendTimer.length; i++) {
        if (self._onendTimer[i].id === soundId) {
          index = i;
          break;
        }
      }

      var timer = self._onendTimer[index];
      if (timer) {
        clearTimeout(timer.timer);
        self._onendTimer.splice(index, 1);
      }
    },

    /**
     * Setup the gain node and panner for a Web Audio instance.
     * @return {Object} The new audio node.
     */
    _setupAudioNode: function() {
      var self = this,
        node = self._audioNode,
        index = self._audioNode.length;

      // create gain node
      node[index] = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
      node[index].gain.value = self._volume;
      node[index].paused = true;
      node[index]._pos = 0;
      node[index].readyState = 4;
      node[index].connect(masterGain);

      // create the panner
      node[index].panner = ctx.createPanner();
      node[index].panner.panningModel = self._model || 'equalpower';
      node[index].panner.setPosition(self._pos3d[0], self._pos3d[1], self._pos3d[2]);
      node[index].panner.connect(node[index]);

      return node[index];
    },

    /**
     * Call/set custom events.
     * @param  {String}   event Event type.
     * @param  {Function} fn    Function to call.
     * @return {Howl}
     */
    on: function(event, fn) {
      var self = this,
        events = self['_on' + event];

      if (typeof fn === 'function') {
        events.push(fn);
      } else {
        for (var i=0; i<events.length; i++) {
          if (fn) {
            events[i].call(self, fn);
          } else {
            events[i].call(self);
          }
        }
      }

      return self;
    },

    /**
     * Remove a custom event.
     * @param  {String}   event Event type.
     * @param  {Function} fn    Listener to remove.
     * @return {Howl}
     */
    off: function(event, fn) {
      var self = this,
        events = self['_on' + event],
        fnString = fn.toString();

      // loop through functions in the event for comparison
      for (var i=0; i<events.length; i++) {
        if (fnString === events[i].toString()) {
          events.splice(i, 1);
          break;
        }
      }

      return self;
    },

    /**
     * Unload and destroy the current Howl object.
     * This will immediately stop all play instances attached to this sound.
     */
    unload: function() {
      var self = this;

      // stop playing any active nodes
      var nodes = self._audioNode;
      for (var i=0; i<self._audioNode.length; i++) {
        // stop the sound if it is currently playing
        if (!nodes[i].paused) {
          self.stop(nodes[i].id);
        }

        if (!self._webAudio) {
          // remove the source if using HTML5 Audio
          nodes[i].src = '';
        } else {
          // disconnect the output from the master gain
          nodes[i].disconnect(0);
        }
      }

      // make sure all timeouts are cleared
      for (i=0; i<self._onendTimer.length; i++) {
        clearTimeout(self._onendTimer[i].timer);
      }

      // remove the reference in the global Howler object
      var index = Howler._howls.indexOf(self);
      if (index !== null && index >= 0) {
        Howler._howls.splice(index, 1);
      }

      // delete this sound from the cache
      delete cache[self._src];
      self = null;
    }

  };

  // only define these functions when using WebAudio
  if (usingWebAudio) {

    /**
     * Buffer a sound from URL (or from cache) and decode to audio source (Web Audio API).
     * @param  {Object} obj The Howl object for the sound to load.
     * @param  {String} url The path to the sound file.
     */
    var loadBuffer = function(obj, url) {
      // check if the buffer has already been cached
      if (url in cache) {
        // set the duration from the cache
        obj._duration = cache[url].duration;

        // load the sound into this object
        loadSound(obj);
      } else {
        // load the buffer from the URL
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
          // decode the buffer into an audio source
          ctx.decodeAudioData(
            xhr.response,
            function(buffer) {
              if (buffer) {
                cache[url] = buffer;
                loadSound(obj, buffer);
              }
            },
            function(err) {
              obj.on('loaderror');
            }
          );
        };
        xhr.onerror = function() {
          // if there is an error, switch the sound to HTML Audio
          if (obj._webAudio) {
            obj._buffer = true;
            obj._webAudio = false;
            obj._audioNode = [];
            delete obj._gainNode;
            obj.load();
          }
        };
        try {
          xhr.send();
        } catch (e) {
          xhr.onerror();
        }
      }
    };

    /**
     * Finishes loading the Web Audio API sound and fires the loaded event
     * @param  {Object}  obj    The Howl object for the sound to load.
     * @param  {Objecct} buffer The decoded buffer sound source.
     */
    var loadSound = function(obj, buffer) {
      // set the duration
      obj._duration = (buffer) ? buffer.duration : obj._duration;

      // setup a sprite if none is defined
      if (Object.getOwnPropertyNames(obj._sprite).length === 0) {
        obj._sprite = {_default: [0, obj._duration * 1000]};
      }

      // fire the loaded event
      if (!obj._loaded) {
        obj._loaded = true;
        obj.on('load');
      }

      if (obj._autoplay) {
        obj.play();
      }
    };

    /**
     * Load the sound back into the buffer source.
     * @param  {Object} obj   The sound to load.
     * @param  {Array}  loop  Loop boolean, pos, and duration.
     * @param  {String} id    (optional) The play instance ID.
     */
    var refreshBuffer = function(obj, loop, id) {
      // determine which node to connect to
      var node = obj._nodeById(id);

      // setup the buffer source for playback
      node.bufferSource = ctx.createBufferSource();
      node.bufferSource.buffer = cache[obj._src];
      node.bufferSource.connect(node.panner);
      node.bufferSource.loop = loop[0];
      if (loop[0]) {
        node.bufferSource.loopStart = loop[1];
        node.bufferSource.loopEnd = loop[1] + loop[2];
      }
      node.bufferSource.playbackRate.value = obj._rate;
    };

  }

  /**
   * Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
   */
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return {
        Howler: Howler,
        Howl: Howl
      };
    });
  }

  /**
   * Add support for CommonJS libraries such as browserify.
   */
  if (typeof exports !== 'undefined') {
    exports.Howler = Howler;
    exports.Howl = Howl;
  }

  // define globally in case AMD is not available or available but not used

  if (typeof window !== 'undefined') {
    window.Howler = Howler;
    window.Howl = Howl;
  }

})();

function DisplayableObject(){
	this.parent = null;
	this.x = this.y = 0;
	this.rotation = 0;
	this.scaleX = this.scaleY = 1;
	this.alpha = 1;
	this.visible = true;
};

DisplayableObject.prototype = {
	applyTransforms : function(c){
		if(this.x != 0 || this.y != 0)
			c.translate(~~this.x,~~this.y);
		if(this.scaleX != 1 || this.scaleY != 1)
			c.scale(this.scaleX,this.scaleY);
		if(this.rotation != 0)
			c.rotate(this.rotation);
		if(this.alpha != 1)
			c.globalAlpha *= this.alpha;
	},
	doRender : function(c){
		if(this.visible && this.alpha > 0.01 && this.scaleX != 0 && this.scaleY != 0){
			c.save();
			this.applyTransforms(c);
			this.render(c);
			c.restore();
		}
	},
	render : function(c){
		throw new Error('Rendering undefined');
	},
	remove : function(){
		if(this.parent){
			this.parent.removeChild(this);
		}
	},
	leaves : function(){
		return 1;
	}
};

function DisplayableContainer(){
	DisplayableObject.call(this);
	
	this.children = [];
};

DisplayableContainer.prototype = extendPrototype(DisplayableObject,{
	render : function(c){
        var i = -1;
		while(this.children[++i]){
			this.children[i].doRender(c);
		}
	},
	addChild : function(child){
		if(child.parent){
			child.parent.removeChild(child);
		}
		this.children.push(child);
		child.parent = this;
		child.parentIndex = this.children.length - 1;
	},
	removeChild : function(child){
		if(!isNaN(child.parentIndex)){
			this.children.splice(child.parentIndex,1);
			
			for(var i = child.parentIndex ; i < this.children.length ; i++){
				this.children[i].parentIndex--;
			}
			
			child.parent = null;
			child.parentIndex = null;
		}
	},
	clear : function(){
		// Updating children quickly
		for(var i in this.children){
			this.children[i].parent = null;
			this.children[i].parentIndex = null;
		}
		
		this.children = [];
	},
	leaves : function(){
		var total = 0;
		for(var i in this.children){
			total += this.children[i].leaves();
		}
		return total;
	}
});

function DisplayableImage(){
	DisplayableObject.call(this);
	
	this.image = null;
	this.anchorX = this.anchorY = 0;
};

DisplayableImage.prototype = extendPrototype(DisplayableObject,{
	render : function(c){
		c.drawImage(this.image,this.anchorX,this.anchorY);
	}
});

function DisplayableRectangle(){
	DisplayableContainer.call(this);
	
	this.color = '#000';
	this.width = 0;
	this.height = 0;
}

DisplayableRectangle.prototype = extendPrototype(DisplayableContainer,{
	render : function(c){
		c.fillStyle = this.color;
		c.fillRect(0,0,this.width,this.height);
		
		DisplayableContainer.prototype.render.call(this,c);
	}
});

function DisplayableShape(drawFunction){
	DisplayableObject.call(this);
	this.drawFunction = drawFunction;
};

DisplayableShape.prototype = extendPrototype(DisplayableObject,{
	render : function(c){
		this.drawFunction(c);
	}
});

function DisplayableTextField(){
	DisplayableObject.call(this);
	
	this.text = null;
	this.font = '12pt Arial';
	this.textAlign = 'left';
	this.textBaseline = 'top';
	this.color = '#000';
	this.shadowColor = null;
	this.shadowOffsetX = 0;
	this.shadowOffsetY = 0;
	this.outlineColor = null;
	this.outlineWidth = 0;
};

DisplayableTextField.prototype = extendPrototype(DisplayableObject,{
	render : function(c){
		if(this.text != null && this.text.length > 0){
			c.font = this.font;
			c.textAlign = this.textAlign;
			c.textBaseline = this.textBaseline;
			
			if(this.outlineColor){
				/*c.strokeStyle = this.outlineColor;
				c.lineWidth = this.outlineWidth;
				c.strokeText(this.text,0,0);*/
			
				c.fillStyle = this.outlineColor;
				for(var i = -this.outlineWidth ; i <= this.outlineWidth ; i++){
					for(var j = -this.outlineWidth ; j <= this.outlineWidth ; j++){
						c.fillText(this.text,i,j);
					}
				}
			}
			
			if(this.shadowColor){
				c.fillStyle = this.shadowColor;
				c.fillText(this.text,this.shadowOffsetX,this.shadowOffsetY);
			}
			
			c.fillStyle = this.color;
			c.fillText(this.text,0,0);
			
			if(this.outlineColor){
				/*c.strokeStyle = this.outlineColor;
				c.lineWidth = this.outlineWidth;
				c.strokeText(this.text,0,0);*/
			}
		}
	}
});
function Tween(object,property,from,to,duration,delay,onFinish){
	this.object = object;
	this.delayLeft = delay || 0;
	this.duration = duration;
	this.elapsed = 0;
	this.property = property;
	this.from = from;
	this.to = to;
	this.onFinish = onFinish;
    this.cancelled = false;
	
	object[property] = from;
}

Tween.prototype = {
	cycle : function(e){
		if(this.delayLeft > 0){
			this.delayLeft -= e;
			this.object[this.property] = this.from;
		}
		
		if(this.delayLeft <= 0){
			this.elapsed += e;
			if(this.elapsed >= this.duration){
				this.finish();
			}else{
				this.progress();
			}
		}
	},
	finish : function(){
		this.object[this.property] = this.to;
		
		if(this.onFinish){
			this.onFinish.call(this);
		}
	},
    cancel : function(){
        this.cancelled = true;
    },
	isFinished : function(){
		return this.elapsed >= this.duration || this.cancelled;
	},
	progress : function(){
		var prct = this.duration > 0 ? this.elapsed / this.duration : 1;
		this.object[this.property] = prct * (this.to - this.from) + this.from;
	}
}

function Interpolation(settings){
    this.object = settings.object;
    this.property = settings.property;
    this.delay = settings.delay || 0;
    this.duration = settings.duration || 1;
    this.from = settings.from;
    this.to = settings.to;
    this.easing = settings.easing || Math.linearTween;
    this.easingParameter = settings.easingParameter || null;
    this.onFinish = settings.onFinish || noop;
    this.applyFunction = settings.applyFunction || function(easing,duration,from,to,elapsed,easingParam){
        return easing(elapsed,from,to - from,duration,easingParam);
    };
    
    this.delayLeft = this.delay;
    this.elapsed = 0;
    this.cancelled = false;
}

Interpolation.prototype = {
    cycle : function(e){
		if(this.delayLeft > 0){
			this.delayLeft -= e;
			this.object[this.property] = this.from;
		}
		
		if(this.delayLeft <= 0){
			this.elapsed += e;
			if(this.elapsed >= this.duration){
				this.finish();
			}else{
				this.progress();
			}
		}
	},
	finish : function(){
		this.object[this.property] = this.to;
        this.onFinish.call(this);
	},
    cancel : function(){
        this.cancelled = true;
    },
	isFinished : function(){
		return this.elapsed >= this.duration || this.cancelled;
	},
	progress : function(){
        this.object[this.property] = this.applyFunction(
            this.easing,
            this.duration,
            this.from,
            this.to,
            this.elapsed,
            this.easingParameter
        );
	},
    invert : function(){
        this.elapsed = 0;
        
        var from = this.from;
        this.from = this.to;
        this.to = from;
    }
};
function Delay(settings){
    this.duration = settings.duration || 1;
    this.onFinish = settings.onFinish || noop;
	
	this.elapsed = 0;
}

Delay.prototype = {
    cycle : function(e){
		this.elapsed += e;
		if(this.elapsed >= this.duration){
			this.finish();
		}
	},
	finish : function(){
        this.onFinish.call(this);
	},
    cancel : function(){
        this.cancelled = true;
    },
	isFinished : function(){
		return this.elapsed >= this.duration || this.cancelled;
	},
	repeat : function(){
		this.elapsed = 0;
	}
};
var TweenPool = {
	tweens : [],
    speedFactor : 1,
	cycle : function(e){
		// Loop is kinda weird because we want the tweens to be performed
		// in the same order they were added
		var i = 0;
		while(this.tweens[i]){
			this.tweens[i].cycle(e * this.speedFactor);
			if(!this.tweens[i].isFinished()){
				i++;
			}else{
				this.tweens.splice(i,1);
			}
		}
	},
	remove : function(tw){
		var index = this.tweens.indexOf(tw);
		if(index >= 0){
			this.tweens.splice(index,1);
		}
	},
	add : function(tw){
		this.tweens.push(tw);
	},
    clear : function(){
        this.tweens = [];
    }
}

var ColorUtils = {
    fromString : function(s){
        if(s.charAt(0) == '#'){
            return this.fromHex(s);
        }
        return null;
    },
    fromHex : function(hex){
        hex = hex.replace('#','');

        var sr = hex.substr(0,2);
        var sg = hex.substr(2,2);
        var sb = hex.substr(4,2);
        var sa = hex.substr(6,2);
        
        var a = sa.length > 0 ? parseInt(sa) || 0 : 1;

        return {
            r : parseInt(sr,16) || 0,
            g : parseInt(sg,16) || 0,
            b : parseInt(sb,16) || 0,
            a : a,
        };
    },
    toString : function(c){
        return 'rgba(' + (~~c.r) + ',' + (~~c.g) + ',' + (~~c.b) + ',' + c.a + ')';
    },
    easingApply : function(easing,duration,from,to,elapsed,easingParam){
        var c1 = ColorUtils.fromString(from);
        var c2 = ColorUtils.fromString(to);
        
        var c3 = {
            r : Util.limit(easing(elapsed,c1.r,c2.r - c1.r,duration,easingParam),0,255),
            g : Util.limit(easing(elapsed,c1.g,c2.g - c1.g,duration,easingParam),0,255),
            b : Util.limit(easing(elapsed,c1.b,c2.b - c1.b,duration,easingParam),0,255),
            a : Util.limit(easing(elapsed,c1.a,c2.a - c1.a,duration,easingParam),0,1)
        };
        
        return ColorUtils.toString(c3);
    }
};

var P = {
	width : 640,
	height : 960,
	cocoon : !!window.isCocoon,
	amazon : location.search.indexOf('amazon') >= 0,
	highscoreKey : 'remvst-was-here-again',
	showFrameRate : location.search.indexOf('fps') >= 0,
	
	highscoreKey : 'remvst-was-here-again',
	totalScoreKey : 'remvst-is-bored',
	characterKey : 'remvst-wants-cookies'
};

window.addToHomeConfig = {
	touchIcon: true,
	autostart: false
};

var AdsSettings = {
	ads : {
		tablet : {
			slot : '/20973361/game7_iPad_300x600',
			width : 300,
			height : 600,
			interval : 2,
			check : function(){
				return navigator.userAgent.toLowerCase().indexOf('ipad') >= 0;
			}
		},
		mobile : {
			slot : '/20973361/game7_mobile_300x250',
			width : 300,
			height : 250,
			interval : 2,
			check : function(){
				return Util.isTouchScreen();
			}
		},
		web : {
			slot : '/20973361/game7_desktop_300x600',
			width : 300,
			height : 600,
			interval : 2,
			check : function(){
				return true;
			}
		}
	}
};

var resources = {
	folder : 'img/',
    image : {
		bg : 'bg.png',
		root : 'root.png',
		branch : 'branch.png',
		logo : 'logo.png',
		tap_left : 'tap-left.png',
		tap_right : 'tap-right.png',
		arrow_key : 'arrow-key.png',
		gameover_title : 'gameover-title.png',
		
		board : 'board.png',
		board_big : 'board-big.png',
		
		button_play : 'button-play.png',
		button_retry : 'button-retry.png',
		button_character : 'button-character.png',
		button_kik : 'button-kik.png',
		button_leaderboard : 'button-leaderboard.png',
		button_select : 'button-select.png',
		button_arrow_left : 'button-arrow-left.png',
		button_arrow_right : 'button-arrow-right.png'
    },
	sprite : {
		billy_idle : {sheet : 'characters.png',x : 0,y : 0,width : 350,height : 350},
		billy_cut : {sheet : 'characters.png',x : 350,y : 0,width : 350,height : 350},
		billy_dead : {sheet : 'characters.png',x : 700,y : 0,width : 350,height : 350},
		
		karateka_idle : {sheet : 'characters.png',x : 0,y : 350,width : 350,height : 350},
		karateka_cut : {sheet : 'characters.png',x : 350,y : 350,width : 350,height : 350},
		karateka_dead : {sheet : 'characters.png',x : 700,y : 350,width : 350,height : 350},
		
		alpaca_idle : {sheet : 'characters.png',x : 0,y : 700,width : 350,height : 350},
		alpaca_cut : {sheet : 'characters.png',x : 350,y : 700,width : 350,height : 350},
		alpaca_dead : {sheet : 'characters.png',x : 700,y : 700,width : 350,height : 350},
		
		ninja_idle : {sheet : 'characters.png',x : 0,y : 1050,width : 350,height : 350},
		ninja_cut : {sheet : 'characters.png',x : 350,y : 1050,width : 350,height : 350},
		ninja_dead : {sheet : 'characters.png',x : 700,y : 1050,width : 350,height : 350},
		
		bieber_idle : {sheet : 'characters.png',x : 0,y : 1400,width : 350,height : 350},
		bieber_cut : {sheet : 'characters.png',x : 350,y : 1400,width : 350,height : 350},
		bieber_dead : {sheet : 'characters.png',x : 700,y : 1400,width : 350,height : 350},
		
		smith_idle : {sheet : 'characters.png',x : 0,y : 1750,width : 350,height : 350},
		smith_cut : {sheet : 'characters.png',x : 350,y : 1750,width : 350,height : 350},
		smith_dead : {sheet : 'characters.png',x : 700,y : 1750,width : 350,height : 350}
	},
    pattern : {
		trunk : 'trunk.png'
    }
};

var R = {};

DOM.on(window,'load',function(){
    DOM.un(window,'load',arguments.callee);
	
	Tracker.beginStage('loading');
    
    can = DOM.get('gamecanvas');
    can.width = P.width;
    can.height = P.height;
	
	var dpr = window.devicePixelRatio || 1;
	if(dpr < 2){
		can.width /= 2;
		can.height /= 2;
	}
    
    ctx = can.getContext('2d');
	
    if(!Util.isTouchScreen()){
        // Ajout du CSS spécifique au desktop
        var link = document.createElement("link")
        link.setAttribute("rel","stylesheet")
        link.setAttribute("type","text/css")
        link.setAttribute("href",'css/desktop.css')
        document.head.appendChild(link)
    }
    
    //resizer.init(P.width,P.height,'viewport');
	window.resizer = new Resizer({
		element : DOM.get('viewport'),
		delay : 50,
		baseWidth : P.width,
		baseHeight : P.height,
		onResize : function(){
            window.scrollTo(0,1);
		}
	});
	//window.resizer.enabled = Util.isTouchScreen();
	
	var getDimensionsAndResize = function(){
		if(!P.cocoon){
			var w = window.innerWidth;
			var h = window.innerHeight;

			if(!Util.isTouchScreen()){
				w *= .85;
				h *= .85;
			}

			this.resizer.needsResize(w,h);
		}
	};
	DOM.on(window,'resize orientationchange',getDimensionsAndResize);
	getDimensionsAndResize();
    
    var loader = new ResourceLoader(resources);
    loader.load(function(res){
        R = res;
        
		if(dpr < 2){
			ctx.scale(.5,.5);
		}
		
        if(Util.isTouchScreen()){
            window.scrollTo(0,1);
        }
        
        new Game(resizer);
    },can);
});

function Game(){
	Game.instance = this;
	window.G = this;
	
	this.curScreen = null;
    this.curOverlay = null;
	
	this.stage = new DisplayableContainer();
    
	this.highscore = parseInt(Util.storage.getItem(P.highscoreKey)) || 0;
	if(location.search.indexOf('newgame') >= 0) this.highscore = 0;
	
	this.totalScore = parseInt(Util.storage.getItem(P.totalScoreKey)) || 0;
	if(location.search.indexOf('newgame') >= 0) this.totalScore = 0;
	
	this.currentCharacterId = parseInt(Util.storage.getItem(P.characterKey)) || 0;
	if(location.search.indexOf('newgame') >= 0) this.currentCharacterId = 0;
	
	this.characterSet = new CharacterSet(this);
	
	if(!this.characterSet.characters[this.currentCharacterId]){
		this.currentCharacterId = 0;
	}
	
	this.attempts = 0;
	this.newAttempt();
	this.mainMenu();
	
	
	this.soundManager = new SoundManager({
		//volume : P.cocoon && Detect.isAndroid() ? 0 : 1, // tmp cocoon fix for android
		sounds : [
			{
				id : 'chop',
				urls : ['sound/chop.mp3','sound/chop.ogg','sound/chop.wav'],
				volume : .3
			},
			{
				id : 'death',
				urls : ['sound/death.mp3','sound/death.ogg','sound/death.wav'],
				volume : .3
			}
		]
	});
    
	cycleManager.init(this.cycle.bind(this));
	
	// Events
	DOM.on(document.body,'touchstart mousedown',this.handleDownEvent.bind(this));
	DOM.on(document.body,'touchmove mousemove',this.handleMoveEvent.bind(this));
	DOM.on(document.body,'touchend mouseup touchcancel',this.handleUpEvent.bind(this));
	DOM.on(document.body,'keydown',this.handleKeyDownEvent.bind(this));
	DOM.on(document.body,'keyup',this.handleKeyUpEvent.bind(this));
    DOM.on(document.body,'mousewheel DOMMouseScroll',this.handleWheelEvent.bind(this));
	DOM.on(window,'deviceorientation', this.handleOrientationChange.bind(this));
	
	// Ads
	DOM.on('ad-close-button','click touchend',this.closeWebAd.bind(this));
	DOM.on('ad-overlay','click touchend',this.closeWebAd.bind(this));
	
	this.initAds();
	this.kikInit();
};

Game.prototype = {
	setScreen : function(screen){
        this.setOverlay(null);
		if(this.curScreen){
			this.curScreen.destroy();
		}
		
		this.curScreen = screen;
		this.curScreen.create();
		
		this.stage.clear();
		this.stage.addChild(this.curScreen.view);
        
		Tracker.beginStage('screen-' + screen.getId());
	},
    setOverlay : function(overlay){
        if(this.curOverlay){
			this.curOverlay.view.remove();
            this.curOverlay.destroy();
            this.curOverlay = null;
        }
        if(overlay){
            this.curOverlay = overlay;
            this.curOverlay.create();
            
            this.stage.addChild(this.curOverlay.view);
            
            Tracker.beginStage('overlay-' + overlay.getId());
        }
    },
	cycle : function(elapsed){
        var before = Date.now();

        (this.curOverlay || this.curScreen).cycle(elapsed);
        TweenPool.cycle(elapsed);

        var between = Date.now();

        this.stage.doRender(ctx);

        var after = Date.now();

        if(P.showFrameRate){
			ctx.font = '20pt Arial'
            ctx.textAlign = 'left';
            ctx.fillStyle = '#000';
            ctx.fillText('FPS: ' + cycleManager.fps,10,20);
            ctx.fillText('Total: ' + (after - before),10,40);
            ctx.fillText('Cycle: ' + (between - before),10,60);
            ctx.fillText('Render: ' + (after - between),10,80);
            ctx.fillText('Theoretical: ' + Math.round(1000 / Math.max(1,after - before)),10,100);
            ctx.fillText('Size: ' + this.stage.leaves(),10,120);
            ctx.fillText('TweenPool: ' + TweenPool.tweens.length,10,140);
        }
	},
	getPosition : function(e){
		if(e.touches) e = e.touches[0];
		
		var canRect = can.getBoundingClientRect();
		
		return {
			x : (e.clientX - canRect.left) / window.resizer.scaleX(),
			y : (e.clientY - canRect.top) / window.resizer.scaleY()
		};
	},
	handleDownEvent : function(e){
        var evtType = e.type.indexOf('touch') >= 0 ? 'touch' : 'mouse';
        
        this.inputType = this.inputType || evtType;
        
        if(evtType != this.inputType) return; 
        
        if(this.down) return;
        
        this.down = true;
        this.lastEvent = this.getPosition(e);
        
        (this.curOverlay || this.curScreen).touchStart(this.lastEvent.x,this.lastEvent.y);
		
		if(evtType == 'touch'){
			//e.preventDefault();
		}
	},
	handleMoveEvent : function(e){
		this.lastEvent = this.getPosition(e);
		if(this.down){
            e.preventDefault();
			(this.curOverlay || this.curScreen).touchMove(this.lastEvent.x,this.lastEvent.y);
		}
		
        var area = (this.curOverlay || this.curScreen).areaContains(this.lastEvent.x,this.lastEvent.y);
        if(!area){
			can.style.cursor = 'default';
        }else{
            can.style.cursor = area.cursor;
        }
		
		if(this.inputType == 'touch'){
			e.preventDefault();
		}
	},
	handleUpEvent : function(e){
		if(this.down){
			(this.curOverlay || this.curScreen).touchEnd(this.lastEvent.x,this.lastEvent.y);
			this.down = false;
			this.lastEvent = null;
		}
        window.scrollTo(0,1);
	},
    handleKeyDownEvent : function(e){
        (this.curOverlay || this.curScreen).keyDown(e.keyCode);
    },
    handleKeyUpEvent : function(e){
        (this.curOverlay || this.curScreen).keyUp(e.keyCode);
    },
    handleWheelEvent : function(e){
        var delta = Util.limit(e.wheelDelta || -e.detail,-1, 1);
        (this.curOverlay || this.curScreen).mouseWheel(delta);
    },
	handleOrientationChange : function(e){
		this.hasAccelerometer = true;
        (this.curOverlay || this.curScreen).orientationChange(e.alpha,e.beta,e.gamma);
	},
	mainMenu : function(){
		this.setOverlay(new MainMenuScreen(this));
	},
	closeMainMenu : function(){
		this.attempts++;
		this.setOverlay(null);
		
		addToHome.close();
	},
	retry : function(){
		this.attempts++;
		this.newAttempt();
		this.curScreen.showTutorial();
	},
    newAttempt : function(){
        this.setScreen(new GameplayScreen(this));
    },
	chooseCharacter : function(){
		if(this.curScreen.ended){
			this.newAttempt();
		}
		this.setOverlay(new CharacterScreen(this));
	},
    end : function(score){
 
        // window.location.href="objc://"+"showAd"; // by michael
 
		// Cross promo
		if(window.crossPromo){
			crossPromo.show();
		}
		
		// Add2home
		if(this.attempts == 2){
			addToHome.show();
		}
		
		var score = this.curScreen.score;
		
		// Highscore
		this.previousHighscore = this.highscore;
		this.highscore = Math.max(score,this.highscore);
		Util.storage.setItem(P.highscoreKey,this.highscore);
		
		// Total score
		this.totalScore += score;
		Util.storage.setItem(P.totalScoreKey,this.totalScore);
		
		// Global anal
		window.gmga('gamedone');
		
		// Game over scren
		this.setOverlay(new EndScreen(this,score));
		
//		// Leaderboard API
//        gmapi(function (api) {
//          	api.game.leaderboard.sendScore(score);
//        });
 
//		// Ads
//		if(this.attempts % this.adInterval == 0){
//			setTimeout(this.showAd.bind(this),2500);
//		}
 
		// Tracking
		var fifties = ~~(score / 50);
		var tier = fifties * 50;
		Tracker.event('result','tier-' + tier + '-' + (tier + 50));
    },
	initAds : function(){
        if(P.cocoon){
            this.initNativeAds();
        }else{
            this.initWebAds();
        }
    },
    initNativeAds : function(){
        if(!this.nativeAdsInitialized){
			this.adInterval = 2;
            this.nativeAdsInitialized = true;
            this.nativeAdsReady = false;
            
            console.log('Initializing cocoon native ads');

            var me = this;

			CocoonJS.Ad.onFullScreenShown.addEventListener(function(){
				console.log('fullscreen shown');
				CocoonJS.Ad.refreshFullScreen();
			});
			CocoonJS.Ad.onFullScreenHidden.addEventListener(function(){
				console.log('fullscreen hidden');
			});
			CocoonJS.Ad.onFullScreenReady.addEventListener(function(){
				console.log('fullscreen ready');
				me.nativeAdsReady = true;
			});

			setTimeout(function(){
				CocoonJS.Ad.preloadFullScreen();
			},1000);
        }
    },
    showAd : function(){
        console.log('Trying to show an ad');
        if(this.googleAdsInitted){
            this.showWebAd();
        }else if(P.cocoon){
            this.showNativeAd();
        }
    },
    showNativeAd : function(){
        console.log('Showing a native ad');
        return CocoonJS.Ad.showFullScreen();
    },
    initWebAds : function(){
        var ad,iframe,container,me = this;
		
		if(this.googleAdsInitted){
			return;
		}
		
		this.adCreated = false;
		this.googleAdsInitted = true;
		
		for(var i in AdsSettings.ads){
			if(AdsSettings.ads[i].check()){
				ad = AdsSettings.ads[i];
				break;
			}
		}
		
		if(ad){
			this.adSettings = ad;
			this.adSlot = null;
			this.adInterval = ad.interval;
			
			googletag.cmd.push(function() {
				me.adSlot = googletag.defineSlot(
					ad.slot, 
					[ad.width, ad.height], 
					'ad'
				).addService(googletag.pubads());
				googletag.pubads().enableSingleRequest();
				googletag.enableServices();
				
				me.adCreated = true;
                
                googletag.display('ad');
                Tracker.event('ad-web','ad-web-initialize-success');
			});
			
			var container = DOM.get('ad-container');
			container.style.width = ad.width + 'px';
			container.style.height = ad.height + 'px';
		}
    },
    showWebAd : function(){
        if(!this.webAdOpen){
            this.webAdOpen = true;
            googletag.cmd.push(function () {
                googletag.pubads().refresh([me.adSlot]);
            });
            DOM.show('ad-overlay');
            Tracker.event('ad-web','ad-web-show-success');
        }
    },
    closeWebAd : function(){
        if(this.webAdOpen){
            this.webAdOpen = false;
            DOM.hide('ad-overlay');
            Tracker.event('ad-web','ad-web-close');
        }
    },
    kikInit : function(){
        if(window.kik){
            if(kik.push){
				if(kik.push.handler){
					kik.push.handler(function (data) {
						Tracker.event('kik-push-notification','open');
					});
				}
				if(kik.push.getToken){
					kik.push.getToken(function(token){
						if(token){
							Ajax.send('tokencollect','post',{
								token : token
							});
						}
					});
				}
            }
			
			if(kik.browser){
				if(kik.browser.setOrientationLock){
					kik.browser.setOrientationLock('portrait');
				}
				if(kik.browser.statusBar){
					kik.browser.statusBar(false);
				}
				if(kik.browser.backlightTimeout){
					kik.browser.backlightTimeout(false);
				}
			}
            if(kik.message){
                Tracker.event('kik-message','kik-message-open');
            }
        }
    }
};

function Screen(game){
	this.game = game;
	this.areas = [];
	this.currentActionArea = null;
	this.view = null;
}

Screen.prototype = {
    getId : function(){
        return 'unnamed';
    },
	cycle : function(elapsed){
		
	},
	touchStart : function(x,y){
		for(var i in this.areas){
			if(this.areas[i].enabled && this.areas[i].contains(x,y)){
				this.currentActionArea = this.areas[i];
				this.currentActionArea.actionStart(x,y);
				break;
			}
		}
	},
	touchMove : function(x,y){
        if(this.currentActionArea){
            if(!this.currentActionArea.contains(x,y)){
                this.currentActionArea.actionCancel(x,y);
                this.currentActionArea = null;
            }else{
                this.currentActionArea.actionMove(x,y);
            }
        }
	},
	touchEnd : function(x,y){
		if(this.currentActionArea && this.currentActionArea.contains(x,y)){
			this.currentActionArea.actionPerformed(x,y);
		}
		this.currentActionArea = null;
	},
    keyDown : function(keyCode){
        
    },
    keyUp : function(keyCode){
        
    },
    mouseWheel : function(delta){
        
    },
	orientationChange : function(alpha,beta,gamma){
		
	},
	create : function(){
		
	},
	destroy : function(){
		
	},
	addArea : function(area){
		this.areas.push(area);
	},
	areaContains : function(x,y){
		for(var i in this.areas){
			if(this.areas[i].enabled && this.areas[i].contains(x,y)){
				return this.areas[i];
			}
		}
		return null;
	}
}

function Area(settings){
	settings = settings || {};
    
	this.x = settings.x || 0;
	this.y = settings.y || 0;
	this.width = settings.width || 0;
	this.height = settings.height || 0;
	this.cursor = settings.cursor || 'pointer';
	
	this.onactionperformed = settings.actionPerformed || noop;
	this.onactionstart = settings.actionStart || noop;
	this.onactioncancel = settings.actionCancel || noop;
	this.onactionmove = settings.actionMove || noop;
	
	this.enabled = true;
}

Area.prototype = {
	contains : function(x,y){
		return x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height;
	},
	actionPerformed : function(x,y){
        this.onactionperformed(x,y);
	},
	actionStart : function(x,y){
        this.onactionstart(x,y);
	},
	actionCancel : function(x,y){
        this.onactioncancel(x,y);
	},
	actionMove : function(x,y){
        this.onactionmove(x,y);
	}
}

function Button(settings){
    DisplayableContainer.call(this);
    Area.call(this,0,0,0,0);
    this.enabled = true;
    this.pressed = false;
    this.setup(settings);
}

Button.prototype = extendPrototype([DisplayableContainer,Area],{
    setup : function(settings){
        this.action = settings.action || this.action || noop;
        
        if('enabled' in settings){
            this.enabled = settings.enabled;
        }

        this.bgColor = settings.bgColor || '#ffffff';
        this.borderColor = settings.lineColor || '#000';
        this.borderRadius = isNaN(settings.borderRadius) ? 10 : settings.borderRadius;
        this.textColor = settings.textColor || '#000';
        this.textFont = settings.textFont || 'Arial';
        this.fontSize = settings.fontSize || 20;
        this.outlineColor = settings.outlineColor || '#000';
        this.outlineWidth = settings.outlineWidth || 0;
        this.id = settings.id || undefined;
	   	this.setContent(settings.content);
		
        this.width = settings.width || this.width || 404;
        this.height = settings.height || this.height || 125;
    },
	setContent : function(arg0){
		this.text = this.image = null;			
		if(arg0.length){
			this.type = 'text';
			
			this.text = arg0;
			this.id = this.text;
		}else if(arg0.width){
			this.type = 'image';
			
			this.image = arg0;
			
			// Image
			this.width = this.width || arg0.width;
			this.height = this.height || arg0.height;
		}else{
			this.type = 'object';
			this.addChild(arg0);
		}
	},
    render : function(c){
		c.globalAlpha *= !this.enabled ? .5 : 1;
		if(this.pressed) c.translate(0,5);
		
        c.font = this.fontSize + 'pt ' + this.textFont;
        c.textAlign = 'center';
        c.textBaseline = 'middle';

        // Text
        if(this.type == 'text'){
            c.fillStyle = this.textColor;
            c.fillText(this.text,this.width / 2,this.height / 2);
        }else if(this.type == 'image'){
            c.drawImage(
                this.image,
                0,
                0,
                this.image.width,
                this.image.height,
                (this.width - this.image.width) / 2,
                (this.height - this.image.height) / 2,
                this.image.width,
                this.image.height
            );
        }

        if(this.outlineWidth > 0){
            c.lineWidth = this.outlineWidth;
            c.strokeStyle = this.outlineColor;
            c.strokeText(this.text,this.width / 2,this.height / 2 + 3);
        }
		
		DisplayableContainer.prototype.render.call(this,c);
    },
	actionPerformed : function(x,y){
        this.pressed = false;
        if(this.enabled){
            this.action();
			
			if(this.id){
				Tracker.event('button-click','button-' + this.id);
			}
        }
	},
	actionStart : function(x,y){
        this.pressed = true;
	},
	actionCancel : function(x,y){
        this.pressed = false;
	}
});
function SoundManager(settings){
	this.soundMap = {};
	this.loadSettings(settings);
};

SoundManager.prototype = {
	loadSettings : function(settings){
        this.volume = isNaN(settings.volume) ? 1 : settings.volume;
		for(var i in settings.sounds){
			this.soundMap[settings.sounds[i].id] = this.prepareSound(settings.sounds[i]);
		}
	},
	prepareSound : function(settings){
		return new Howl({
			urls : settings.urls,
			volume : (settings.volume || 1) * this.volume,
			loop : !!settings.loop,
			preload : true
		});
	},
	play : function(id){
		if(this.soundMap[id]){
			var soundObject = this.soundMap[id];
			this.soundMap[id].play(function(id){
				soundObject.instanceId = id;
			});
		}
	},
	stop : function(id){
		if(this.soundMap[id]){
			this.soundMap[id].stop(this.soundMap[id].instanceId);
		}
	},
	pause : function(id){
		if(this.soundMap[id]){
			this.soundMap[id].pause(this.soundMap[id].instanceId);
		}
	},
    fadeOut : function(id){
		if(this.soundMap[id]){
			this.soundMap[id].fadeOut(this.soundMap[id].instanceId);
		}
    }
};
(function(){
	if(!P.cocoon){
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	}else if(!window.cordova){
		var interfaceReady = false;
		var queue = [];

		var flushQueue = function(){
			var cmd;
			while(cmd = queue.shift()){
				forwardCmd(cmd);
			}
		};

		var forwardCmd = function(cmd){
			console.log('Sending ' + cmd + ' to the Webview');
			CocoonJS.App.forwardAsync(cmd);
		};

		var addToQueue = function(cmd){
			queue.push(cmd);
			if(interfaceReady){
				flushQueue();
			}
		};

		// CocoonJS loading event doesn't work too well, so we need to wait for an actual answer
		window.gaInterfaceIsReady = function(){
			CocoonJS.App.forwardAsync("CocoonJS.App.show(0, 0, " + window.innerWidth * window.devicePixelRatio + "," + window.innerHeight * window.devicePixelRatio + ");");
			interfaceReady = true;
			flushQueue();
		};

		console.log('Creating GAI interface');
		//CocoonJS.App.loadInTheWebView("http://10.11.2.151:8888/cocoonoverlay.html?currentGame=karatecrush");
		CocoonJS.App.loadInTheWebView("http://more.gamemix.com/cocoonoverlay.html?currentGame=karatecrush");

		// Defining GAO to add stuff to the eventqueue 
		window.ga = function(){
			var args = '';
			for(var i = 0 ; i < arguments.length ; i++){
				if(i > 0){
					args += ',';
				}
				args += JSON.stringify(arguments[i]);
			}

			var cmd = 'window.ga(' + args + ')';
			addToQueue(cmd);
		};
		
		console.log('webview loading');
	}
	
	ga('require', 'displayfeatures');
	ga('create','UA-53201710-1');
	
	(function(g,m,c,d,a){g['GameMixGA']=a;g[a]=g[a]||function(f){
	g[a].q=g[a].q||[];g[a].q.push(f);};g[a]({gmgaDomain:d});
	var s=m.createElement(c),p=m.getElementsByTagName(c)[0];
	s.type='text/javascript';s.async=true;s.src=d+'/client/gmga.js';
	p.parentNode.insertBefore(s,p);
	}(window, document, 'script', 'http://gmga.gamemix.com', 'gmga'));
   
	gmga('karatecrush');
})();
var Tracker = {
	suffix : function(){
        if('standalone' in window.navigator && navigator.standalone){
            return '-homescreen';
        }else if(window.cordova || P.cocoon){
			return '-native';
		}else if(window.kik && kik.send){
			return '-kik';
		}else if(P.amazon){
			return '-amazon';
		}else{
			return '-web';
		}
	},
    event : function(eventCategory,eventLabel,eventValue){
		if(window.cordova && window.gaPlugin){
			gaPlugin.trackEvent(function(){
				console.log('Sent event data');
			}, function(e){
				console.log('Error while sending event data: ' + e);
			}, 'gameevent', eventCategory + this.suffix(), eventLabel + this.suffix(), eventValue || 0);
		}else if(window.ga){
            ga('send', 'event', 'gameevent', eventCategory + this.suffix(),eventLabel + this.suffix(),eventValue || 0);
        }
    },
	beginStage : function(stageLabel){
		var page = '/stage-' + stageLabel + this.suffix();
		if(window.cordova && window.gaPlugin){
			gaPlugin.trackPage(function(){
				console.log('Sent page view');
			}, function(e){
				console.log('Error while sending page view: ' + e);
			}, page);
		}else if(window.ga){
			ga('send','pageview',page);
		}
	}
};
function MainMenuScreen(game){
	Screen.call(this,game);
}

MainMenuScreen.prototype = extendPrototype(Screen,{
	getId : function(){
		return 'mainmenu';
	},
	create : function(){
		this.view = new DisplayableContainer();
		
		this.logo = new DisplayableImage();
		this.logo.image = R.image.logo;
		this.logo.anchorX = -this.logo.image.width / 2;
		this.logo.anchorY = -this.logo.image.height / 2;
		this.logo.x = P.width / 2;
		this.logo.y = 200;
		this.view.addChild(this.logo);
		
		var buttons = [];
		
		if(!P.cocoon){
//			buttons.push(this.leaderboardButton = new Button({
//				id : 'character',
//				content : R.image.button_leaderboard,
//				action : this.leaderboard.bind(this)
//			}));
		}
		
		buttons.push(this.playButton = new Button({
			id : 'play',
			content : R.image.button_play,
			textColor : 'white',
			action : this.play.bind(this)
		}));
		
		buttons.push(this.characterButton = new Button({
			id : 'character',
			content : R.image.button_character,
			action : this.character.bind(this)
		}));
		
        var buttonWidth = 200;
		
        for(var i = 0 ; i < buttons.length ; i++){
            buttons[i].x = (i + .5 - buttons.length / 2) * buttonWidth + P.width / 2 - buttons[i].width / 2;
            buttons[i].y = P.height - 130;
            
            this.view.addChild(buttons[i]);
            this.addArea(buttons[i]);
        }
		
		var middleArea = new Area({
			x : 100,
			y : 400,
			width : P.width - 200,
			height : 400,
			actionPerformed : this.play.bind(this)
		});
		this.addArea(middleArea);
	},
	play : function(){
		this.game.curScreen.showTutorial();
		this.game.closeMainMenu();
	},
	character : function(){
		this.game.chooseCharacter();
	},
	leaderboard : function(){
		setTimeout(function(){
			gmapi(function (api) {
				api.game.leaderboard.show();
			});
		},500);
	},
	keyDown : function(k){
		if(k == 13 || k == 32){
			this.play();
		}
	}
});
function CharacterSet(game){
	this.game = game;
	
	this.characters = [{
		name : 'Karateka',
		score : 0,
		totalScore : 0,
		character_idle : R.sprite.karateka_idle,
		character_cut : R.sprite.karateka_cut,
		character_dead : R.sprite.karateka_dead
	},{
		name : 'Hilly Billy',
		score : 50,
		totalScore : 500,
		character_idle : R.sprite.billy_idle,
		character_cut : R.sprite.billy_cut,
		character_dead : R.sprite.billy_dead
	},{
		name : 'Ninja',
		score : 200,
		totalScore : 2500,
		character_idle : R.sprite.ninja_idle,
		character_cut : R.sprite.ninja_cut,
		character_dead : R.sprite.ninja_dead
	},{
		name : 'Agent Smith',
		score : 300,
		totalScore : 8000,
		character_idle : R.sprite.smith_idle,
		character_cut : R.sprite.smith_cut,
		character_dead : R.sprite.smith_dead
	},{
		name : 'Alpaca',
		score : 350,
		totalScore : 15000,
		character_idle : R.sprite.alpaca_idle,
		character_cut : R.sprite.alpaca_cut,
		character_dead : R.sprite.alpaca_dead
	},{
		name : 'Justin',
		score : 400,
		totalScore : 20000,
		character_idle : R.sprite.bieber_idle,
		character_cut : R.sprite.bieber_cut,
		character_dead : R.sprite.bieber_dead
	}];
};

CharacterSet.prototype = {
	getUnlockedCharacters : function(){
		var hs = this.game.highscore,res = [];
		for(var i in this.characters){
			if(this.characters[i].score <= this.game.highscore
			  || this.characters[i].totalScore <= this.game.totalScore){
				res.push(this.characters[i]);
			}
		}
		return res;
	}
};
function CharacterScreen(game){
	Screen.call(this,game);
}

CharacterScreen.prototype = extendPrototype(Screen,{
	getId : function(){
		return 'character';
	},
	create : function(){
		this.view = new DisplayableContainer();
		
		this.board = new DisplayableImage();
		this.board.image = R.image.board_big;
		this.board.x = (P.width - this.board.image.width) / 2;
		this.board.y = 40;
		this.view.addChild(this.board);
		
		this.nameTf = new DisplayableTextField();
		this.view.addChild(this.nameTf);
		with(this.nameTf){
			x = P.width / 2;
			y = this.board.y + 70;
			color = '#ffffff';
			font = '40pt Pixel';
			textAlign = 'center';
			textBaseline = 'middle';
			shadowColor = '#000';
			shadowOffsetX = 4;
			shadowOffsetY = 4;
		}
		
		this.scoreLabel = new DisplayableTextField();
		this.view.addChild(this.scoreLabel);
		with(this.scoreLabel){
			x = ~~(P.width / 3);
			y = this.board.y + 140;
			color = '#ffffff';
			font = '25pt Pixel';
			textAlign = 'center';
			textBaseline = 'middle';
			shadowColor = '#000';
			shadowOffsetX = 4;
			shadowOffsetY = 4;
			text = 'Best:';
		}
		
		this.totalScoreLabel = new DisplayableTextField();
		this.view.addChild(this.totalScoreLabel);
		with(this.totalScoreLabel){
			x = ~~(P.width * 2 / 3);
			y = this.scoreLabel.y;
			color = '#ffffff';
			font = this.scoreLabel.font;
			textAlign = 'center';
			textBaseline = 'middle';
			shadowColor = '#000';
			shadowOffsetX = 4;
			shadowOffsetY = 4;
			text = 'Total:';
		}
		
		this.scoreTf = new DisplayableTextField();
		this.view.addChild(this.scoreTf);
		with(this.scoreTf){
			x = ~~(P.width / 3);
			y = this.board.y + 190;
			color = '#ffffff';
			font = '40pt Pixel';
			textAlign = 'center';
			textBaseline = 'middle';
			shadowColor = '#000';
			shadowOffsetX = 4;
			shadowOffsetY = 4;
		}
		
		this.totalScoreTf = new DisplayableTextField();
		this.view.addChild(this.totalScoreTf);
		with(this.totalScoreTf){
			x = this.totalScoreLabel.x;
			y = this.scoreTf.y;
			color = '#ffffff';
			font = this.scoreTf.font;
			textAlign = 'center';
			textBaseline = 'middle';
			shadowColor = '#000';
			shadowOffsetX = 4;
			shadowOffsetY = 4;
		}
		
		this.statusTf = new DisplayableTextField();
		this.view.addChild(this.statusTf);
		with(this.statusTf){
			x = P.width / 2;
			y = this.board.y + 260;
			font = '30pt Pixel';
			textAlign = 'center';
			textBaseline = 'middle';
			shadowColor = '#000';
			shadowOffsetX = 4;
			shadowOffsetY = 4;
		}
		
		this.backButton = new Button({
			id : 'back',
			content : R.image.button_select,
			action : this.back.bind(this)
		});
		this.backButton.x = (P.width - this.backButton.width) / 2;
		this.backButton.y = P.height - 130;
		this.view.addChild(this.backButton);
		this.addArea(this.backButton);
		
		this.nextButton = new Button({
			id : 'next',
			content : R.image.button_arrow_right,
			action : this.next.bind(this)
		});
		this.nextButton.x = P.width - 50 - this.nextButton.width;
		this.nextButton.y = this.backButton.y;
		this.view.addChild(this.nextButton);
		this.addArea(this.nextButton);
		
		this.previousButton = new Button({
			id : 'previous',
			content : R.image.button_arrow_left,
			action : this.previous.bind(this)
		});
		this.previousButton.x = 50;
		this.previousButton.y = this.backButton.y;
		this.view.addChild(this.previousButton);
		this.addArea(this.previousButton);
		
		this.update(true);
	},
	next : function(){
		this.game.currentCharacterId = (this.game.currentCharacterId + 1) % this.game.characterSet.characters.length;
		this.update();
	},
	previous : function(){
		this.game.currentCharacterId = (this.game.currentCharacterId - 1 + this.game.characterSet.characters.length) % this.game.characterSet.characters.length;
		this.update();
	},
	update : function(keepCurrent){
		if(!keepCurrent){
			this.game.curScreen.updateCharacter();
		}
		
		var settings =  this.game.characterSet.characters[this.game.currentCharacterId];
		this.nameTf.text = settings.name;
		this.scoreTf.text = settings.score.toString();
		this.totalScoreTf.text = settings.totalScore.toString();
		
		var unlocked = this.game.highscore >= settings.score || this.game.totalScore >= settings.totalScore;
		this.backButton.enabled = unlocked;
		this.statusTf.text = unlocked ? 'AVAILABLE' : 'LOCKED';
		this.statusTf.color = unlocked ? '#00ff00' : '#ff0000';
		this.scoreTf.color = this.game.highscore >= settings.score ? '#00ff00' : '#ff0000';
		this.totalScoreTf.color = this.game.totalScore >= settings.totalScore ? '#00ff00' : '#ff0000';
	},
	back : function(){
		// Save
		Util.storage.setItem(P.characterKey,this.game.currentCharacterId);
		
		this.game.mainMenu();
	},
	keyDown : function(keyCode){
		if(keyCode == 37){
			this.previous();
		}else if(keyCode == 39){
			this.next();
		}else if((keyCode == 13 || this.keyCode == 32) && this.backButton.enabled){
			this.back();
		}
	}
});
function GameplayScreen(game){
	Screen.call(this,game);
}

GameplayScreen.SIDE_LEFT = 1;
GameplayScreen.SIDE_RIGHT = 2;

GameplayScreen.prototype = extendPrototype(Screen,{
	getId : function(){
		return 'gameplay';
	},
	create : function(){
		this.view = new DisplayableContainer();
		
		this.bg = new DisplayableImage();
		this.bg.image = R.image.bg;
		this.view.addChild(this.bg);
		
		this.tree = new Tree(this);
		this.tree.x = P.width / 2;
		this.tree.y = 640;
		this.view.addChild(this.tree);
		
		this.updateCharacter();
		
		this.score = 0;
		
		this.scoreTf = new DisplayableTextField();
		this.view.addChild(this.scoreTf);
		with(this.scoreTf){
			x = P.width - 20;
			y = 60;
			textAlign = 'right';
			textBaseline = 'middle';
			font = 'bold 80pt Pixel';
			color = '#ffffff';
			visible = false;
			//shadowColor = '#000';
			shadowOffsetX = 5;
			shadowOffsetY = 5;
			outlineColor = '#000';
			outlineWidth = 2;
		}
		
		this.meter = new PowerMeter(this);
		this.meter.x = P.width / 2;
		this.meter.y = 40;
		this.meter.visible = false;
		this.view.addChild(this.meter);
		
		this.tapLeft = new DisplayableImage();
		this.tapLeft.image = Util.isTouchScreen() ? R.image.tap_left : R.image.arrow_key;
		this.tapLeft.anchorX = -this.tapLeft.image.width / 2;
		this.tapLeft.anchorY = -this.tapLeft.image.height / 2;
		this.tapLeft.x = P.width / 4;
		this.tapLeft.y = P.height / 2;
		this.tapLeft.alpha = 0;
		this.view.addChild(this.tapLeft);
		
		this.tapRight = new DisplayableImage();
		this.tapRight.image = Util.isTouchScreen() ? R.image.tap_right : R.image.arrow_key;
		if(!Util.isTouchScreen()) this.tapRight.scaleX = -1;
		this.tapRight.anchorX = -this.tapRight.image.width / 2;
		this.tapRight.anchorY = -this.tapRight.image.height / 2;
		this.tapRight.x = P.width * 3 / 4;
		this.tapRight.y = P.height / 2;
		this.tapRight.alpha = 0;
		this.view.addChild(this.tapRight);
		
		this.power = .5;
		this.powerLoss = .2;
		this.powerGain = .1;
		
		this.nextLevel = 25;
		this.currentLevel = 1;
		
		this.started = false;
	},
	cut : function(side){
		if(!this.ended){
			if(!this.started){
				this.started = true;
				
				/*TweenPool.add(new Tween(this.logo,'alpha',1,0,.5,0,function(){
					this.object.remove();
				}));*/
				this.meter.visible = true;
				this.scoreTf.visible = true;
				
				if(window.crossPromo){
					crossPromo.hide();
				}
				this.blinkPower();
			}
			
			this.character.cutAnimation();
			this.character.setPosition(side);
			this.tree.cut(side);
			
			this.game.soundManager.play('chop');

			this.score++;
			this.scoreTf.text = this.score.toString();
			
			this.power = Math.min(1,this.power + this.powerGain);
			
			// Tutorial
			if(side == GameplayScreen.SIDE_LEFT){
				this.tapLeft.visible = false;
			}else{
				this.tapRight.visible = false;
			}
			if(!this.tapRight.visible && !this.tapLeft.visible){
				clearInterval(this.invertInterval);
			}
			
			this.nextLevel--;
			if(this.nextLevel == 0){
				this.goToNextLevel();
			}
			
			this.meter.flash();
		}
	},
	goToNextLevel : function(){
		if(!this.ended){
			this.nextLevel = 25;
			this.currentLevel++;
			
			if(this.score < 350){
				this.powerLoss *= 1.1;
			}
			//this.powerGain *= .98;
			
			this.announce('Level ' + this.currentLevel);
		}
	},
	invertTap : function(){
		this.tapLeft.alpha = this.tapRight.alpha;
		this.tapRight.alpha = 1 - this.tapLeft.alpha;
	},
	touchStart : function(x,y){
		this.cut(x < P.width / 2 ? GameplayScreen.SIDE_LEFT : GameplayScreen.SIDE_RIGHT);
	},
	keyDown : function(keyCode){
		if(keyCode == 37){
			this.cut(GameplayScreen.SIDE_LEFT);
		}else if(keyCode == 39){
			this.cut(GameplayScreen.SIDE_RIGHT);
		}
	},
	cycle : function(e){
		if(this.started){
			if(!this.ended){
				this.power = Math.max(0,this.power - this.powerLoss * e);
				if(this.power == 0){
					this.announce('No power');
					
					this.blinkPower();
					this.gameOver();
				}
			}
		}
	},
	gameOver : function(){
		if(!this.ended){
			this.ended = true;
			this.character.deathAnimation();
			this.game.soundManager.play('death');
			
			var me = this;
			setTimeout(function(){
				me.scoreTf.visible = false;
				me.meter.visible = false;
				me.meter.alpha = 0; // in case it blinks
			},1500);
			
			setTimeout(this.game.end.bind(this.game),1500);
			
			this.tapLeft.visible = false;
			this.tapRight.visible = false;
		}
	},
	blinkPower : function(){
		var me = this;
		var hide = function(){
			me.meter.visible = false;	
		};
		var show = function(){
			me.meter.visible = true;	
		};
		var step = 450;
		for(var t = 0 ; t < 2000 ; t += step){
			setTimeout(hide,t);
			setTimeout(show,t + step / 2);
		}
	},
	announce : function(t){
		if(this.announcement){
			this.announcement.remove();
		}
		
		this.announcement = new DisplayableTextField();
		this.view.addChild(this.announcement);
		with(this.announcement){
			x = P.width / 2;
			y = P.height * 0.3;
			text = t;
			color = '#ffffff';
			textAlign = 'center';
			textBaseline = 'middle';
			font = '60pt Pixel';
			shadowColor = '#000';
			shadowOffsetX = 5;
			shadowOffsetY = 5;
		}

		TweenPool.add(new Interpolation({
			object : this.announcement,
			property : 'y',
			from : -50,
			to : this.announcement.y,
			duration : .2,
			easing : Math.easeOutCubic,
			onFinish : function(){
				TweenPool.add(new Interpolation({
					object : this.object,
					property : 'y',
					from : this.object.y,
					to : -50,
					duration : .2,
					delay : 1.5,
					easing : Math.easeInCubic,
					onFinish : function(){
						this.object.remove();
					}
				}));
			}
		}));
	},
	showTutorial : function(){
		this.invertTap();
		this.invertInterval = setInterval(this.invertTap.bind(this),500);
	},
	updateCharacter : function(){
		if(this.character){
			this.character.remove();
		}
		
		this.character = new Character(this,this.game.characterSet.characters[this.game.currentCharacterId]);
		this.view.addChild(this.character);
	}
});
function Character(screen,settings){
	DisplayableContainer.call(this);
	this.screen = screen;
	
	this.settings = settings;
	
	this.image = new DisplayableImage();
	this.image.image = R.sprite.character_idle;
	this.image.image = settings.character_idle;
	this.image.anchorX = -this.image.image.width / 2;
	this.image.anchorY = -this.image.image.height;
	this.addChild(this.image);
	
	this.setPosition(GameplayScreen.SIDE_LEFT,true);
	
	TweenPool.add(new Interpolation({
		object : this,
		property : 'x',
		from : -200,
		to : this.x,
		duration : .2,
		easing : Math.linearTween
	}));
	
	this.y = 860;
	
	this.resetTo = null;
	this.cutTo = null;
}

Character.prototype = extendPrototype(DisplayableContainer,{
	setPosition : function(position,fast){
		position = position || GameplayScreen.SIDE_LEFT;
		
		this.side = position;
		
		var x;
		
		if(position == GameplayScreen.SIDE_LEFT){
			x = 200;
			this.scaleX = 1;
		}else{
			x = P.width - 200;
			this.scaleX = -1;
		}
		
		if(fast){
			this.x = x;
		}else if(this.x != x){
			TweenPool.add(new Tween(this,'x',this.x,x,.05));
		}
	},
	cutAnimation : function(){
		clearTimeout(this.resetTo);
		clearTimeout(this.cutTo);
		
		var me = this;
		
		this.image.image = R.sprite.character_idle;
		this.image.image = this.settings.character_idle;
		
		this.cutTo = setTimeout(function(){
			me.image.image = R.sprite.character_cut;
			me.image.image = me.settings.character_cut;
		},20);
		
		this.resetTo = setTimeout(this.resetPosition.bind(this),200);
	},
	resetPosition : function(){
		this.image.image = this.settings.character_idle;
	},
	deathAnimation : function(){
		clearTimeout(this.resetTo);
		clearTimeout(this.cutTo);
		
		this.image.image = this.settings.character_dead;
		
		var me = this;
		var hide = function(){
			me.image.visible = false;	
		};
		var show = function(){
			me.image.visible = true;	
		};
		setTimeout(hide,150);
		setTimeout(show,300);
		setTimeout(hide,450);
		setTimeout(show,600);
		setTimeout(hide,750);
		setTimeout(show,900);
		setTimeout(hide,1050);
		
		navigator.vibrate(200);
	}
});
function Branch(tree,side,index){
	DisplayableContainer.call(this);
	
	this.tree = tree;
	this.side = side;
	this.index = index;
	
	this.scaleX = this.side == GameplayScreen.SIDE_LEFT ? -1 : 1;
	
	this.image = new DisplayableImage();
	this.image.image = R.image.branch;
	this.image.x = 25;
	this.addChild(this.image);
	
	this.y = -this.index * 153;
}

Branch.prototype = extendPrototype(DisplayableContainer,{
	down : function(){
		this.index--;
		
		if(this.downInterpolation){
			this.downInterpolation.cancel();
		}
		
		TweenPool.add(this.downInterpolation = new Interpolation({
			object : this,
			property : 'y',
			from : this.y,
			to : -this.index * 153,
			duration : .1
		}));
			
		if(this.index == 0){
			if(this.tree.screen.character.side == this.side){
				this.tree.screen.gameOver();
			}else{
				this.tree.removeBranch(this);
			}
		}
	}
});
function Tree(screen){
	DisplayableContainer.call(this);
	
	this.screen = screen;
	
	this.trunk = new DisplayableRectangle();
	this.trunk.width = 52;
	this.trunk.height = 153 * 5;
	this.trunk.x = -this.trunk.width / 2;
	this.trunk.y = -this.trunk.height;
	this.trunk.color = R.pattern.trunk;
	this.addChild(this.trunk);
	
	this.root = new DisplayableImage();
	this.root.image = R.image.root;
	this.root.anchorX = -this.root.image.width / 2;
	this.addChild(this.root);
	
	this.branches = [];
	
	this.nextBranch = 6;
}

Tree.prototype = extendPrototype(DisplayableContainer,{
	cut : function(fromSide){
		fromSide = fromSide || GameplayScreen.SIDE_LEFT;
		
		var direction = fromSide == GameplayScreen.SIDE_LEFT ? 1 : -1;
		
		var cutHeight = 153;
		
		if(this.trunkInterpolation){
			this.trunkInterpolation.cancel();
		}
		
		TweenPool.add(this.trunkInterpolation = new Interpolation({
			object : this.trunk,
			property : 'y',
			from : -this.trunk.height-cutHeight,
			to : - this.trunk.height,
			duration : .1
		}));
		
		var cutContainer = new DisplayableContainer();
		this.addChild(cutContainer);
		
		var cut = new DisplayableRectangle();
		cut.width = this.trunk.width;
		cut.height = cutHeight;
		cut.color = this.trunk.color;
		cut.x = -cut.width / 2;
		cut.y = -cut.height / 2;
		cutContainer.addChild(cut);
		
		cutContainer.y = -cutHeight / 2;
		
		TweenPool.add(new Interpolation({
			object : cutContainer,
			property : 'x',
			from : 0,
			to : direction * 300,
			duration : .2
		}));
		TweenPool.add(new Interpolation({
			object : cutContainer,
			property : 'rotation',
			from : 0,
			to : -direction * Math.PI / 2,
			duration : .2
		}));
		TweenPool.add(new Interpolation({
			object : cutContainer,
			property : 'alpha',
			from : 1,
			to : 0,
			duration : .2,
			onFinish : function(){
				this.object.remove();
			}
		}));
		
		// TODO make all branches go down too
		var i = this.branches.length;
		while(--i >= 0){
			this.branches[i].down();
		}
		
		this.nextBranch--;
		if(this.nextBranch == 0){
			this.nextBranch = ~~Util.rand(2,5);
			this.addBranch(5);
		}
	},
	addBranch : function(index){
		var side = Util.randomPick(GameplayScreen.SIDE_LEFT,GameplayScreen.SIDE_RIGHT);
		var b = new Branch(this,side,index);
		this.addChild(b);
		this.branches.push(b);
	},
	removeBranch : function(branch){
		var ind = this.branches.indexOf(branch);
		this.branches.splice(ind,1);
		//branch.remove();
		
		var direction = (branch.side == GameplayScreen.SIDE_LEFT ? -1 : 1);
		var d = .1;
		TweenPool.add(new Interpolation({
			object : branch,
			property : 'x',
			from : branch.x,
			to : branch.x + direction * 100,
			duration : .1
		}));
		TweenPool.add(new Interpolation({
			object : branch,
			property : 'y',
			from : branch.y,
			to : branch.y - 100,
			duration : .1
		}));
		TweenPool.add(new Interpolation({
			object : branch,
			property : 'rotation',
			from : 0,
			to : Math.PI / 2,
			duration : .1
		}));
		TweenPool.add(new Interpolation({
			object : branch,
			property : 'alpha',
			from : 1,
			to : 0,
			duration : .1,
			onFinish : function(){
				this.object.remove();
			}
		}));
	}
});
function PowerMeter(screen){
	DisplayableContainer.call(this);
	this.screen = screen;
	
	var me = this;
	var w = 200;
	var h = 10;
	var powerTmp = 0;
	this.addChild(new DisplayableShape(function(c){
		c.fillStyle = '#f4b271';
		c.fillRect(-w/2,-h/2,w,-h);
		c.fillRect(-w/2,h/2,w,h);
		c.fillRect(-w/2,-h/2,-h,h);
		c.fillRect(w/2,-h/2,h,h);
		c.fillRect(-w/2-h,-h/2 - h,2*h+w,h*3);
		
		c.fillStyle = '#3a2212';
		c.fillRect(-w/2,-h/2,w,h);
		
		c.fillStyle = '#ff0000';
		c.fillRect(-w/2,-h/2,w * me.screen.power,h);
		
		c.globalAlpha = me.maskAlpha;
		c.fillStyle = '#ffffff';
		c.fillRect(-w / 2 - h, -h / 2 - h,w + 2 * h,3 * h);
	}));
}

PowerMeter.prototype = extendPrototype(DisplayableContainer,{
	flash : function(){
		if(this.flashInterpolation){
			this.flashInterpolation.cancel();
		}
		
		TweenPool.add(this.flashInterpolation = new Tween(this,'maskAlpha',1,0,.1));
	}
});
function EndScreen(game,score){
	Screen.call(this,game);
	
	this.score = score;
}

EndScreen.prototype = extendPrototype(Screen,{
	getId : function(){
		return 'end';
	},
	create : function(){
		this.view = new DisplayableContainer();
		
		this.title = new DisplayableImage();
		this.title.image = R.image.gameover_title;
		this.title.anchorX = -this.title.image.width / 2;
		this.title.anchorY = -this.title.image.height / 2;
		this.title.x = P.width / 2;
		this.title.y = 180;
		this.view.addChild(this.title);
		
		this.boardContainer = new DisplayableContainer();
		this.view.addChild(this.boardContainer);
		
		this.board = new DisplayableImage();
		this.board.image = R.image.board;
		this.board.x = (P.width - this.board.image.width) / 2;
		this.board.y = (P.height - this.board.image.height) / 2 - 20;
		this.boardContainer.addChild(this.board);
		
		this.scoreLabel = new DisplayableTextField();
		this.boardContainer.addChild(this.scoreLabel);
		with(this.scoreLabel){
			x = P.width / 2 + 40;
			y = ~~(this.board.y + this.board.image.height * .33);
			color = '#ffffff';
			font = '40pt Pixel';
			text = 'Score:';
			textAlign = 'right';
			textBaseline = 'middle';
			shadowColor = '#000';
			shadowOffsetX = 4;
			shadowOffsetY = 4;
		}
		
		this.scoreTf = new DisplayableTextField();
		this.boardContainer.addChild(this.scoreTf);
		with(this.scoreTf){
			x = this.scoreLabel.x + 20;
			y = this.scoreLabel.y;
			color = '#ffffff';
			font = '60pt Pixel';
			text = '135';
			textAlign = 'left';
			textBaseline = 'middle';
			shadowColor = '#000';
			shadowOffsetX = 4;
			shadowOffsetY = 4;
		}
		
		this.bestLabel = new DisplayableTextField();
		this.boardContainer.addChild(this.bestLabel);
		with(this.bestLabel){
			x = this.scoreLabel.x;
			y = ~~(this.board.y + this.board.image.height * .66);
			color = '#ffffff';
			font = '40pt Pixel';
			text = 'Best:';
			textAlign = 'right';
			textBaseline = 'middle';
			shadowColor = '#000';
			shadowOffsetX = 4;
			shadowOffsetY = 4;
		}
		
		this.bestTf = new DisplayableTextField();
		this.boardContainer.addChild(this.bestTf);
		with(this.bestTf){
			x = this.scoreTf.x;
			y = this.bestLabel.y;
			color = '#ffffff';
			font = '60pt Pixel';
			text = '0';
			textAlign = 'left';
			textBaseline = 'middle';
			shadowColor = '#000';
			shadowOffsetX = 4;
			shadowOffsetY = 4;
		}
		
		this.buttonsContainer = new DisplayableContainer();
		this.view.addChild(this.buttonsContainer);
		
        var me = this;
        var buttons = [];
		buttons.push(this.retryButton = new Button({
			id : 'retry',
			content : R.image.button_retry,
			action : this.retry.bind(this)
		}));
		if(!P.cocoon){
//            buttons.push(this.leaderboardButton = new Button({
//                id : 'menu',
//                content : R.image.button_leaderboard,
//				action : this.leaderboard.bind(this)
//            }));
		}
		
		buttons.push(this.characterButton = new Button({
			id : 'character-end',
			content : R.image.button_character,
			action : this.character.bind(this)
		}));
        
        if(window.kik && kik.send){
            buttons.push(this.kikButton = new Button({
                id : 'kik',
                content : R.image.button_kik,
				action : this.kik.bind(this)
            }));
        }
        
        var buttonWidth = 200,
			lineSize = buttons.length <= 3 ? 3 : 2,
			lineHeight = 120,
			lines = ~~(buttons.length / lineSize) + 1,
			y = P.height - 130 - lines / 2 * lineHeight;
		
        for(var i = 0,k = 0 ; i < buttons.length ; i++, k++){
			if(i > 0 && i % lineSize == 0){
				y += lineHeight;
				k = 0;
			}
			
			// The min is kind of a hack
            buttons[i].x = (k + .5 - Math.min(lineSize,buttons.length) / 2) * buttonWidth + P.width / 2 - buttons[i].width / 2;
            buttons[i].y = y;
			buttons[i].enabled = false;
            
            this.buttonsContainer.addChild(buttons[i]);
            this.addArea(buttons[i]);
        }
		
		this.displayedScore = 0;
		
		var d = 1,me = this;
		
		TweenPool.add(new Interpolation({
			object : this,
			property : 'displayedScore',
			from : 0,
			to : this.score,
			duration : d,
			delay : .7
		}));
		
		TweenPool.add(new Interpolation({
			object : this.title,
			property : 'y',
			from : - 200,
			to : this.title.y,
			duration : .7,
			easing : Math.easeOutCubic
		}));
		
		TweenPool.add(new Interpolation({
			object : this.boardContainer,
			property : 'y',
			from : P.height,
			to : 0,
			duration : .7,
			delay : .7,
			easing : Math.easeOutCubic
		}));
		
		TweenPool.add(new Interpolation({
			object : this.buttonsContainer,
			property : 'alpha',
			from : 0,
			to : 1,
			duration : .7,
			delay : .7 + d,
			onFinish : function(){
				for(var i in me.buttonsContainer.children){
					me.buttonsContainer.children[i].enabled = true;
				}
			}
		}));
		
		if(this.score > this.game.previousHighscore){
			var t = 1.4 + d;
            TweenPool.add(new Interpolation({
                object : this.scoreTf,
                property : 'color',
                from : '#ffffff',
                to : '#ff0000',
                duration : 1,
                applyFunction : ColorUtils.easingApply,
				delay : t,
                onFinish : function(){
                    this.invert();
                }
            }));
            TweenPool.add(new Interpolation({
                object : this.scoreLabel,
                property : 'color',
                from : '#ffffff',
                to : '#ff0000',
                duration : 1,
                applyFunction : ColorUtils.easingApply,
				delay : t,
                onFinish : function(){
                    this.invert();
                }
            }));
            TweenPool.add(new Interpolation({
                object : this.bestLabel,
                property : 'color',
                from : '#ffffff',
                to : '#ff0000',
                duration : 1,
                applyFunction : ColorUtils.easingApply,
				delay : t,
                onFinish : function(){
                    this.invert();
                }
            }));
            TweenPool.add(new Interpolation({
                object : this.bestTf,
                property : 'color',
                from : '#ffffff',
                to : '#ff0000',
                duration : 1,
                applyFunction : ColorUtils.easingApply,
				delay : t,
                onFinish : function(){
                    this.invert();
                }
            }));
		}
	},
	cycle : function(e){
		this.scoreTf.text = (~~this.displayedScore).toString();
		this.bestTf.text = Math.max(this.game.previousHighscore,~~this.displayedScore).toString();
	},
	retry : function(){
		this.game.retry();
	},
	leaderboard : function(){
		setTimeout(function(){
			gmapi(function (api) {
				api.game.leaderboard.show();
			});
		},500);
	},
	kik : function(){
		kik.send({
			title : 'I scored ' + this.score + ' on Karate Crush!',
			text : 'Can you beat me?',
			pic : 'promo/icon-128x128.png',
			data : {
				score : this.score,
				date : Date.now()
			}
		});
	},
	character : function(){
		this.game.chooseCharacter();
	},
	keyDown : function(k){
		if((k == 13 || k == 32) && this.retryButton.enabled){
			this.retry();
		}
	}
});
})()
