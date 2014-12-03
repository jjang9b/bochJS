(function(){

  boch.insertJS( 'js/lib/Chart.min.js', true );

  var total_data = _boch.xhr( 'api/stats.php', '?type=3' )
  , month_temp = _boch.xhr( 'api/stats.php', '?type=4' )
  , d = new Date();

  boch.setValue( 'b_month', { month : d.getFullYear() + '. ' + (d.getMonth()+1) } );
  boch.setValue( 'b_total_data_value', total_data );
  boch.setIterate( 'b_month_data_iterate', month_temp );

  setTimeout( function(){
    
    var month_label = [], month_data = []
    , down_common_data = []
    , down_min_data = [];

    for( var i = 0, j = month_temp.length; i < j; i++ ){

      month_label.push( month_temp[ i ][ 'today' ] );
      month_data.push( parseInt( month_temp[ i ][ 'today_visit' ] ) );

      down_common_data.push( parseInt( month_temp[ i ][ 'download_common_count' ] ) );
      down_min_data.push( parseInt( month_temp[ i ][ 'download_min_count' ] ) );

    }

    var month_visit_data = {

      labels : month_label, 
      datasets : [
        {
          fillColor : "#723",
          pointColor : "#723",
          pointStrokeColor : "#fff",
          data : month_data 
        }
      ]

    }, month_download_data = {

      labels : month_label, 
      datasets : [
        {
          fillColor : "#deb887",
          strokeColor : "#f4a460",
          data : down_common_data 
        }, 
        {
          fillColor : "#cd853f",
          strokeColor : "#d2691e",
          data : down_min_data 
        }
      ]

    }

    var ctx = document.getElementById( 'b_month_visit' ).getContext( '2d' );
    new Chart( ctx ).Line( month_visit_data );

    var ctx2 = document.getElementById( 'b_download_count' ).getContext( '2d' );
    new Chart( ctx2 ).Bar( month_download_data );

  }, 50 );

})();
