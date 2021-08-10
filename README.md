# 0802_HK news

해커뉴스 API를 활용한 뉴스 클론코딩

[김민태*프론트엔드*아카데미](https://fastcampus.co.kr/dev_academy_kmt1)

---

작업기간 : 21.08.02 - 21.08.08

사용언어: html, Javascrip

---

## main.js

**getData()**

<li>Ajax를 이용해서 데이터를 받음
<li>JSON을 사용해 파싱

**newsFeed()**

<li>getData함수로 객체 데이터를 받음
<li>템플릿 리터럴을 사용 마크업 구조화
<li>배열에 담긴 템플릿을 join 함수로 문자열로 반환
<li> 삼항 연산자를 사용하여 최소 페이지, 최대 페이지 지정
<li> innerHTML으로  마크업 설정

**newsDetail()**

<li> location.hash로 뉴스 id 받음
<li> getData함수로 id에 맞는 객체 데이터 받음 
<li> 템플릿 리터럴로 마크업 구조를 선명히 함

**makeComment()**

<li>newsDetail 함수의 inner함수
<li>  댓글들을 for문으로 작성

**router()**

화면 변환 함수로서 hash가 변경될 경우 실행
hash 값에 따라서

<li>빈 값일 경우 : newsFeed 함수 호출
<li>페이지가 지정되어 있을경우 : 현재 페이지 저장, newsFeed 함수 호출
<li>해당하지 않을 경우 : newsDetail 함수 호출
