from django.contrib.auth.models import AbstractUser
from django.db import models

from common.helpers import get_profile_picture_path
from core.models import BaseModel

# Create your models here.


class User(BaseModel, AbstractUser):
    email = models.CharField(max_length=100)

    profile_picture = models.ImageField(
        upload_to=get_profile_picture_path,
        blank=True,
    )

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self) -> str:
        return self.username or self.email or self.id
