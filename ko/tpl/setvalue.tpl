<b>setValue</b> 는 하나의 row Data 를 노출시킬 때 사용합니다.<br />
<pre>
view를 위해 templete를 사용하지 않고, 오직 HTML 태그만을 통해 데이터를 노출해 줍니다. 
&lt;data data-<strong>key</strong>&gt;값을 실제 데이터 key로 자동 매칭해 노출 시키주며, 
노출시킬 요소의 id 에 data-setvalue=true로 범위를 지정해 줍니다.

각 요소들에 대한 set 여부는 console log로 확인 가능 합니다.

<strong>setValue( id, row_data );</strong>
</pre>
<pre><code lang="javascript">
&lt;script type="text/javascript" src="boch.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;

  var data = { no:1, name:'name1', conts:'conts1' };

  boch.setValue( 'b_setvalue', data );

  /* Log
     no <b/>true</b>
     name <b>true</b>
     conts <b>true</b>
     */

&lt;/script&gt;
&lt;div id='b_setvalue' data-setvalue=true&gt;
  &lt;data data-no&gt;&lt;/data&gt;
  &lt;data data-name&gt;&lt;/data&gt;
  &lt;data data-conts&gt;&lt;/data&gt;
  &lt;data data-no&gt;&lt;/data&gt; <!-- 모든 data-키 data 요소에 대해 data를 매칭시켜 줍니다-->
&lt;/div&gt;
</code></pre>
<br />
<pre class="result">
<b>결과</b>
<div id='b_setvalue' data-setvalue=true>
data-no : <data data-no></data>

data-name : <data data-name></data>

data-conts : <data data-conts></data>

data-no : <data data-no></data>
</div>
</pre>
