from uuid import uuid4


def get_profile_picture_path(instance, filename, **kwargs) -> str:
    name, ext = filename.rsplit(".", 1)
    file = f"{name.lower().replace(' ', '_')}_{uuid4()}.{ext}"
    file_path = f"{instance.username}/profile_picture/{file}"
    return file_path
