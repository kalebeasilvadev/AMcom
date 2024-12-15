from app.models.base_model import BaseModel
from django.db import models


class Venda(BaseModel):
    numero_nota = models.CharField(max_length=20, unique=True)
    data_hora = models.DateTimeField(auto_now_add=True)
    cliente = models.ForeignKey("app.Cliente", on_delete=models.CASCADE)
    vendedor = models.ForeignKey("app.Vendedor", on_delete=models.CASCADE)

    def __str__(self):
        return f"Venda {self.numero_nota}"

    class Meta:
        verbose_name = "Venda"
        verbose_name_plural = "Vendas"
        ordering = ["data_hora"]


class ItemVenda(models.Model):
    venda = models.ForeignKey(Venda, related_name="itens", on_delete=models.CASCADE)
    produto = models.ForeignKey("app.Produto", on_delete=models.CASCADE)
    valor_unitario = models.FloatField()
    percentual_comissao = models.FloatField()
    percentual_comissao_vendedor = models.FloatField()
    quantidade = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantidade}x {self.produto.descricao}"

    class Meta:
        verbose_name = "Item de Venda"
        verbose_name_plural = "Itens de Venda"
        ordering = ["id"]
