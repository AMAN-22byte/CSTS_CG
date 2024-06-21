# # certgen/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from certgen.models import Certificate, BulkCertificates

# Serializers for existing models
class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'

class BulkCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BulkCertificates
        fields = '__all__'

# Serializer for User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'password']  # 'first_name' for the User model

    def create(self, validated_data):
        # Hash the password before saving the user
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            # Hash the password if it is being updated
            validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).update(instance, validated_data)

# #aman;'
# # serializers.py
# from rest_framework import serializers
# from django.contrib.auth.models import User

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'password')
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             password=validated_data['password']
#         )
#         return user

# class CertificateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Certificate
#         fields = '__all__'

# class BulkCertificateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = BulkCertificates
#         fields = '__all__'
