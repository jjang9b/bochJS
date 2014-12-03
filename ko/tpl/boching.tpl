<b>boching</b> 은 bochJS를 사용하여 순간 웹 페이지를 삽입 하는 함수를 지칭 합니다.<br />
<pre>
setBoch() 통해 지정된 name에는 자동으로 boching() 함수가 onclick 이벤트로 지정됩니다.
아래 코드와 같이 callback함수 범위 내에서 임의로 boching() 함수를 호출하는 것도 가능합니다.

또한 boching 때 console log가 누적되지 않도록 자동 console.clear을 지원합니다.
기본은 true이며, 원치 않는 boching 액션의 경우는 is_clear값을 지정할 수 있습니다.

<strong>boching( name, is_clear );</strong>
</pre>
<pre><code>
&lt;script type="text/javascript" src="boch.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
  
boch.setBoch([
  { name:'b_start', url:'tpl/start.tpl', inner_html:'conts' },
    callback: function(){} }
], function(){

  boch.boching( 'b_start' ); 

  //boch.boching( 'b_start', false ); 

  /* window.onload 시 시작 함수를 지정하 듯이 바로 해당 
   boching 액션의 지정이 가능합니다. */ 

});

&lt;/script&gt;
</code></pre>
<br /><br />
<b>자동 boching( 'b_start' ) 적용된 start 버튼</b><br /><br />
<a name="b_start" class="start"><span class="button">bochJS Start</span></a>
