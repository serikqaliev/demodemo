

function FF_Init(padding,initial_html,initial_url,initial_bg,on_close_during_navigation,caption_close,caption_new_window)
{
  if ( document.forms.length > 0 )
     {
       new CFormFrame(document.forms[0],padding,initial_html,initial_url,initial_bg,on_close_during_navigation,caption_close,caption_new_window);
     }
}


function FF_Close()
{
  var obj = FF_GetObj();
  if ( obj )
     {
       obj.Close();
     }
}


function FF_IsVisible()
{
  var obj = FF_GetObj();
  return obj ? obj.IsVisible() : false;
}


function FF_IsNavigating()
{
  var obj = FF_GetObj();
  return obj ? obj.IsNavigating() : false;
}


////////////////////////


function FF_GetObj()
{
  return document.forms.length > 0 ? document.forms[0].formFrame : null;
}


// internal callback
function FF_OnEscPressed()
{
  FF_Close();
}


// class
function CFormFrame(form,padding,initial_html,initial_url,initial_bg,on_close_during_navigation,caption_close,caption_new_window)
{
  // constructor:
  this.padding = padding;
  this.initialHTML = initial_html;
  this.initialURL = initial_url;
  this.onCloseDuringNavigation = on_close_during_navigation;
  this.isVisible = false;
  this.isNav = false;

  var random_name = 'iframe_rnd_'+Math.floor((Math.random()*10000)+1); // used as iframe id and name

  // prepare form
  this.form = form;
  form.mySelf = this;
  form.formFrame = this;
  form.target = random_name;
  form.onsubmit = function() { return false; };
  form.submitOrig = form.submit;
  form.submit = function() { this.mySelf.submit(); };

  // global shader
  var div = document.createElement('div');
  this.div = div;
  div.mySelf = this;
  div.style.display = 'none';  // initially hidden
  div.style.position = 'absolute';
  div.style.zIndex = 99;
  div.style.left = '0';
  div.style.top = '0';
  div.style.width = '100%';
  div.style.height = '100%';
  div.style.overflow = 'hidden';
  div.style.margin = '0';
  div.style.padding = '0';
  div.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEa8AABGvAff9S4QAAAANSURBVBhXY/j///8dAAnYA9rffqZJAAAAAElFTkSuQmCC")';
  if ( window.addEventListener )
   window.addEventListener('resize',function() { FF_GetObj().onResize(); });
  else
   div.onresize = function() { this.mySelf.onResize(); };

  // close 'x' button
  var btnx = document.createElement('div');
  this.btnx = btnx;
  btnx.mySelf = this;
  btnx.style.position = 'absolute';
  btnx.style.zIndex = 101;
  btnx.style.width = '48px';
  btnx.style.height = '48px';
  btnx.style.margin = '0';
  btnx.style.padding = '0';
  btnx.style.backgroundImage = 'url("data:image/png;base64,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")';
  btnx.style.cursor = 'pointer';
  btnx.title = caption_close;
  btnx.onclick = function() { this.mySelf.onCloseButtonClick(); };
  div.appendChild(btnx);

  // new window button
  var btnn = document.createElement('div');
  this.btnn = btnn;
  btnn.mySelf = this;
  btnn.style.position = 'absolute';
  btnn.style.zIndex = 101;
  btnn.style.width = '48px';
  btnn.style.height = '48px';
  btnn.style.margin = '0';
  btnn.style.padding = '0';
  btnn.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD1ElEQVRoge1ZTUsjSRh+qrp6krRxkhjJQSGHYVAkRPYg+5sGnIt/YmDZ3aOCrIfBfzBzECJz2X8geJXFyBzUQ2u62+6kP1J70G4r/WF3J2kVxgcCb6reVJ633s9OgDe84dcGKZfLlFJapZS+e2kyIjzPMyzLGqbpsVar9ZEx9jdjrFU0KUIIGo0G6vU6OOcYj8eQJAkAYNt2oKNpGq6vr7/1+/0vaWcyy7LeS5L0uyRJhRsAAO12G2tra3AcB8PhEAsLCwCAq6srmKYJSZIwGAxgmuZ/Wc5jlFLIsoxOp4N6vR5scM5BCInIs4BzDlmWoet64AHDMAAAlUoFiqLA8zxcXl6CUprpTAYAtVoNOzs72NjYACEEnPPED4j7WeS8sG0be3t76Pf72QwghIAxhlarhdXV1YnNIryQhtFohMXFxcz61L+p8I29BPlpwMQ3cUYk7RWFvN8TGMA5T/zwcDh8NgNGoxEcxwHnnFWrVSVO54GrbZqmy8QwiSOpaRp2d3fhum6xzB9QKpVwcXGBdrv9m6Iof8iyDOD+Ev2eoes6VFX99/b29juLIy2uqaqKg4ODmUjlqVydTgebm5tYWVn5eHNz87nRaAAAzs/PA13HcWDbdtV13R+JOeB7ZjweAwCazSYqlcpMhmSBZVk4OTkBAHieF9y667pg7J6upmngnFPOOSZCSIQYUsvLy9je3ka3281NKKmazSLv7++j1+uBUooghETCYbcqioJut4utra3cBhSBo6MjAPc8g34drvNJnpkWSSV5FhnAYwj5m4SQiDG+d2Y1Zp7EgftLZuGweYrka+nIIlcWXnhKeVovFJHIPmhaI0silFUukjwh5HGY8xfCROLIiQelyXl0s8oip8RRIi6snmseyopIEie5Xdz394p8qEmDeG4kB/zRIS0nsrpdDKV5ySKCWShJIWxE3tsP95V5yCKnSB8QiYebXNYHnufMGxpHMmtTyyMXhdQnsqca2UsRn0hikVjSK4xp63YRYHFJmzbM5e3ERSKYhUzTDH4lE3F3dxdL8LWAcc5hGAYODw/RbDYjCpqmAcBEj8hTSosOJeY4zk/DMP48Pj6Osgfgum59fX39k0/Kx2vJA6aq6iWAv5IUyuXyBwCfxLVpp8ciwNIU0oa9rPI8MVFG8ygnrb+KRpaG8KDnJ2kWed7I5YG4EJomgWcJv6e8miuEpk3KIh8rM4WQpmno9Xo4OzubyoB54/T09DFM05RLpdLS0tLSP4SQbH9aPRM8z+vpuv41U0zUarWWJEkUQCQ5X6ITPxQUYzAYRGefN7whH/4HkVa34it6+SsAAAAASUVORK5CYII=")';
  btnn.style.cursor = 'pointer';
  btnn.title = caption_new_window;
  btnn.onclick = function() { this.mySelf.onNewWindowButtonClick(); };
  div.appendChild(btnn);

  // iframe
  var iframe = document.createElement('iframe');
  this.iframe = iframe;
  iframe.mySelf = this;
  iframe.id = random_name;
  iframe.name = random_name;
  iframe.frameBorder = '0';  // IE8
  iframe.style.position = 'absolute';
  iframe.style.zIndex = 100;
  iframe.style.border = '0';
  iframe.style.margin = '0';
  iframe.style.padding = '0';
  iframe.style.background = initial_bg;
  iframe.style.boxShadow = '2px 2px 25px 5px rgba(0,0,0,0.5)';
  //iframe.style.borderRadius = '5px';
  // event, init_html and src will be set later...
  div.appendChild(iframe);



  // public members:
  this.GetForm = function()
  {
    return this.form;
  }
  
  this.IsVisible = function()
  {
    return this.isVisible;
  }
  
  this.IsNavigating = function()
  {
    return this.isNav;
  }
  
  this.Close = function()
  {
    this.closeInternal();
  }
  

  // private members:
  this.submit = function()
  {
    if ( this.isVisible && !this.isNav )
       {
         this.writeInitialHTML();  // this action not produce any events
       }
    
    this.onResize();

    this.btnn.style.display = 'none';
    this.btnx.style.display = '';
    this.iframe.style.display = '';

    this.isVisible = true;
    this.isNav = true;

    $(this.div).fadeIn();

    this.form.submitOrig();
  }

  this.closeInternal = function()
  {
    if ( this.isVisible )
       {
         this.isVisible = false;
         this.isNav = false;
       
         this.btnn.style.display = 'none';
         this.btnx.style.display = 'none';
         this.iframe.style.display = 'none';
         this.writeInitialHTML();
         this.iframe.src = this.initialURL;  // navigate to initial URL in hidden iframe
         $(this.div).fadeOut();

         window.focus();
       }
  }

  this.onResize = function()
  {
    var ww = $(window).width();
    var wh = $(window).height();
    
    var _x = this.padding;
    var _y = this.padding;
    var _w = ww - 2*_x;
    var _h = wh - 2*_y;

    if ( _w < 20 )
     _w = 20;
    if ( _h < 20 )
     _h = 20;

    this.iframe.style.left = _x+'px';
    this.iframe.style.top = _y+'px';
    this.iframe.style.width = _w+'px';
    this.iframe.style.height = _h+'px';

    var left = ww-2-48;
    var top = 2;
    this.btnx.style.left = left+'px';
    this.btnx.style.top = top+'px';

    left -= 50;
    this.btnn.style.left = left+'px';
    this.btnn.style.top = top+'px';
  }

  this.writeInitialHTML = function()
  {
    try {
     this.iframe.contentDocument.write(this.initialHTML);  // this action is not produce event onload
    } catch(err)
    {
    }
  }

  this.onLoad = function()  // called when about:blank, initialURL or form.action is loaded
  {
    if ( this.isNav )
       {
         this.isNav = false;
         this.btnn.style.display = '';

         try {
          if ( this.iframe.contentWindow )
             {
               this.iframe.contentWindow.focus();
               
               if ( this.iframe.contentWindow.onkeydown == null )
                  {
                    this.iframe.contentWindow.onkeydown = 
                    function(e) 
                    { 
                      var keynum = 0;

                      if(window.event) // IE
                      {
                        keynum = e.keyCode;
                      }
                      else if(e.which) // Netscape/Firefox/Opera
                      {
                        keynum = e.which;
                      }
                      
                      if ( keynum == 27 ) 
                         { 
                           try { 
                            top.FF_OnEscPressed(); 
                           } catch(err){} 
                         } 
                    
                      return true;
                    };
                  }
             }
         } catch(err)
         {
         }
       }
  }
  
  this.onCloseButtonClick = function()
  {
    var allow = true;

    if ( this.isNav )
       {
         if ( this.onCloseDuringNavigation )
            {
              allow = this.onCloseDuringNavigation(this);
            }
       }

    if ( allow )
       {
         this.closeInternal();
       }
  }

  this.onNewWindowButtonClick = function()
  {
    try {
     window.open(this.iframe.contentWindow.location.href);
    } catch(err)
    {
      alert(err.message);
    }
  }


  // finish initialization
  this.writeInitialHTML();
  iframe.src = initial_url;
  if ( iframe.attachEvent )  
   iframe.attachEvent('onload',function(){ FF_GetObj().onLoad(); }); //IE8
  else
   iframe.onload = function() { this.mySelf.onLoad(); };

  document.body.appendChild(div);  // only after that events can fire on iframe
}


