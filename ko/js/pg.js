(function( window ){

 var article_size = 5
 , page_size = 10
 , pg_url = 'api/pg.php';

 function _getPlayList( s_num, e_num ){

   var data = _boch.xhr( pg_url, '?type=1&s_num=' + s_num + '&e_num=' + e_num )
   , count = _boch.xhr( pg_url, '?type=4' );

   if( data != null ){

     document.getElementById( 'a_wrap' ).style.border = '1px solid #ccc';

     boch.setIterate( 'b_play_conts', data, function( new_id, k ){

       var a = data[ k ].e_key;
       var b = JSON.parse( window.localStorage.getItem( 'boch_' + data[ k ].no ) );

       if( data[ k ].is_admin == 1 ){
       
         setTimeout( function(){

           var a = document.getElementById( new_id );

           a.children[ 0 ].setAttribute( 'class', 'a_wrap_admin' );
           a.style.display = 'block';

         }, 0);

       }

       if( b != null ){
       
         if( a == b[ 0 ] ){
         
           setTimeout( function(){

             var a = document.getElementById( new_id ).getElementsByTagName( 'a' )[ 0 ];

             a.parentNode.parentNode.setAttribute( 'class', 'a_wrap_my' );
             a.style.display = 'block';
             a.onclick = function(){ _boch.pg_delete( data[ k ].no, b[ 1 ] ); }

           }, 0);

         }

       }

     });

     _paging( count[ 0 ][ 0 ] );

   }

   function _paging( conts_count ){

     var _c = parseInt( conts_count ) // 총 count
     , page_count = Math.ceil( ( _c / article_size ) )   // 총 page count 
     , start_screen_num = ( _boch.pg_current_screen_page * page_size ) + 1
       // 현재 screen의 처음 page size
     , end_screen_num = ( ( _boch.pg_current_screen_page + 1 ) * page_size ) 
       + ( page_count - ( ( _boch.pg_current_screen_page + 1 ) * page_size ) )
       // 현재 screen의 마지막 page size
     , page_obj = [];

     if( page_count > ( _boch.pg_current_screen_page + 1 ) * page_size )
       end_screen_num--;

     for( var i = start_screen_num, j = end_screen_num; i <= j ; i++ ){ page_obj.push( {page:i} ); }

       boch.setIterate( 'b_play_paging', page_obj, function( n_id, key ){

         setTimeout( function(){

           var pg_prev = document.getElementById( 'pg_prev' )
           , pg_next = document.getElementById( 'pg_next' )
           , page_num = document.getElementById( n_id );

           if( _boch.pg_current_screen_page > 0 ){ 

             pg_prev.style.display = 'block';
             pg_prev.onclick = function(){

              _boch.pg_current_screen_page--;
              boch.boching( 'b_playground' );
             
             }

           }

           if( page_count > parseInt( ( _boch.pg_current_screen_page + 1 ) * page_size ) ){

             pg_next.style.display = 'block';
             pg_next.onclick = function(){

              _boch.pg_current_page = ( _boch.pg_current_screen_page * page_size );
              _boch.pg_current_screen_page++;
              boch.boching( 'b_playground' );
             
             }

           }

           if( _boch.pg_current_page == key ){
           
             page_num.onclick = ''; 
             page_num.getElementsByTagName( 'a' )[ 0 ].style.color = '#800000';

             page_num.setAttribute( 'class', 'paging' );

           } else {
           
             page_num.setAttribute( 'class', 'paging' );

             page_num.onclick = function(){

              _boch.pg_current_page = key;

              boch.boching( 'b_playground' );
             
             }

           }

         }, 0 );

       });
   
   }

 }

 this._boch.pg_write = function(){

  var _conts = document.getElementById( 't_conts' ).value
  , d_warm = document.getElementById( 'd_warm' );

  if ( _conts.length <= 0 ){

    d_warm.style.display = 'block';

    setTimeout( function(){ d_warm.style.display = 'none'; }, 2500 );

    return ;

  }

  _insert();

  function _insert(){

    boch.insertJS( 'js/lib/gibberish-aes.js', true );

    var key = "abcdefghijklmnopqrstuvwxyz123456"
    , alpha_str = "abcdefghijklmnopqrstuvyxz"
    , ran_num = Math.floor( Math.random() * ( alpha_str.length ) )
    , ran_num2 = Math.floor( Math.random() * ( alpha_str.length ) )
    , t = new Date().getTime();

    var ran_str = 'boch_' + alpha_str.charAt(ran_num) + alpha_str.charAt(ran_num2) + t; 

    var _w_int = setInterval( function(){

      if( GibberishAES ){
      
        clearInterval( _w_int );

        GibberishAES.size( 256 ); 
        e_str = GibberishAES.aesEncrypt( ran_str, key );

        var result = _boch.xhr( pg_url, '?type=2&k=' + encodeURIComponent( e_str ) + '&ct=' + 
          encodeURIComponent( _conts ) );

        if( result.insert_id != null ){

          if( window.localStorage !== null ){

            var _local = [ e_str, result.pub_key ];

            localStorage.setItem( 'boch_' + result.insert_id, JSON.stringify( _local ) );
          
          }
        
        }

        d_warm.style.display = 'none';
        boch.boching( 'b_playground' );

        log( 'Playground insert_id is ' + result.insert_id );

      }

    }, 100 );

  }
 
 }

 this._boch.pg_delete = function( n, pub_key ){

   var a_rows = _boch.xhr( pg_url, '?type=3&n=' + n + '&pub_key= ' + encodeURIComponent( pub_key ) );

   boch.boching( 'b_playground' );

   var d_delete = document.getElementById( 'd_delete' );
   d_delete.style.display = 'block';
   setTimeout( function(){ d_delete.style.display = 'none'; }, 2500 );

   log( 'Playground affected_rows is ' + a_rows );

 }

 this._boch.pg_show = function( t ){ 

   _boch.pg_current_state = t;

   switch( t ){

     case 1:
       document.getElementById( 'sub_all' ).style.display = 'none';
       document.getElementById( 'write_all' ).style.display = 'none';
       document.getElementById( 'b_play_conts' ).style.display = 'block';
       document.getElementById( 'b_play_paging' ).style.display = 'block';
       break;
      
     case 2:
       document.getElementById( 'sub_all' ).style.display = 'block';
       document.getElementById( 'write_all' ).style.display = 'block';
       document.getElementById( 'b_play_conts' ).style.display = 'block';
       document.getElementById( 'b_play_paging' ).style.display = 'block';
       break;
   
   }
 
 }

 _boch.pg_show( _boch.pg_current_state );
 _getPlayList( ( _boch.pg_current_page * article_size ), article_size );

})( window );
