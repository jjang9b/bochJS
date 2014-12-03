<b>setBochingCallback</b> 은 boching 함수 사용시 호출할 공통 callback을 
설정할 때 사용합니다.<br />
<pre>
<strong>setBochingCallback( common_callback );</strong>
</pre>
<pre><code>
&lt;script type="text/javascript" src="boch.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
  boch.setBochingCallback( function(){
      
    _boch.setVoid();
    _boch.hl();

    if( boch.name != 'b_exeption' ) 
      boch.delQueue( [ 'b_timeout', 'b_404' ] );

  });
&lt;/script&gt;
bochJS.org 상 사용 코드 입니다.
</code></pre>
