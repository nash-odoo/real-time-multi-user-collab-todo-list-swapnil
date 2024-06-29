from model_utils import Choices


HIGH = "high"
MEDIUM = "medium"
LOW = "low"

PRIORITY_CHOICES = Choices(
    (HIGH, "High"),
    (MEDIUM, "Medium"),
    (LOW, "Low"),
)

CREATE = "create"
READ = "read"
UPDATE = "update"
DELETE = "delete"

PERMISSION_LIST = [CREATE, READ, UPDATE, DELETE]
