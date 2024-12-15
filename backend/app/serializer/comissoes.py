from rest_framework import serializers
from app.models import Comissao, Venda


class ComissaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comissao
        fields = "__all__"


class ComissaoReportSerializer(serializers.ModelSerializer):
    vendedor = serializers.CharField(source="vendedor__nome")
    codigo = serializers.CharField(source="vendedor__id")
    quantidade_vendas = serializers.IntegerField()
    total_comissao = serializers.FloatField()

    class Meta:
        model = Venda
        fields = ["vendedor", "codigo", "quantidade_vendas", "total_comissao"]
