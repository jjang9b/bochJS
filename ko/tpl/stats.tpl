<div class="main">
  <a name="b_home"><h1>bochJS</h1></a>
</div>
<br />
<h3>Total visit statistics</h3>
<br />
<div id="b_total_data_value" data-setvalue=true>
<pre>
total_visit : <b><data data-total_visit></data></b>
total_download_count : <b><data data-total_downcommon_count></data></b>
total_download_min_count : <b><data data-total_downmin_count></data></b>
</pre>
</div>
<br />

<h3>Month visit statistics</h3>
<strong><div id="b_month" data-setvalue=true><data data-month></data></div></strong>
<br /><br />
<div id="b_month_data_iterate" data-setiterate=true>
  today : <b><data data-today></data></b><span>&nbsp;&nbsp;</span>
  today_visit : <b><data data-today_visit></data></b><span>&nbsp;&nbsp;</span>
  today_download_count : <b><data data-download_common_count></data></b><span>&nbsp;&nbsp;</span>
  today_download_min_count : <b><data data-download_min_count></data></b>
</div>

<br />
<h3 style="color:#723">Month Visit statistics graph</h3>
<canvas id="b_month_visit" width="800" height="400"></canvas>
<br />
<h3 style="color:#723">Month Download statistics graph</h3>
<canvas id="b_download_count" width="800" height="400"></canvas>
