<strong>v.0.2</strong> (2014.04.27)
<pre><code>boch.setValue()
boch.setIterate() 함수 key값 매칭 부분수정

_before_div.innerHTML.match( new RegExp( "\\&lt;data
  data-(" + _k + ")(.*?)\\&gt;", "gim" ) );
=> _before_div.innerHTML.match( new RegExp( "\\&lt;data 
  data-(" + _k + "=)(.*?)\\&gt;", "gim" ) );
</code>
<b>@To Do.</b> 비동기 통신에 대한 Promise/A 적용 고려
</pre>
<br />
