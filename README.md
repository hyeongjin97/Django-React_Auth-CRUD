# Django(REST FULL API)+React를 이용한 Authentication+CRUD
## backend/Auth 설정
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

