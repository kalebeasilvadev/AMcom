from app.models.base_model import BaseModel
from django.db import models


class Produto(BaseModel):
    codigo = models.CharField(max_length=20, unique=True)
    descricao = models.CharField(max_length=255)
    valor_unitario = models.FloatField()
    percentual_comissao = models.FloatField()

    def __str__(self):
        return self.descricao

    class Meta:
        verbose_name = "Produto"
        verbose_name_plural = "Produtos"
        ordering = ["descricao"]
