from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now


class BaseModel(models.Model):
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey(
        User,
        related_name="%(class)s_created_by",
        on_delete=models.SET_NULL,
        null=True,
        editable=False,
    )
    updated_by = models.ForeignKey(
        User,
        related_name="%(class)s_updated_by",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    def save(self, *args, **kwargs):
        if not self.pk:
            self.created_at = now()
            if "user" in kwargs:
                self.created_by = kwargs.pop("user")
        else:
            self.updated_at = now()
            if "user" in kwargs:
                self.updated_by = kwargs.pop("user")

        super().save(*args, **kwargs)

    class Meta:
        abstract = True
