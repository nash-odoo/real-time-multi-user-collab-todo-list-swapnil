from model_utils import Choices


HIGHEST = "highest"
HIGH = "high"
MEDIUM = "medium"
LOW = "low"
LOWEST = "lowest"


PRIORITY_CHOICES = Choices(
    (HIGHEST, "Highest"),
    (HIGH, "High"),
    (MEDIUM, "Medium"),
    (LOW, "Low"),
    (LOWEST, "Lowest"),
)

CREATE = "create"
READ = "read"
UPDATE = "update"
DELETE = "delete"

PERMISSION_LIST = [CREATE, READ, UPDATE, DELETE]
