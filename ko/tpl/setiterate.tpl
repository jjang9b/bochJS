<b>setIterate</b> 는 array데이터를 자동 반복 노출 시켜줄 때 사용합니다.<br />
<pre>
setValue 와 같이 &lt;data&gt; HTML 태그만을 통해 data-<strong>key</strong>을 매칭시켜주며,
하나의 범위 set 지정으로 반복 노출이 가능합니다.

이후 새로운 id값을 해당 iterate 시킨 부분으로 할당을 하며, 해당 new_id과 key값을 
인자로 넘겨 줍니다. 해당 new_id와 key값으로 특정 iterate된 부분의 control이 가능하게 됩니다. 

또한 각 요소들에 대한 set 여부는 console log로 확인 가능 합니다.

<strong>callback( new_id, key )</strong>

<strong>setIterate( id, arr_data, callback );</strong>
</pre>
<pre><code>&lt;?php 
  $data = array(
    0 => array(
      array( 'no'=>1, 'name'=>'name1', 'conts'=>'conts1' ),
      array( 'no'=>2, 'name'=>'name2', 'conts'=>'conts2' ),
      array( 'no'=>3, 'name'=>'name3', 'conts'=>'conts3' ),
      array( 'no'=>4, 'name'=>'name4', 'conts'=>'conts4' ),
      array( 'no'=>5, 'name'=>'name5', 'conts'=>'conts5' )
    ), 
    1 => array(
      array( 'page'=>1 ),
      array( 'page'=>2 ),
      array( 'page'=>3 ),
      array( 'page'=>4 ),
      array( 'page'=>5 )
    ), 
  );
?&gt; 
해당 데이터를 xmlhttprequest 통신후 JSON.parse( data );를 하게 되면, 
아래 형태가 됩니다.

&lt;script type="text/javascript" src="boch.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
  var data = [];

  data[ 0 ] = [ 
    { no:1, name:'name1', conts:'conts1' }, 
    { no:2, name:'name2', conts:'conts2' }, 
    { no:3, name:'name3', conts:'conts3' }, 
    { no:4, name:'name4', conts:'conts4' }, 
    { no:5, name:'name5', conts:'conts5' }
  ];

  data[ 1 ] = [
    { page:1 }, 
    { page:2 }, 
    { page:3 }, 
    { page:4 }, 
    { page:5 } 
  ];

  boch.setIterate( 'b_setiterate_list', data[ 0 ], function( new_id, key ){
      /*
      new_id : bochlist_b_setiterate_list0, k : 0
      new_id : bochlist_b_setiterate_list1, k : 1
      new_id : bochlist_b_setiterate_list2, k : 2
      new_id : bochlist_b_setiterate_list3, k : 3
      new_id : bochlist_b_setiterate_list4, k : 4
      */
      // example
      if( data[ 0 ][ key ].name == 'name1' ){

        document.getElementById( new_id ).style.display = 'none';
      
      }
  });

  boch.setIterate( 'b_setiterate_page', data[ 1 ] );

  /* Log
     0  [no: true, name: true, conts: true] 
     0  [page: true]
     */

&lt;/script&gt;
&lt;div id='b_setiterate_list' data-setiterate=true&gt;
  
  &lt;data data-no&gt;&lt;/data&gt; 
  &lt;data data-name&gt;&lt;/data&gt; 
  &lt;data data-conts&gt;&lt;/data&gt; 

&lt;/div&gt;
&lt;div id='b_setiterate_page' data-setiterate=true&gt;
  
  &lt;data data-page&gt;&lt;/data&gt; 

&lt;/div&gt;
</code></pre>
<br />
<pre class="result">
<b>결과</b>
<div id='b_setiterate_list' data-setiterate=true>
no : <data data-no></data>  name : <data data-name></data>  conts : <data data-conts></data> 
</div>
<div id='b_setiterate_page' data-setiterate=true>
page : <data data-page></data> 
</div>
</pre>
