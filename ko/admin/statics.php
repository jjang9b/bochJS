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
    
      $boch_db = new mysqli( $host, $user, $passwd, $db_name );

      if( $boch_db->connect_errno > 0 ){
      
        echo json_encode( iconv( 'utf-8', 'euc-kr', $boch_db->connect_error ) );
        die;

      }

      $query = "SELECT sum( today_visit ) as total_visit, sum( download_common_count ) 
        as total_downcommon_count, sum( download_min_count )  as total_downmin_count
        FROM b_statics";

      if( $result = $boch_db->query( $query ) ){

        $total_data = $result->fetch_assoc();

      } else {
      
        echo $boch_db->error;

      }


      $query = 'SELECT * FROM b_statics WHERE substr( today, 1, 6 ) = '.date( 'Ym' );

      if( $result = $boch_db->query( $query ) ){

        while( $buf = $result->fetch_assoc() ){

          $month_data[] = $buf;
        
        }
      
      } else {
      
        echo $boch_db->error;

      }

    } catch( Exception $e ) {
    
      echo json_encode( $e );

    }

    /* statics view  */

    echo "<br />";
    echo "<h3>Total visit statics</h3>";
    echo "<br />";
    if( $total_data != null ){
    
      foreach( $total_data as $k=>$v ){

        echo "$k : <b style='color:#800000'>$v</b>";
        echo "<br />";
      
      }

      echo "<br /><br />";
      echo "<h3>Month visit statics</h3>";
      echo "<b style='color:#696969'>".date( 'Ym' )."</b>";
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


  } else {

    echo iconv( 'utf-8', 'euc-kr', '잘못된 접근 입니다. 관리자만이 접근할 수 있습니다' );
  
  }
  
?>
