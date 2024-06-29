from uuid import uuid4

from django.core.exceptions import ValidationError
from django.utils import timezone


def no_past_date(value):
    if value < timezone.now():
        raise ValidationError("Date can't be in past")


def get_profile_picture_path(instance, filename, **kwargs) -> str:
    name, ext = filename.rsplit(".", 1)
    file = f"{name.lower().replace(' ', '_')}_{uuid4()}.{ext}"
    file_path = f"{instance.username}/profile_picture/{file}"
    return file_path
