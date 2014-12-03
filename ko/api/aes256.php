<?php

function aes_encrypt($key, $value){                

  $padSize = 16 - (strlen ($value) % 16) ;
  $value = $value . str_repeat (chr ($padSize), $padSize) ;
  $output = mcrypt_encrypt (MCRYPT_RIJNDAEL_128, $key, $value, MCRYPT_MODE_CBC, str_repeat(chr(0),16)) ;                
  return base64_encode ($output) ;        

}

function aes_decrypt($key, $value){                     

  $value = base64_decode ($value) ;                
  $output = mcrypt_decrypt (MCRYPT_RIJNDAEL_128, $key, $value, MCRYPT_MODE_CBC, str_repeat(chr(0),16)) ;                

  $valueLen = strlen ($output) ;
  if ( $valueLen % 16 > 0 )
    $output = "";

  $padSize = ord ($output{$valueLen - 1}) ;
  if ( ($padSize < 1) or ($padSize > 16) )
    $output = "";                // Check padding.                

  for ($i = 0; $i < $padSize; $i++)
  {
    if ( ord ($output{$valueLen - $i - 1}) != $padSize )
      $output = "";
  }
  $output = substr ($output, 0, $valueLen - $padSize) ;

  return $output;        

} 

?>
