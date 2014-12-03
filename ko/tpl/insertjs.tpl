<b>insertJS</b> 는 javascript를 비동기 삽입 할 때 사용합니다.<br />
<pre>
특정 callback이나 초기 삽입 때 필요한 js들에 한해 사용하길 권장 합니다.
의존성이나 모듈화 관리를 위해선 requireJS등의 AMD 모듈을 사용하시길 바랍니다.

<strong>insertJS( url, async );</strong>
</pre>
<pre><code>
&lt;script type="text/javascript" src="boch.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
  boch.insertJS( 'js/1.js', true );
&lt;/script&gt;
</code></pre>
