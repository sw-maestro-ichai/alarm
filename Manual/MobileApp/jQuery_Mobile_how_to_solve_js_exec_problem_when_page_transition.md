####[jQuery Mobile] a태그로 Page 전환 시 javascript 실행 안되는 경우 해결 방법

> 모바일 웹에서 가장 첫 페이지인 index.html에서 다른 html 문서로 전환 시  다른 html 문서에 동작해야할 javascript가 바로 동작 안하는 경우가 존재했다. 
> 예를 들어 근무 환경을 알려주는 페이지가 존재한다고 할 때, 이 페이지는 외부의 날씨 API를 통해 정보를 Ajax를 이용해 긁어온다. 독립적인 페이지로 존재할 때는 외부의  javascript 파일을 읽어들여 잘 작동했다. 그러나 index.html에서 근무환경 페이지로 전환되자마자 정보를 출력해주어야 했는데 공란만 출력되었다. 
> 그 이유는 javascript가 작동하지 않아 날씨 정보를 추출해오지 못했기 때문이다. 이를 해결하기 위하여 아래와 같은 방법을 이용했다.

1. javascript가 실행될 html 문서뿐만 아니라 index.html에도 
<pre><code>&lt;script src=test.js"> &lt;/script></code></pre>를 jQuery 라이브러리가 선언된 아래에 포함되어 있는지 확인한다.


2. 작동되어야할 javascript 파일의 최상위에 delegate() 메소드를 이용하여 javascript를 감싼다. 
>.delegate( selector, eventType, handler )
* eventType: 공백으로 구분된 하나 이상의 JavaScript 이벤트를 포함하는 문자열, "click", "keydown" 또는 사용자 정의 함수명

		블로그의 설명에 따르면 부모의 엘리먼트에서 발생한 이벤트는 자식에게까지 전해지는데, 이때 어떤 자식인지 체크해서 필터를 해주는 기능이라고 한다. 
		좀 더 풀어서 위의 예제에 빗대어 설명하자면  부모인 index.html에서 버튼 클릭이라는 이벤트를 통해 근무환경 페이지이자 자식인 Environment.html로 넘어가게된다. 
		브라우저는 어떤 자식으로 넘어가는지 알지 못해 날씨 정보를 뿌려주지 못한 것이다. 따라서 delegate() 메소드를 통해 어떤 자식으로 넘어갔는지 브라우저에게 알려준 것이다.
		좀더 유연한 설명을 위해 블로그의 말을 인용한다.
		> 문서로딩 이 후 추가되는 요소는 클릭 이벤트가 발생해도 아무런 반응이 없다. (이벤트 핸들러가 자동으로 할당 되지 않는다.)  

		delegate() 메소드는 다음과 같은 방법으로 활용 가능하다.
<pre><code>$(document).delegate('#Environment', 'pageinit', function() { 
$(document).ready(function($) {
	  $.ajax({</pre></code>"#Environment" 는 Enviroment.html을 가리키는 ID값 ,
	'pageinit' 은 최초에 페이지가 initialize될 때,
	function() 은 그 때에 동작하는 메소드를 의미한다. 


3. 위와 같은 방법으로 delegate() 대신 on() 메소드를 이용한다.
> .on( events [, selector] [, data], handler( eventObject ) )
* events: 공백으로 구분된 하나 이상의 이벤트 타입과 옵션인 네임스페이스. "click",  "keydown.myPlugin", ".myPlugin" 등이 있음
* selector: 이벤트가 발생할 요소들의 자식들을 찾을 선택자. 선택자가 null 이거나 생략됐다면 이벤트는 선택된 요소에 도달할때만 실행
* data: 이벤트가 발생할 때 핸들러에 전달할 데이터
* handler(eventObject): 이벤트가 발생되면 실행될 기능. false를 반환하는 함수라면 간단하게 false 를 직접 인자로 하면 된다.

 .on( events-map [, selector] [, data] )
>* events-map: 공백으로 구분된 하나 이상의 이벤트 타입과 선택적인 네임스페이스로 구성된 키(keys)들과 값(values)들의 문자열
				
	블로그의 설명은 위와 같고 좀 더 블로그의 설명을 덧붙이자면 
	> on()은 1.7에서 bind(), delegate(), live()를 대체하는 메서드로 이벤트 핸들러 바인딩에 필요한 기존 메서드의 모든 기능을 제공한다.
jQuery는 1.7.x 이후의 버전에서 위 세 메서드 대신 on()으로 사용할 것을 권장하고 있다.

	고 한다. 이처럼 동적 바인딩이 가능하기 때문에 굳이 $(document).ready() 안에 있을 필요도 없다.

	on() 메소드는 다음과 같은 방법으로 활용 가능하다.
<pre><code>$(document).on('pageinit', '#Environment', function() {
	  $.ajax({</pre></code>"#Environment" 는 Enviroment.html을 가리키는 ID값 ,
	'pageinit' 은 최초에 페이지가 initialize될 때,
	function() 은 그 때에 동작하는 메소드를 의미한다. 
	동적 바인딩이 가능하기 때문에 ready() 메소드를 사용하지 않는 것을 볼 수 있다.


---
#####참고 ]
1. bind()
> .**bind( 이벤트타입, [, 이벤트 데이터], 핸들러(이벤트객체) )**
* .bind() 메소드는 기본적으로 엘리먼트에 이벤트를 바인딩(선언, 할당)을 해준다.
* 이벤트 타입은 클릭, 마우스오버/아웃 등 다양한 브라우저의 이벤트들이 들어간다.
* 마지막으로 핸들러는 해당 이벤트가 감지 될 때 실행 될 함수(명령어들)이다.

2. live()
> **.live( 이벤트, 핸들러(이벤트객체) )**
* 사용법은 .bind()와 같지만 메소드 이름처럼~ 실시간! 바인딩이 가능하다.

		위에 설명했던 .bind()는 동적 엘리먼트에 대한 이벤트 바인딩은 안된다.
		예를 들어 jQuery를 통해 .append('클릭') 등과 같이 동적으로 생성되었다면, .bind()를 바인딩하는 시점에 없었던 애니깐 새롭게 바인딩 하진 않는다.
		하지만, 동적으로 생성된것도 이벤트가 필요할 경우가 있는데 이때 .live()라는 메소드를 이용한다.

---
####* 참조 문서
http://noritersand.tistory.com/218
http://ankyu.entersoft.kr/Lecture/jquery/jquery_02_11.asp
