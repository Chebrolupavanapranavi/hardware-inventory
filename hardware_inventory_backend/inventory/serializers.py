from rest_framework import serializers
from .models import User, InventoryItem

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_admin = serializers.BooleanField(required=True)
    is_user = serializers.BooleanField(required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'is_admin', 'is_user')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_admin=validated_data['is_admin'],
            is_user=validated_data['is_user']
        )
        return user

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = '__all__'