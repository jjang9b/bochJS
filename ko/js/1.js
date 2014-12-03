var _boch = {

  t : new Date().getTime(),
  pg_current_page : 0,
  pg_current_screen_page : 0,
  pg_current_state : 2,

  hl : function(){
        
    boch.insertJS( 'js/lib/highlight.pack.js', false );

    var hljs = window.hljs || undefined;

    setTimeout( function(){

      if( hljs !== undefined ){
      
        hljs.configure({ tabReplace:' ' });
        hljs.initHighlighting();

      }
        
    }, 20);

  },

  down : function( a, t ){
  
    switch( parseInt( t ) ){

      case 1:

        a.href = 'js/lib/boch.js';
        a.download = 'boch.js';
        break;
      case 2:

        a.href = 'js/lib/boch.min.js';
        a.download = 'boch.min.js';
        break;
    }

    var s_result = _boch.xhr( 'api/stats.php', '?type=2&down_type=' + t );
    log( 'download statics is ', s_result );

  },

  href : function( u ){ location.href = u; 
  },

  xhr : function( url, p ){

   var xhr = null
   , data = null;

   if ( window.XMLHttpRequest ) {

     xhr = new window.XMLHttpRequest();

   } else if ( window.ActiveXObject ){

     xhr = new window.ActiveXObject( 'Microsoft.XMLHTTP' );

   }

   xhr.open( 'GET', url + p, false );
   xhr.setRequestHeader('Content-type', 'text/plain;charset=euc-kr' );
   xhr.onreadystatechange = function(){

     if( xhr.readyState == 4 ){

       if( xhr.status == 200 ){

         try{ data = JSON.parse( xhr.responseText ); 
         } catch( e ) { log( xhr.responseText, e ); } 

         if( data != null && data.error )
           log( 'api Error is ' + data.msg );

       }

     }

   }

   xhr.send();

   return data;
       
  },

  setVoid : function(){

    var a = document.getElementsByTagName( 'a' );
    for( var i = 0, j = a.length; i < j; i++ ){ a[ i ].href = 'javascript:void(0)'; }

  },

  isMobile : function(){
             
    var _agent = navigator.userAgent.toLowerCase()
    , _magent = [ 'iphone', 'ipod', 'ipad', 'android', 'blackberry', 'windows ce','nokia', 
      'webos', 'opera mini', 'sonyericsson', 'opera mobi', 'iemobile' ];

    for( var i = 0, j = _magent.length; i < j; i++ ){

      if( _agent.indexOf( _magent[ i ] ) != -1 ){ 

        return true;
     
      }
    
    }

    return false;

  },
  
  isModern : function(){

    var agent = navigator.userAgent.toString();
    
    if( agent.indexOf( 'MSIE' ) != -1 ){
      
      var ie_agent = agent.match(/Trident\/(\d)/i);

      if( ie_agent == null ) return false;

      var ver = ie_agent[ 0 ].substr( ie_agent[ 0 ].length -1, 1 );

      if( parseInt( ver ) >= 5 ){ return true; 
      } else { return false; }

    } else {

      return true;
    
    }

  },

  isIe : function(){

    if( navigator.appName == "Microsoft Internet Explorer" || 
        navigator.userAgent.indexOf( 'Trident' ) >= 0 ) 
      return true;
    else return false;

  },

  md_open : function(){

    var a = document.getElementById( 'md_modern_overlay' );
    a.style.display = 'block';

    var b = document.getElementById( 'md_modern_msg' );
    b.style.display = 'block';

  }

};


(function(){
 
  function _b_home(){ boch.boching( 'b_main' ); }

  function _b_download(){ boch.insertJS( 'js/download.js?t=' + _boch.t, true ); }
  function _b_playground(){ boch.insertJS( 'js/pg.js?t=' + _boch.t, true ); }
  function _b_stats(){ boch.insertJS( 'js/stats.js?t=' + _boch.t, true ); }

  function _b_setvalue(){

    var data = { no:1, name:'name1', conts:'conts1' };
    boch.setValue( 'b_setvalue', data );

  }

  function _b_setiterate(){

    var data = [];

    data[ 0 ] = [ 
      { no:1, name:'name1', conts:'conts1' }, 
      { no:2, name:'name2', conts:'conts2' }, 
      { no:3, name:'name3', conts:'conts3' }, 
      { no:4, name:'name4', conts:'conts4' }, 
      { no:5, name:'name5', conts:'conts5' }
    ];

    data[ 1 ] = [
      { page:1 }, 
      { page:2 }, 
      { page:3 }, 
      { page:4 }, 
      { page:5 } 
    ];

    boch.setIterate( 'b_setiterate_list', data[ 0 ], function( new_id, key ){

        log( 'new_id is ' + new_id, key );

    });

    boch.setIterate( 'b_setiterate_page', data[ 1 ] );

  }

  function _b_exception(){

    boch.setBoch([ 

      { name:'b_timeout', url:'api/timeout.php' },
      { name:'b_404', url:'tpl/404.tpl' },

    ]);

  }


  function after_mobile(){
  
    if( _boch.isMobile() ) {
      document.body.style.maxWidth = '95%';
      document.body.style.margin = '0 0 0 0.5em';
    }

  }

  if( _boch.isModern() ){

    if( _boch.isIe() ) {

      document.body.style.maxWidth = '45em';
      document.body.style.fontSize = '0.80em';
      document.body.style.lineHeight = '200%';

    }

    boch.setConfig({ 

      'timeout':3000, 'retry':3, 'error_msg':true, 
      'error_log':true, 'interval_time':50,
      'content-type':'text/html;charset=utf-8'

    });

    boch.setBoch([

      { name:'b_main', url:'tpl/main.tpl', inner_html:'conts' },
      { name:'b_home', url:'/ko', callback:_b_home },
      { name:'b_start', url:'tpl/start.tpl', inner_html:'conts' },
      { name:'b_download', url:'tpl/download.tpl', inner_html:'conts', callback:_b_download },
      { name:'b_playground', url:'tpl/playground.tpl?t=' + _boch.t, callback:_b_playground },
      { name:'b_stats', url:'tpl/stats.tpl', callback:_b_stats },

      { name:'b_boching', url:'tpl/boching.tpl', inner_html:'conts' },
      { name:'b_setconfig', url:'tpl/setconfig.tpl', inner_html:'conts' },
      { name:'b_getconfig', url:'tpl/getconfig.tpl', inner_html:'conts' },
      { name:'b_getqueue', url:'tpl/getqueue.tpl', inner_html:'conts' },
      { name:'b_getallqueue', url:'tpl/getallqueue.tpl', inner_html:'conts' },
      { name:'b_delqueue', url:'tpl/delqueue.tpl', inner_html:'conts' },
      { name:'b_delallqueue', url:'tpl/delallqueue.tpl', inner_html:'conts' },
      { name:'b_setboching_callback', url:'tpl/setboching_callback.tpl', 
        inner_html:'conts' },
      { name:'b_setvalue', url:'tpl/setvalue.tpl', inner_html:'conts', callback:_b_setvalue },
      { name:'b_setiterate', url:'tpl/setiterate.tpl', inner_html:'conts', callback:_b_setiterate },
      { name:'b_insertjs', url:'tpl/insertjs.tpl', inner_html:'conts' },
      { name:'b_exeption', url:'tpl/exeption.tpl', inner_html:'conts', callback:_b_exception },
      { name:'b_variable', url:'tpl/variable.tpl', inner_html:'conts' }

    ], function(){

      boch.boching( 'b_main', false );
      _boch.setVoid();
      _boch.hl();

    });

    boch.setBochingCallback( function(){
        
      _boch.setVoid();
      _boch.hl();
      after_mobile();

      if( boch.name != 'b_exeption' ) 
        boch.delQueue( [ 'b_timeout', 'b_404' ] );

    });

    var s_result = _boch.xhr( 'api/stats.php', '?type=1' );
    log( 'visit stats is ', s_result );

  } else { _boch.md_open(); } 

})();
