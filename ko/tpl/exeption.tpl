<b>예외 처리</b><br /><br />
<strong>1. 자동 error_msg 및 timeout 처리</strong>
<pre><code>
&lt;script type="text/javascript" src="boch.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
boch.setConfig({ 
  'timeout':3000, 'retry':3, 'error_msg':true 
});
&lt;/script&gt;
</code>
</pre>
<a name="b_timeout"><span class="button">timeout( 3.5초 지연 )</span></a>
<pre>
<strong>Explain.</strong>

timeout 상황으로 웹 통신이 지연되는 상황에선 아래와 같은 log를 확인할 수 있습니다.
또한 retry를 시도하고 있는 상황에선 버튼 클릭시 <b>Not yet Loaded, Please wait a few second</b>,
timeout 시도 회수가 넘어선 경우에는 <b>Not Loaded Timeout, Please press F5 and retry</b>
메세지를 통해 예외처리를 도와주고 있습니다.

또한 이 웹 통신 시도 자체가 비동기 xmlhttprequest이기 때문에, 해당 url을 웹시도 하고 있는 가운데
다른 링크들로 이동하더라도 background에선 웹 통신을 시도하고 있는것을 F12 log로 확인 할 수 있습니다.
</pre>
<br />
<pre>
<strong>Log.</strong>

getHtml Error, name b_timeout timeout retry is 1 and url is   <b>tpl/timeout.php</b>
getHtml Error, name b_timeout timeout retry is 2 and url is   <b>tpl/timeout.php</b>
getHtml Error, name b_timeout timeout retry is 3 and url is   <b>tpl/timeout.php</b>
getHtml Error, name b_timeout timeout retry count end   <b>3</b>
setBoch Not success, Complete time is  <b>12168 ms</b>
</pre>
<br />
<pre>
<strong>2. 각 웹 통신 에러별 처리</strong>
<br />
<a name="b_404"><span class="button">404</span></a>
<pre>
<strong>Explain.</strong>
Not Loaded (error code), Please press F5 and retry
</pre>
<pre>
<strong>Log.</strong>

getHtml Error, name b_404 code is  <b>404</b>
allSetBoch Error, name is b_404  <b>queue undefined</b>
</pre>
