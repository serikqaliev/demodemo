
function IsExternal()
{
  return false;  // for old cached pages
}


function SetCookie(c_name,value,expiredays,path)
{
  var exdate=new Date();
  if ( expiredays != null )
     {
       exdate.setDate(exdate.getDate()+expiredays);
     }
  document.cookie=c_name+ "=" +encodeURIComponent(value)+ ((path == null || path == '') ? "" : "; path="+path) +
   ((expiredays==null) ? "" : "; expires="+exdate.toUTCString()) + "; SameSite=Lax";
}


function GetCookie(c_name)
{
  if (document.cookie.length>0)
     {
       var c_start=document.cookie.indexOf(c_name + "=");
       if (c_start!=-1)
          {
            c_start=c_start + c_name.length+1;
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return decodeURIComponent(document.cookie.substring(c_start,c_end));
          }
     }
  return "";
}


function GetProductOption(product,option,def)
{
  var t = GetCookie(product+'_'+option);
  if ( !t || t == '' )
     t = (def==null?'':def);
  return t;
}


function SetProductOption(product,option,value,expiredays,path)
{
  if ( value == null )
     value = '';
  
  SetCookie(product+'_'+option,value,expiredays,path);
}


function IsIE()
{
  return (navigator.userAgent.indexOf('MSIE ')!=-1) || (navigator.userAgent.indexOf('Trident/')!=-1);
}


function SetVisibility(id,state)
{
  if ( state )
     {
       document.getElementById(id).style.visibility = 'visible';
     }
  else
     {
       document.getElementById(id).style.visibility = 'hidden';
     }
}


function SetVisible(id,state)
{
  if ( state )
     {
       document.getElementById(id).style.display = '';  // will be default
     }
  else
     {
       document.getElementById(id).style.display = 'none';
     }
}


function IsVisible(id)
{
  return (document.getElementById(id).style.display != 'none');
}


function EscapeUnsafeHTMLChars(text)
{
  var s = (text==null?'':text);
  s = s.replace(/\x26/gi,'&amp;');
  s = s.replace(/\x3C/gi,'&lt;');
  s = s.replace(/\x3E/gi,'&gt;');
  s = s.replace(/\x20/gi,'&nbsp;');
  return s;
}


function SetCaption(id,text)
{
  document.getElementById(id).innerHTML = EscapeUnsafeHTMLChars(text);
}


function SetCaptionAccurate(id,text)
{
  var el = document.getElementById(id);
  
  if ( el.childNodes && el.childNodes.length > 0 )
     el.childNodes[0].data = (text==null?'':text);
  else
     el.innerHTML = EscapeUnsafeHTMLChars(text);
}


function GetDDMMYYYY(obj)
{
  var y = obj.getFullYear();
  var m = obj.getMonth()+1;
  var d = obj.getDate();

  var s = '';

  if ( d < 10 )
     s += '0';
  s += d;
  s += '.';

  if ( m < 10 )
     s += '0';
  s += m;
  s += '.';

  s += y;

  return s;
}


function IsStringsAreEqualI(_s1,_s2)
{
  var s1 = (_s1==null?'':_s1);
  var s2 = (_s2==null?'':_s2);

  return s1.toLowerCase() == s2.toLowerCase();
}


function GetFirstSingleNodeValueSafe(el,name)
{
  var rc = '';
  
  try {
   rc = el.getElementsByTagName(name)[0].childNodes[0].nodeValue;
  } catch(err) {}

  return (rc==null?'':rc);
}


function GetKeyPressedCode(e)
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

  return keynum;
}


/////////////////////////////////////////


function AsyncReq()
{
  // constructor:
  this.ajax = null;


  // public:
  this.Destructor = function()
  {
    this.ajax = null;
  }

  this.NewRequest = function(fail_if_busy,url,body)
  {
    if ( fail_if_busy && this.IsBusy() )
       {
         return false;
       }

    if ( url == null || url == '' )
       {
         return false;
       }

    if ( !this.ajax )
       {
         this.ajax = this.createAjaxObj();

         if ( !this.ajax )
            {
              return false;
            }
       }

    var is_post = (body!=null && body!='');
    
    this.ajax.open(is_post?'POST':'GET',url,true);  // abort() automatically called if needed here

    if ( is_post )
       {
         this.ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
       }

    this.ajax.send(body);
    return true;
  }

  this.Abort = function()
  {
    if ( this.ajax )
       {
         try {
          this.ajax.abort();
         } catch(e) {}

         this.ajax = null;
       }
  }

  this.Clear = function()
  {
    this.ajax = null;
  }

  this.IsBusy = function()
  {
    return this.ajax && (this.ajax.readyState >= 1 && this.ajax.readyState <= 3);
  }

  this.IsResultReady = function()
  {
    return this.ajax && this.ajax.readyState == 4;
  }

  this.GetResultHTTPStatus = function()
  {
    return this.IsResultReady() ? this.ajax.status : -1;
  }

  this.GetResultAsXML = function()
  {
    return this.IsResultReady() ? this.ajax.responseXML : null;
  }

  this.GetResultAsText = function()
  {
    return this.IsResultReady() ? this.ajax.responseText : null;
  }

  this.GetResultHeader = function(header)
  {
    return this.IsResultReady() ? this.ajax.getResponseHeader(header) : null;
  }


  // private
  this.createAjaxObj = function()
  {
    var request=null;

    // пытаемся создать объект для MSXML 2 и старше
    if(!request) try {
      request=new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e){}

    // не вышло... попробуем для MSXML 1
    if(!request) try {
      request=new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e){}

    // не вышло... попробуем для Mozilla
    if(!request) try {
      request=new XMLHttpRequest();
    } catch (e){}

    return request;
  }

} //AsyncReq


/////////////////////////////////////////


function __VER_GetProdId()
{
  return 'g27632';
}


function IsCorpView()
{
  return GetProductOption(__VER_GetProdId(),'corpview','') == '1';
}


function SetCorpView(is_corp_view)
{
  SetProductOption(__VER_GetProdId(),'corpview',is_corp_view?'1':'0',720,'/');
}


/////////////////////////////////////////


function CheckIfCookieBlockedWithAlert()
{
  SetCookie('aaa29','1');
  var c = GetCookie('aaa29');
  if ( c != '1' )
     {
       alert(S_COOKIES_BLOCKED_ALERT);
     }
}


function CheckIfPageCachedAfterUpdateWithAlert(ref)
{
  var v = GetCookie('stkh_version');
  if ( v != '' )
     {
       if ( v != ref )
          {
            alert(S_OLD_PAGE_WAS_CACHED);
          }
     }
}



