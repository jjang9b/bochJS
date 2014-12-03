<?php

  require_once( "db.php" );
  require_once( "aes256.php" );

  $type = $_REQUEST[ 'type' ];

  try{
  
    $boch_db = new mysqli( $host, $user, $passwd, $db_name );

    if( $boch_db->connect_errno > 0 ){
    
      echo json_encode( $boch_db->connect_error );
      die;

    }

    switch( (int)$type ){

      case 1 : 

        $s_num = $_REQUEST[ 's_num' ];
        $e_num = $_REQUEST[ 'e_num' ];

        $query = 'SELECT * FROM b_guest ORDER BY no desc LIMIT ?, ?';

        if( $stmt = $boch_db->prepare( $query ) ){

          $stmt->bind_param( 'ii', $s_num, $e_num);

          $stmt->execute();

          $meta = $stmt->result_metadata(); 
          while ( $field = $meta->fetch_field() ){ $params[] = &$row[ $field->name ]; } 

          call_user_func_array(array( $stmt, 'bind_result' ), $params ); 

          while ( $stmt->fetch() ) { 

            foreach($row as $key => $val){ 

              $c[ $key ] = $val; 

            } 

            $result[] = $c; 

          }

          $stmt->close();

          echo json_encode( $result );
        
        } else {
        
          echo json_encode( array( 'error'=>true, 'msg'=>iconv( 'euc-kr', 'utf-8', $boch_db->error ) ) );

        }

        break;

      case 2:

        $_key = $_REQUEST[ 'k' ];
        $_conts = $_REQUEST[ 'ct' ];

        $_ip = $_SERVER[ 'REMOTE_ADDR' ];
        ( $_ip == '183.99.60.19' ) ? $is_admin = 1 : $is_admin = 0;

        $query = "INSERT INTO b_guest( e_key, conts, is_admin ) VALUES ( ?, ?, ? )";

        if( $stmt = $boch_db->prepare( $query ) ){

          $stmt->bind_param( 'ssi', $_key, $_conts, $is_admin );

          $stmt->execute();

          $stmt->close();

          echo json_encode( array( 'pub_key'=> aes_encrypt( $private_key, $_key ), 
               'insert_id'=>$boch_db->insert_id ));

        } else {

          echo json_encode( array( 'error'=>true, 'msg'=>iconv( 'euc-kr', 'utf-8', $boch_db->error ) ) );

        }

        break;
    
      case 3:

        $_no = $_REQUEST[ 'n' ];
        $pub_key = $_REQUEST[ 'pub_key' ];

        $query = "SELECT e_key FROM b_guest WHERE no = ?";

        if( $stmt = $boch_db->prepare( $query ) ){

          $stmt->bind_param( 'i', $_no );

          $stmt->execute();

          $stmt->bind_result( $e_key );

          $stmt->fetch();

          $stmt->close();

        } else {
        
          echo json_encode( array( 'error'=>true, 'msg'=>iconv( 'euc-kr', 'utf-8', $boch_db->error ) ) );

        }

        $user_ekey = aes_decrypt( $private_key, $pub_key ); 

        if( $e_key == $user_ekey ){
        
          $query = "DELETE FROM b_guest WHERE no = ?";

          if( $stmt = $boch_db->prepare( $query ) ){

            $stmt->bind_param( 'i', $_no );

            $stmt->execute();

            echo json_encode( array( $stmt->affected_rows ) );

            $stmt->close();

          } else {

            echo json_encode( array( 'error'=>true, 'msg'=>iconv( 'euc-kr', 'utf-8', $boch_db->error ) ) );

          }

        }


        break;

      case 4 : 

        $query = "SELECT count(*) FROM b_guest";

        if( $result = $boch_db->query( $query ) ){

          $row = $result->fetch_row();
        
          echo json_encode( array( $row ) );

        } else {
        
          echo json_encode( array( 'error'=>true, 'msg'=>iconv( 'euc-kr', 'utf-8', $boch_db->error ) ) );

        }

        break;
    }

  } catch( Exception $e ) {
  
    echo json_encode( $e );

  }
  
?>
