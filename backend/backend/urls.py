from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from products.views import ProductView
from rest_framework import routers


route = routers.DefaultRouter()
route.register("",ProductView,basename='productviews')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include(route.urls)),
    path('api/v1/users/', include('users.urls')),
]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
