from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

from core.serializers import DynamicFieldsModelSerializer
from users.models import User


class UserSerializer(DynamicFieldsModelSerializer):

    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "username",
            "profile_picture",
        )


class RegisterUserSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)

    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get("first_name")
        user.last_name = self.validated_data.get("last_name")
        user.save()
        return user
