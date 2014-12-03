<pre class="main">
bochJS.org 사이트 자체를 boch.js로 만들었으며 웹 앱 사이트를 
쉽게 만들고 싶으시면 bochJS를 사용해 보세요.

<b>bochJS Start</b> 만으로도 기본 준비는 모두 끝이나게 됩니다. 

1. 서버 로딩이 없는 <strong>웹 앱 사이트</strong>를 만들수 있습니다.

2. <strong>첫 setBoch 시 웹통신을 모두 완료</strong> 하므로 이후 액션에 대한 
웹통신이 전혀 없습니다.
boching된 페이지 내에서 새 링크를 연결하고 싶을 경우에 다시 setBoch를 설정 하면 됩니다.

3. 웹 통신 이후에는 javascript 변수에 html이 저장 된 후 <strong>변수의 내용만 노출</strong> 
하게되므로 추가 서버 요청이나 해당 페이지를 로딩하는데 있어 느림 현상이 
일어나지 않습니다.

4. 페이지의 이동이 없어지므로 <strong>url의 변화가 없습니다.</strong> 이건 사이트 마다의
장, 단점이 서로 공존합니다.

5. <strong>HTML 태그만을 통한 데이터 노출</strong>을 가능하게 해주어, 추가 view template을
사용하지 않아도 됩니다. ( setValue, setIterate )

6. 5번을 통해 Model역활의 data만 json형태로 가져오는 api 서버를 따로 둔다면
오직 html / javascript / css의 <strong>static한 파일로만 웹 앱 사이트 구축</strong>이 가능합니다.

7. 웹 통신에 대한 <strong>자동 에러 처리</strong>, 메세지 노출 등 편의성을 제공합니다.
또한 모든 과정의 <strong>log</strong>를 쉽게 개발자 console로 확인할 수 있습니다.

8. 모든 <strong>필요한 global변수</strong>의 내용을 javascript에서 가지고 소멸되지 않아 재사용이 가능하며,
모든 링크는 name 요소만을 설정하면 iterate를 통해 자동 적용됩니다.
( 물론 이부분은 불필요한 자원 낭비가 될수 있으므로 필요한 변수의 경우만 global로 가져가며, 
나머지는 익명 함수로 선언과 함께 소멸될 수 있도록 하는게 좋습니다.)

9. <b>주의</b> bochJS의 경우는 php등의 언어별 페이지나 tpl과 같은 view요소를 삽입 후 
해당 액션에 대한 모든 부분은 js에서 컨트롤을 하게 됩니다.
그러나 html을 불러오면서 js액션 자체를 페이지내에 포함시키는 경우 script부분의 실행은 미동작됩니다.
이 경우는 별도의 js의 함수를 callback으로 지정하여 사용하면 됩니다.

<b>결국</b> 모든 페이지는 한페이지에서 동작을 하되, 필요한 view요소를 모두 웹통신을 통해 가져온 후
global변수에서 관리를 하며, 각 동작에 대한 컨트롤은 js에서 하게 됩니다.
</pre>
