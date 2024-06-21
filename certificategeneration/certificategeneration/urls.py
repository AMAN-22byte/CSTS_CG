"""
URL configuration for certificategeneration project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from certgen import views
from rest_framework import routers
from certgen.views import register_user, CustomObtainAuthToken

router = routers.DefaultRouter()
router.register(r'certificates', views.CertificateView)
router.register(r'bulkcertificates', views.BulkCertificateView)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# added 1st 2 lines
urlpatterns = [
     path('admin/', admin.site.urls),
    path('', views.index),
    path('certgen/', views.certgen),
    path('formresults/', views.formresults),
    path('api/', include(router.urls)),
    path('api/register/', register_user, name='register'),
    path('api/login/', CustomObtainAuthToken.as_view(), name='login'),

    #aman:
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
