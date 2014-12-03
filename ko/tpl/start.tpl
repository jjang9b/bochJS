<b>1. 웹 앱을 구성할 url 준비</b><br />
웹화면을 보여주기 위한 어떠한 url들도 상관없습니다.<br /><br />
<strong>tpl/setconfig.tpl </strong>(pre태그안 치환된 문자열)
<pre>
&lt;script type="text/javascript" src="boch.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
boch.setConfig({ 
  'retry':5, 'error_msg':false, 
  'error_log':true, 'interval_time':50
  'content-type':'text/html;charset=utf-8'
});
&lt;/script&gt;
</pre>
<br />
<b>2. 자동 링크를 설정 시킬 name 지정</b><br />
<pre>
<code>&lt;a name="b_setconfig"&gt;&lt;span class="button"&gt;setConfig&lt;/span&gt;&lt;/a&gt;

&lt;div id='conts'&gt;&lt;/div&gt;</code>
</pre>
<br />
<b>3. boch.setBoch( arr_obj, callback )</b><br />
<strong>arr_obj</strong><br />
- name : 해당 url을 onclick 시킬 name 지정.<br />
- url : 노출될 해당 url.<br /> 
- inner_html : 해당 url의 통신 내용을 노출 시킬 위치. 지정하지 않을 경우 body 기본 설정.<br />
- callback : 해당 name의 액션이 일어났을 경우만 발생시킬 개별 callback.<br /><br />
<strong>callback</strong> : 실패 / 성공 여부 관계없이 setBoch가 전체 완료된 후 실행될 callback<br />
<pre>
<code>&lt;script type="text/javascript" src="boch.js"&gt;&lt;/script&gt;                     
&lt;script type="text/javascript"&gt;
boch.setBoch([<br />
  { name:'b_setconfig', url:'tpl/setconfig.tpl', inner_html:'conts', 
    callback: function(){} }<br />
], function(){<br />  //callback function
});
&lt;/script&gt;</code>
</pre>
<br />
<b>4. 적용된 setConfig 버튼</b><br /><br />
<a name="b_setconfig"><span class="button">setConfig</span></a>
