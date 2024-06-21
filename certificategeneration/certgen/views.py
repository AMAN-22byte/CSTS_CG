# # # certgen/views.py
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth.models import User
from .models import Certificate, BulkCertificates
from .serializers import CertificateSerializer, BulkCertificateSerializer, UserSerializer

# views.py
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CertificateSerializer, BulkCertificateSerializer  # Import serializers here
# Delay the UserSerializer import if it's causing issues
from .serializers import UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })


# Authentication Views

# aman:
# from rest_framework import generics
# from django.contrib.auth.models import User
# from rest_framework.response import Response
# from rest_framework_simplejwt.tokens import RefreshToken
# from .serializers import UserSerializer

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         refresh = RefreshToken.for_user(user)
#         return Response({
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#         })


@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    full_name = request.data.get('full_name')

    if username is None or password is None or full_name is None:
        return Response({'error': 'Please provide all required fields: username, password, and full name'},
                        status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'},
                        status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, first_name=full_name.split()[0], last_name=" ".join(full_name.split()[1:]))
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key}, status=status.HTTP_201_CREATED)

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key})
    
# changes made added above code for user authentication
from django.shortcuts import render
from . models import *
from .serializers import CertificateSerializer, BulkCertificateSerializer
from rest_framework import viewsets

def index(request):
    return render(request, 'index.html')

def certgen(request):
    return render(request, 'index.html') 

def formresults(request):
    return render(request, 'index.html')


class CertificateView(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer

class BulkCertificateView(viewsets.ModelViewSet):
    queryset = BulkCertificates.objects.all()
    serializer_class = BulkCertificateSerializer

    