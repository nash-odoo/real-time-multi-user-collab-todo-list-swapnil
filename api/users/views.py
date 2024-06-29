from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import (
    IsAuthenticated,
)

from users.models import User
from users.serializers import UserSerializer

# Create your views here.


class UserDetailView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return User.objects.none()
