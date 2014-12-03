<?php

  require_once( "db.php" );

  $type = $_REQUEST[ 'type' ];

  try{
  
    $boch_db = new mysqli( $host, $user, $passwd, $db_name );

    if( $boch_db->connect_errno > 0 ){
    
      echo json_encode( $boch_db->connect_error );
      die;

    }

    switch( (int)$type ){

      case 1 : 

        $query = "SELECT today FROM b_stats WHERE today = ".date( 'Ymd' );

        if( $result = $boch_db->query( $query ) ){

          $r_today = $result->fetch_assoc();

        } else {
        
          echo json_encode( array( 'error'=>true, 'msg'=>iconv( 'euc-kr', 'utf-8', $boch_db->error ) ) );

        }

        if( $r_today[ 'today' ] != null ){

          $query = "UPDATE b_stats SET today_visit = today_visit + 1 
            WHERE today = ".date( 'Ymd' );

          if( $result = $boch_db->query( $query ) ){

            $boch_db->close();

            echo json_encode( array( 'ret'=>$result ) );

          } else {

            echo json_encode( array( 'error'=>true, 'msg'=>iconv( 'euc-kr', 'utf-8', $boch_db->error ) ) );

          }

        } else {
        
          $query = "INSERT INTO b_stats( today, today_visit ) 
            VALUES ( ".date( 'Ymd' ).", 1 )";

          if( $result = $boch_db->query( $query ) ){

            $boch_db->close();

            echo json_encode( array( 'ret'=>$result ) );

          } else {

            echo json_encode( array( 'error'=>true, 'msg'=>iconv( 'euc-kr', 'utf-8', $boch_db->error ) ) );

          }

        }

        break;

      case 2:

        $down_type = $_REQUEST[ 'down_type' ];

        if( (int)$down_type == 1 ){
          
          $query = 'UPDATE b_stats SET download_common_count = download_common_count + 1
            WHERE today = '.date( 'Ymd' );
        
        } elseif( (int)$down_type ==2 ){
        
          $query = 'UPDATE b_stats SET download_min_count = download_min_count + 1
            WHERE today = '.date( 'Ymd' );

        }

        if( $result = $boch_db->query( $query ) ){

          $boch_db->close();

          echo json_encode( array( $result ) );

        } else {

          echo json_encode( array( 'error'=>true, 'msg'=>iconv( 'euc-kr', 'utf-8', $boch_db->error ) ) );

        }

        break;
    
      case 3 : 

        $query = "SELECT sum( today_visit ) as total_visit, sum( download_common_count ) 
          as total_downcommon_count, sum( download_min_count )  as total_downmin_count
          FROM b_stats";

        if( $result = $boch_db->query( $query ) ){

          $total_data = $result->fetch_assoc();

          echo json_encode( $total_data );
        
        } else {
        
          echo iconv( 'euc-kr', 'utf-8', $boch_db->error );

        }

        break;

      case 4 : 

        $date = ( $_REQUEST[ 'date' ] ) ? ( $_REQUEST[ 'date' ] ) : date( 'Ym' );

        $query = "SELECT * FROM b_stats WHERE substr( today, 1, 6 ) = $date";

        if( $result = $boch_db->query( $query ) ){

          while( $buf = $result->fetch_assoc() ){

            $month_data[] = $buf;

          }
        
          echo json_encode( $month_data );

        } else {
        
          echo iconv( 'euc-kr', 'utf-8', $boch_db->error );

        }

        break;
    }

  } catch( Exception $e ) {
  
    echo json_encode( $e );

  }
  
?>
