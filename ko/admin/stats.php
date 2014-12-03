<!DOCTYPE>
<html>
<head>
  <link rel="stylesheet" href="/ko/css/1.css" />
  <script src="/ko/js/lib/Chart.min.js"></script>
</head>
<body>
  <div class="main">
    <a href="//bochjs.org" name="b_home"><h1>bochJS</h1></a>
  </div>
<?php

  $host = 'localhost';
  $user = 'bochjs'; 
  $passwd = 'playground';
  $db_name = 'bochjs_godohosting_com';

  $private_key = "bochjs_privatekey";

  $id = $_REQUEST[ 'id' ];
  $passwd = $_REQUEST[ 'passwd' ];

  if( $id == 'bochjs' && $passwd == 'playground' ){
  
    try{
    
      $date = ( $_REQUEST[ 'date' ] ) ? ( $_REQUEST[ 'date' ] ) : date( 'Ym' );

      $boch_db = new mysqli( $host, $user, $passwd, $db_name );

      if( $boch_db->connect_errno > 0 ){
      
        echo iconv( 'euc-kr', 'utf-8', $boch_db->connect_error );

      }

      $query = "SELECT sum( today_visit ) as total_visit, sum( download_common_count ) 
        as total_downcommon_count, sum( download_min_count )  as total_downmin_count
        FROM b_stats";

      if( $result = $boch_db->query( $query ) ){

        $total_data = $result->fetch_assoc();

      } else {
      
        echo iconv( 'euc-kr', 'utf-8', $boch_db->error );

      }

      $query = "SELECT * FROM b_stats WHERE substr( today, 1, 6 ) = $date";

      if( $result = $boch_db->query( $query ) ){

        while( $buf = $result->fetch_assoc() ){

          $month_data[] = $buf;
        
        }
      
      } else {
      
        echo iconv( 'euc-kr', 'utf-8', $boch_db->error );

      }

    } catch( Exception $e ) {
    
      echo $e;

    }

    /* statistics view  */

    echo "<br />";
    echo "<h3>Total visit statistics</h3>";
    echo "<br />";
    if( $total_data != null ){
    
      foreach( $total_data as $k=>$v ){

        echo "$k : <b style='color:#800000'>$v</b>";
        echo "<br />";
      
      }

      echo "<br /><br />";
      echo "<h3>Month visit statistics</h3>";
      echo "<b style='color:#696969'>$date</b>";
      echo "<br /><br />";

      if( $month_data != null ){
      
        foreach( $month_data as $k=>$v ){

          foreach( $v as $_k=>$_v ){
          
            echo "$_k : <b style='color:#800000'>$_v</b><span>&nbsp;&nbsp;&nbsp;</span>";

          }

          echo "<br />";
        
        }

      } else {
        
        echo iconv( 'utf-8', 'euc-kr', "데이터가 존재 하지 않습니다." );

      }

    }

  ?>

  <br />
  <h3 style="color:#723">Month Visit statistics graph</h3>
  <canvas id="b_month_visit" width="800" height="400"></canvas>
  <br />
  <h3 style="color:#723">Month Download statistics graph</h3>
  <canvas id="b_download_count" width="800" height="400"></canvas>

  <script>

    window.onload = function(){

      var data_temp = <? echo json_encode( $month_data ); ?> 
      , month_label = [], month_data = []
      , down_common_data = []
      , down_min_data = [];

      for( var i = 0, j = data_temp.length; i < j; i++ ){

        month_label.push( data_temp[ i ][ 'today' ] );
        month_data.push( parseInt( data_temp[ i ][ 'today_visit' ] ) );

        down_common_data.push( parseInt( data_temp[ i ][ 'download_common_count' ] ) );
        down_min_data.push( parseInt( data_temp[ i ][ 'download_min_count' ] ) );

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

    }

  </script>
  </body>
  </html>

<?

  } else {

    echo iconv( 'utf-8', 'euc-kr', "전월 데이터는 관리자만이 접근할 수 있습니다." );
?>
<br />
<form method="post" action="stats.php">
id : <input type="text" name='id' /><br />
passwd : <input type="password" name='passwd' /><br />
date( 'Ym' ) : <input type="text" maxlength=6 name='date' /><br />
<input type="submit" value="Login" />
</form>
<?
  
  }

?>

