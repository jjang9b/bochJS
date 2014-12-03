```html

<script type="text/javascript" src="boch.js"></script>
<script type="text/javascript">
  
boch.setBoch([
  { name:'b_start', url:'tpl/start.tpl', inner_html:'conts' },
    callback: function(){} }
], function(){

  boch.boching( 'b_start' ); 

  /* window.onload 시 시작 함수를 지정하 듯이 바로 해당 
   boching 액션의 지정이 가능합니다. */ 

});

</script>

<b>자동 boching( 'b_start' ) 적용된 start 버튼</b>
<a name="b_start" class="start"><span class="button">bochJS Start</span></a>
