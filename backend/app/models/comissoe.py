from app.models.base_model import BaseModel
from django.db import models


class Comissao(BaseModel):
    dia_da_semana = models.CharField(
        max_length=10,
        unique=True,
        choices=[
            ("Segunda", "Segunda"),
            ("Terça", "Terça"),
            ("Quarta", "Quarta"),
            ("Quinta", "Quinta"),
            ("Sexta", "Sexta"),
            ("Sábado", "Sábado"),
            ("Domingo", "Domingo"),
        ],
    )
    percentual_minimo = models.FloatField()
    percentual_maximo = models.FloatField()

    def __str__(self):
        return (
            f"{self.dia_da_semana}: {self.percentual_minimo}-{self.percentual_maximo}%"
        )

    class Meta:
        verbose_name = "Comissão"
        verbose_name_plural = "Comissões"
        ordering = ["dia_da_semana"]
