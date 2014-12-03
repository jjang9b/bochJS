<b>getConfig</b> 는 기본 설정을 가지고 올 때 사용합니다.<br />
<pre>
<strong>timeout</strong> : 개별 url 웹통신 시도시 timeout 제한값 
<strong>retry</strong> : 개별 url 웹통신 시도시 timeout 시도 회수
<strong>error-msg</strong> : 404/403/timeout 등 웹 통신 실패시 해당 링크 자동 error alert 처리 
<strong>error_log</strong> : console.log 로그 노출 여부 
<strong>interval_time</strong> : 비동기 웹통신을 체크할 interval time 주기 설정 
<strong>content-type</strong> : XMLHTTP 통신시 header content-type 

<strong>getConfig();</strong>
<strong>@return obj_config[]</strong>
</pre>
<pre><code>
&lt;script type="text/javascript" src="boch.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
  var boch_config = boch.getConfig();
&lt;/script&gt;
</code></pre>
