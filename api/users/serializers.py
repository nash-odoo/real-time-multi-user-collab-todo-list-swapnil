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
