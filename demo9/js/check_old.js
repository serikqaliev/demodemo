
function CheckForOldBrowser()
{
  var ua = navigator.userAgent;

  var c_start = ua.indexOf("MSIE ");
  if ( c_start != -1 )
     {
       c_start = c_start + 5;
       var c_end = ua.indexOf(";",c_start);
       if (c_end==-1) c_end = ua.indexOf(")",c_start);
       if (c_end==-1) c_end = ua.length;
       var f_ver = parseFloat(ua.substring(c_start,c_end));
       if ( f_ver < 8.0 )
          {
            alert(S_IECOMPATMODE_ALERT);
            location.href = 'about:blank';
          }
     }
}


function CheckForCookiesOff()
{
  if ( !navigator.cookieEnabled )
     {
       alert('Cookies are not enabled! Cannot continue.');
       location.href = 'about:blank';
     }
}



CheckForOldBrowser();
CheckForCookiesOff();

