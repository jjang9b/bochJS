<b>boch 변수들 / Util</b> 은 global boch 객체에 제공되는 내부 객체들 입니다.<br />
<pre>
<strong>boch.setboch_all_inited</strong> : setBoch() 함수를 통해 전체 name에 대한 
웹 통신의 성공 및 init 여부. (하나의 링크라도 실패시 false로 노출)

<strong>boch.name</strong> : boching() 함수 실행시 현재 노출되고 있는 name 

<strong>log()</strong> : console.log 를 좀 더 내부 객체별로 바로 볼 수 있도록,
key, value의 색 구분의 기능을 제공. (크롬 개발자 콘솔 전용) 
</pre>
<pre><code>
&lt;script type="text/javascript" src="boch.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;

console.log( boch );

log( boch );
/*
   boch { name:"b_variable", setboch_all_inited:true }
*/

&lt;/script&gt;
</code></pre>
