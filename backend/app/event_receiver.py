from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.contenttypes.models import ContentType
from app.models.base_model import BaseModel
from app.models import Event


@receiver(post_save)
def registrar_evento_atualizacao(sender, instance, created, **kwargs):
    if issubclass(sender, BaseModel) and not created:
        Event.objects.create(
            content_type=ContentType.objects.get_for_model(instance),
            object_id=instance.pk,
            description=f"Registro de {sender.__name__} atualizado.",
            user=getattr(instance, "updated_by", None),
        )
