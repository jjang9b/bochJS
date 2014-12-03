<b>setConfig</b> 는 기본 설정을 변경하고 싶을 때 사용합니다.<br />
<pre>
<strong>timeout</strong> : 개별 url 웹통신 시도시 timeout 제한값 
<strong>retry</strong> : 개별 url 웹통신 시도시 timeout 시도 회수
<strong>error-msg</strong> : 404/403/timeout 등 웹 통신 실패시 해당 링크 자동 error alert 처리
<strong>error_log</strong> : console.log 로그 노출 여부 
<strong>interval_time</strong> : 비동기 웹통신을 체크할 interval time 주기 설정
<strong>content-type</strong> : XMLHTTP 통신시 header content-type 
</pre>
<pre><code>
&lt;script type="text/javascript" src="boch.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
boch.setConfig({ 

  'timeout':3000,
  'retry':5, 'error_msg':false, 
  'error_log':true, 'interval_time':0,
  'content-type':'text/html;charset=utf-8'

});
&lt;/script&gt;
위 설정은 bochJS 기본 설정 값입니다.</code></pre>
