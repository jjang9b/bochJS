/*
 *  boch.js 
 *
 *  Moment Web app JS
 *  Copyright 2014. bochjs.org all rights reversed.
 */

"use strict";

(function( window ){
 
  var _this = window
  , global_queue = []
  , global_innerhtml = []
  , global_id_callback = []
  , global_common_callback = null
  , global_setboch_all_inited = true 
  , global_gethtml_initedcount = 0 
  , global_retry = [] 
  , global_error_msg = [] 
  , global_timeout = [] 
  , user_config = [];

  var boch = function(){

    user_config[ 'timeout' ] = 3000;
    user_config[ 'retry' ] = 5;
    user_config[ 'error_msg' ] = false;
    user_config[ 'error_log' ] = true;
    user_config[ 'interval_time' ] = 0;
    user_config[ 'content-type' ] = 'text/html;charset=euc-kr;';
  
  };

  boch.prototype = {

    setBoch : function( obj, callback ){

      var start_time = new Date().getTime();

      try{
      
        util.each( obj, function( key, value ){

          if( key != 'indexOf' ){
          
            if( getQueue( value.name ) === undefined ){

              global_retry[ value.name ] = 0;
              global_timeout[ value.name ] = false;

              getHtml( value );

            } else {

              global_gethtml_initedcount++;
            
            }

          }

        });

        allSetQueueCheck( start_time, util.length( obj ), callback );

      } catch( e ) {

        log( 'setBoch Error', e.message );
      
      }

    },

    boching: function( name, is_clear ){

      _this.boch.name = name;
      var _html = getQueue( name )
      , _start_time = new Date().getTime()
      , _end_time = null;

      is_clear = (typeof is_clear == 'undefined' ) ? true : is_clear;

      if( is_clear )
        util.clear();

      try{
      
        var _i = global_innerhtml[ name ];

        switch( _i.toLowerCase() ){

          case 'body' : 

            document.body.innerHTML = _html;

            break;

          default : 

            var a = document.getElementById( _i );
            a.innerHTML = _html;

            break;
        
        }


        _end_time = new Date().getTime();

        if( global_id_callback[ name ] !== undefined )
          global_id_callback[ name ](); 

        if( global_common_callback !== null )
          global_common_callback();

        setTimeout( function(){ allSetBoch(); }, user_config[ 'interval_time' ] );  

        log( 'boching Loaded, name is ' + name + ' and time is', ( _end_time - _start_time ) + ' ms' );

      } catch( e ) {

        log( 'boching Error', e.message );
      
      }

    },

    setValue : function( id, obj ){ setValue.call( _this, id, obj ); },
    setIterate : function( id, obj, callback ){ setIterate.call( _this, id, obj, callback ); },

    getQueue : function( name ){ var a = getQueue.call( _this, name ); log( name + ' Queue is ', a ); },
    getAllQueue : function(){ var a = getAllQueue.call( _this ); log( 'AllQueue is ', a ); },
    delQueue : function( obj ){ 
      util.each( obj, function( key, value ){
        if( key != 'indexOf' )
          delQueue.call( _this, value ); log( 'delQueue ' + value + ' is ', getQueue.call( _this, value ) );   
      });
    },
    delAllQueue : function(){ delAllQueue.call( _this ); log( 'delAllQueue is ', getAllQueue.call( _this ) ); },

    setConfig : function( config ){ 
      util.each( config, function( key, value ){
          user_config[ key ] = value;
      }); 
    },
    getConfig : function( key ){ log( key + ' is', user_config[ key ] ); return user_config[ key ];  },
    getAllConfig : function(){ log( user_config ); return user_config; },

    setBochingCallback : function( common_callback ){ global_common_callback = common_callback; },

    insertJS : function( url, async ){

      var head = document.getElementsByTagName( 'head' )[0];
      var node = document.createElement( 'script' );

      node.async = async || true;
      node.type = 'text/javascript';
      node.src = url; 

      head.appendChild( node );

    },

    insertCSS : function( url, async ){

      var head = document.getElementsByTagName( 'head' )[0];
      var node = document.createElement( 'link' );

      node.async = async || true;
      node.rel = 'stylesheet';
      node.href = url; 

      head.appendChild( node );

    }

  }

  /*
   *  common functions
   */

  var getHtml = function( obj ){

    var xhr = null;

    if ( _this.XMLHttpRequest ) {

      xhr = new window.XMLHttpRequest();

    } else if ( _this.ActiveXObject ){

      xhr = new window.ActiveXObject( 'Microsoft.XMLHTTP' );

    }

    xhr.open( 'GET', obj.url, true );
    xhr.setRequestHeader('Content-type', user_config[ 'content-type' ] );

    if( xhr.overrideMimeType )
      xhr.overrideMimeType( 'Content-type', user_config[ 'content-type' ] );

    xhr.onreadystatechange = function(){

      if( xhr.readyState == 4 ){

        switch( xhr.status ){

          case 200 : 

            global_gethtml_initedcount++;
            setQueue( obj, xhr.responseText ); 

            break;

          case 0 :

            _timeout();

            break;
          default :

            global_error_msg[ obj.name ] = 'Not Loaded ' + xhr.status + ', Please press F5 and retry';
            setQueue( obj, undefined );

            if( xhr.status != 0 ){
            
              global_gethtml_initedcount++;
              log( 'getHtml Error, name ' + obj.name + ' code is ', xhr.status );

            }

            break;
        
        }

      }
    
    }

    xhr.timeout = user_config[ 'timeout' ];
    xhr.send();

    function _timeout(){
    
      global_timeout[ obj.name ] = true;

      if( global_retry[ obj.name ] == user_config[ 'retry' ] ){

        global_gethtml_initedcount++;
        global_error_msg[ obj.name ] = 'Not Loaded Timeout, Please press F5 and retry';
        
        log( 'getHtml Error, name ' + obj.name + ' timeout retry count end ', global_retry[ obj.name ] );

      } else {
      
        setTimeout( function(){ getHtml.call( _this, obj ) }, user_config[ 'interval_time' ] ); 

        global_retry[ obj.name ]++;
        global_error_msg[ obj.name ] = 'Not yet Loaded, Please wait a few second';


        log( 'getHtml Error, name ' + obj.name + ' timeout retry is ' + global_retry[ obj.name ] + 
            ' and url is ', obj.url );
      
      } 

      setQueue( obj, undefined );

    }

  }, setQueue = function( obj, html ){

    try{

      global_queue[ obj.name ] = html;
      global_id_callback[ obj.name ] = obj.callback;
      global_innerhtml[ obj.name ] = obj.inner_html || 'body';

      var el = document.getElementsByName( obj.name )
      , _onclick = null;

      if( html == undefined || html == '' ){

        global_setboch_all_inited = false;

        ( user_config[ 'error_msg' ] ) ? 
          _onclick = function(){ alert( global_error_msg[ obj.name ] ); } : _onclick = '';

      } else { _onclick = _boching; }

      for( var i = 0, j = el.length; i < j; i++ ){ el[ i ].onclick = _onclick; }

    } catch( e ) {

      log( 'setQueue Error, name is ' + obj.name, e.message );
    
    }

    function _boching(){ _boch.boching( obj.name ); }

  }, getQueue = function( name ){

    return global_queue[ name ];
  
  }, getAllQueue = function(){

    return global_queue;

  }, delQueue = function( name ){ 

    delete global_queue[ name ];
  
  }, delAllQueue = function(){

    global_queue = [];
  
  }, allSetBoch = function(){

    util.each( global_queue, function( name ){

      try{

        if( name != 'indexOf' ){

          var el = document.getElementsByName( name )
          , _onclick = null;

          if( el !== null ){
          
            if( getQueue( name ) == undefined ){

              ( user_config[ 'error_msg' ] ) ? 
                _onclick = function(){ alert( global_error_msg[ name ] ); } : _onclick = '';

              throw new Error( 'queue undefined' );

            } else { _onclick = _boching; }   

          }

          for( var i = 0, j = el.length; i < j; i++ ){ el[ i ].onclick = _onclick; } 

        }

      } catch( e ) {

        log( 'allSetBoch Error, name is ' + name, e.message );
      
      }

	  function _boching(){ _boch.boching( name ); }

    }); 


  }, allSetQueueCheck = function( start_time, obj_length, callback ){

      var _first_check = false;
      _a();

      if( !_first_check )
        var _check_all_setqueue = setInterval( _a, user_config[ 'interval_time' ] );

      function _a(){
      
        if( parseInt( global_gethtml_initedcount ) === parseInt( obj_length ) ){

          _first_check = true;
          global_gethtml_initedcount = 0;

          clearInterval( _check_all_setqueue );

          var end_time = new Date().getTime();

          ( global_setboch_all_inited ) ? log( 'setBoch Success, Complete time is', ( end_time - start_time ) + ' ms' ) :
            log( 'setBoch Not success, Complete time is', ( end_time - start_time ) + ' ms' ); 

          if( callback !== undefined )
            callback();

          _this.boch.setboch_all_inited = global_setboch_all_inited;

        }

      }

  }, setValue = function( id, obj ){

    var _before_div = document.getElementById( id )

    if( _before_div != null ){
    
      var _start_time = new Date().getTime()
      , _data = _before_div.getElementsByTagName( 'data' )
      , _is_setvalue = _before_div.getAttribute( 'data-setvalue' ) ||
        _before_div.getAttribute( 'data-value' )
      , _match_html = []
      , _after_html = _before_div.innerHTML 
      , _is_set = [];

      if( _is_setvalue.toString() === 'true' ){
      
        for( var _k in obj ){
        
          _is_set[ _k ] = false;

          for( var i = 0, j = _data.length; i < j ; i++ ){

            var _data_outerstr = _data[ i ].outerHTML.match( new RegExp( "(data-\\w+)", "gim" ) );
            _match_html[ _k ] = _before_div.innerHTML.match( new RegExp( "\\<data data-(" + _k + "=)(.*?)\\>", 
              "gim" ) );

            if( _data_outerstr[ 0 ] == 'data-' + _k ){

              _after_html = _after_html.replace( new RegExp( "(" + _match_html[ _k ][ 0 ] + ")(.*?)\\</data>", 
                    "gim" ), obj[ _k ] );

              _is_set[ _k ] = true;

            }
          }

        }

        _before_div.innerHTML = _after_html;

        var _end_time = new Date().getTime();

        log( 'setValue Complete, time is', ( _end_time - _start_time ) + ' ms' );
        log( _is_set );

      }

    }

  }, setIterate = function( id, obj, callback ){

    var _before_div = document.getElementById( id );

    if( _before_div != null ){
    
      var _start_time = new Date().getTime()
      , _before_div_isiter = _before_div.getAttribute( 'data-setiterate' ) || 
        _before_div.getAttribute( 'data-iterate' )
      , _match_html = []
      , _is_set = []
      , _new_div = document.createElement( 'div' );

      if( _before_div_isiter.toString() === 'true' ){

        try{
        
          for( var _k in obj ){

            var _obj = obj[ _k ]
            , _after_div = _before_div.cloneNode( true )
            , _after_html = _before_div.innerHTML 
            , _data = _after_div.getElementsByTagName( 'data' );

            _is_set[ _k ] = [];

            for( var i = 0, j = _data.length; i < j; i++ ){

              var _data_outerstr = _data[ i ].outerHTML.match( new RegExp( "(data-\\w+)", "gim" ) );

              for( var _kk in _obj ){

                _match_html[ _kk ] = _before_div.innerHTML.match( new RegExp( "\\<data data-(" + _kk + "=)(.*?)\\>", 
                  "gim" ) );

                if( _is_set[ _k ][ _kk ] != true )
                  _is_set[ _k ][ _kk ] = false;

                if( _data_outerstr == ( 'data-' + _kk ) ){

                  _after_html = _after_html.replace( new RegExp( "(" + _match_html[ _kk ] + ")(.*?)\\</data>", 
                    "gim" ), _obj[ _kk ] );

                  _is_set[ _k ][ _kk ] = true;

                } 

              }

            }

            if( _k != 'indexOf' ){
            
              var _new_id = 'bochlist_' + id + _k;

              _after_div.setAttribute( 'id', _new_id ); 
              _after_div.innerHTML = _after_html;

              _new_div.appendChild( _after_div );

              if( callback != undefined )
                callback( _new_id, _k );

            }

          }

          _before_div.innerHTML = _new_div.innerHTML;

          var _end_time = new Date().getTime();

          log( _is_set );
          log( 'setIterate Complete, time is', ( _end_time - _start_time ) + ' ms' );

        } catch( e ) {
        
          log( 'setIterate Error ', e );
          
        }

      }

    }

  }; 

  /*
   *  util functions
   */
  var util = {

    each : function( data, callback ){
      
      for( var i in data ){

        callback.call( data[ i ], i, data[ i ] ); 
      
      }
      
    }, log : function(){

      if( user_config[ 'error_log' ] ){
      
        if( _this.console && !util.isIe() ){

          if( arguments[ 0 ] === undefined ){

            console.log( '%c variable is undefined! \n', 'font-weight:bold;color:purple' );
            return ;

          }
          else if( arguments[ 1 ] === undefined ){

            if( util.isArray( arguments[ 0 ] ) || util.isObject( arguments[ 0 ] ) ){

              util.each( arguments[ 0 ], function( key, value ){

                  log( key, value );

              });

            } else { console.log( '%c' + arguments[ 0 ] + ' ', 'font-weight:bold;' ); }

          } else { 

            if( util.isArray( arguments[ 1 ] ) || util.isObject( arguments[ 1 ] ) ){

              console.log( '%c' + arguments[ 0 ] + ' ', 'font-weight:bold;', arguments[ 1 ] );

            } else {
            
              console.log( '%c' + arguments[ 0 ] + ' %c ' + arguments[ 1 ], 'font-weight:bold;', 
                  'font-weight:bold;color:brown;' );

            } 

          } 

        } else {
          
          ( arguments[ 1 ] == undefined ) ? console.log( ' ' + arguments[ 0 ] ) : 
            console.log( arguments[ 0 ] + '  ' + arguments[ 1 ] );

        }

      }

    }, isInt : function( obj ){ return ( !isNaN( obj ) && parseInt( obj ) == obj ); 
    }, isArray : function( obj ){ return Object.prototype.toString.call( obj ) === '[object Array]'; 
    }, isObject : function( obj ){ return Object.prototype.toString.call( obj ) === '[object Object]'; 
    }, isFunction : function( obj ){ return Object.prototype.toString.call( obj ) === '[object Function]'; 
    }, length : function( obj ){ 

      var count = 0, i;

      for( i in obj ){

        if( obj.hasOwnProperty( i ) ){ count++; }
      }

      return count;
       
    }, clear : function(){ console.clear(); 
    }, isIe : function(){

      if( _this.navigator.appName == "Microsoft Internet Explorer" || 
          _this.navigator.userAgent.indexOf( 'Trident' ) >= 0 ) 
        return true;
      else return false;
    
    }
  
  };

  var _boch = _this.boch = new boch;
  var log = _this.log = util.log;
 
})( this );
