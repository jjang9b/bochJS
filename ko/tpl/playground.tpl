<div class="guest">

  <div class="main">
    <a name="b_home"><h1>bochJS</h1></a>
    <b>Guest Play ground</b>
    <br />
    <a onclick="_boch.pg_show( 1 )"><span class="button">article</span></a>
    <a onclick="_boch.pg_show( 2 )"><span class="button">All</span></a>
    <br />
    <div id="sub_all">
<pre>
play ground는 openssl 암호화 형태로 글 작성시 클라이언트단에서의 aes256 암호화된 
키를 서버단의 비밀키로 암호화하여 클라이언트상의 localStorage에 저장한 후,
이후 삭제시 해당 값을 복호화하여 비교하는 형태 입니다.  
특별한 로그인 / 비번 처리 없이 글을 입력한 단말기(client)와 <b>브라우저</b>로 
접근하였을 때 본인임을 인지하여 삭제가 가능합니다.
</pre>
    </div>

    <div id="write_all" class="input">
      <textarea id="t_conts"></textarea>
      <div class="write">
        <div class="w_button">
          <a onclick="_boch.pg_write()"><span class="button">Write</span></a>
        </div>
        <div class="w_msg">
          <span id="d_delete" class="msg" style="display:none">삭제 되었습니다.</span>
          <span id="d_warm" class="msg" style="display:none">1자 이상 입력해 주세요.</span>
        </div>
      </div>
    </div>

    <div id="b_play_conts" data-iterate=true>
      <div id="a_wrap" class="a_wrap">
        <div class="article">
          <div class="conts"><data data-conts></data></div>
          <div><strong><data data-reg_date></data></strong></div>
          <a style="display:none"><span class="button">Delete</span></a>
        </div>
      </div>
    </div>

    <div class="w_paging">
      <a id="pg_prev" class="prev" style="display:none"><strong><</strong></a>
      <div id="b_play_paging" data-iterate=true>
        <a><strong><data data-page></data></strong></a>
      </div>
      <a id="pg_next" class="prev" style="display:none"><strong>></strong></a>
    </div>

</div>
