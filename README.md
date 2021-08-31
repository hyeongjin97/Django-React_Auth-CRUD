# Django(REST FULL API)+React+Axios를 이용한 Authentication+CRUD
# backend
## backend/Auth 파트 설정
* 가상환경 생성 및 활성화
~~~
python3 -m venv 가상환경 이름
source/bin/가상환경 이름/activate
~~~
* django 패키지 설치
~~~
pip3 install django djangorestframework django-rest-auth django-allauth django-cors-headers
~~~
* Django 프로젝트,앱 생성
~~~
django-admin startproject 프로젝트 이름
python3 manage.py startapp 앱이름
~~~
* settings.py, models.py,admin.py 수정 + forms.py, serializers.py, urls.py 생성
* 마이그래이션/마이그래이트 + 슈퍼 유저 생성
~~~
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
~~~
## backend/CRUD 파트 설정
* 설치한 django project에 새로운 앱 설치
* pillow 설치
~~~
pip3 install pillow
~~~
* media/uploads/images 파일 생성
* settings.py, models.py, admin.py, view.py, urls.py 수정 +serializers.py 생성

* 초기 데이터 삭제 후 마이그래이션 진행
# frontend
## frontend/React 
* react 프로젝트 설치
~~~
npx create-react-app 프로젝트 이름
~~~
* react-router-dom,axios, bootstrap, reactstrap 패키지 설치
~~~
npm install bootstrap@4.6.0 reactstrap@8.9.0 --legacy-peer-deps
npm install react-router-dom
npm install axios
~~~
* component 작성