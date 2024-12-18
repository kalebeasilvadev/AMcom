from datetime import datetime

from rest_framework import serializers

from app.constants import DiaSemana
from app.models import Comissao, ItemVenda, Produto, Venda, Vendedor


class ItemVendaSerializer(serializers.ModelSerializer):
    valor_unitario = serializers.FloatField(required=False)
    percentual_comissao = serializers.FloatField(required=False)
    percentual_comissao_vendedor = serializers.FloatField(required=False)
    venda = serializers.PrimaryKeyRelatedField(
        queryset=Venda.objects.all(), required=False
    )
    produto = serializers.PrimaryKeyRelatedField(queryset=Produto.objects.all())
    quantidade = serializers.IntegerField()

    valor_total = serializers.FloatField(read_only=True, required=False)
    produto_name = serializers.CharField(read_only=True, required=False)
    produto_codigo = serializers.CharField(read_only=True, required=False)

    class Meta:
        model = ItemVenda
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        produto = Produto.objects.get(pk=instance.produto.pk)
        representation["valor_total"] = instance.valor_unitario * instance.quantidade
        representation["produto_name"] = produto.descricao
        representation["produto_codigo"] = str(produto.codigo).zfill(3)
        representation["comissao"] = representation["valor_total"] * (
            instance.percentual_comissao_vendedor / 100
        )
        return representation


class VendaSerializer(serializers.ModelSerializer):
    itens = ItemVendaSerializer(many=True)
    vendedor = serializers.PrimaryKeyRelatedField(queryset=Vendedor.objects.all())
    numero_nota = serializers.IntegerField(read_only=True, required=False)
    data_hora = serializers.DateTimeField(read_only=True, required=False)

    class Meta:
        model = Venda
        fields = "__all__"

    def valida_comissao(self, produto: Produto, dia_semana=None):
        comissao = Comissao.objects.filter(dia_da_semana=dia_semana).first()

        percentual_comissao = produto.percentual_comissao
        if comissao:
            if produto.percentual_comissao < comissao.percentual_minimo:
                percentual_comissao = comissao.percentual_minimo
            elif produto.percentual_comissao > comissao.percentual_maximo:
                percentual_comissao = comissao.percentual_maximo
        return percentual_comissao

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["numero_nota"] = str(instance.numero_nota).zfill(8)
        representation["vendedor"] = instance.vendedor.nome
        representation["vendedor_id"] = instance.vendedor.id
        representation["cliente"] = instance.cliente.nome
        representation["cliente_id"] = instance.cliente.id
        representation["valor_total"] = sum(
            [(item.quantidade * item.valor_unitario) for item in instance.itens.all()]
        )

        representation["itens"] = ItemVendaSerializer(
            instance.itens.all(), many=True
        ).data
        return representation

    def create(self, validated_data):
        itens_data = validated_data.pop("itens")
        data_hora_str = self.initial_data["data_hora"]
        data_hora = datetime.strptime(data_hora_str, "%Y-%m-%dT%H:%M")
        data_venda = data_hora.strftime("%d/%m/%Y %H:%M")

        validated_data["numero_nota"] = (
            Venda.objects.latest("id").id + 1 if Venda.objects.exists() else 1
        )
        venda = Venda.objects.create(**validated_data)
        dia_semana = DiaSemana[data_hora.strftime("%A")].value

        for item_data in itens_data:
            produto = item_data["produto"]

            item_serializer = ItemVenda(
                venda=venda,
                produto=produto,
                valor_unitario=produto.valor_unitario,
                percentual_comissao=produto.percentual_comissao,
                percentual_comissao_vendedor=self.valida_comissao(produto, dia_semana),
                quantidade=item_data["quantidade"],
            )

            item_serializer.save()
        return venda

    def update(self, instance, validated_data):
        itens_data = validated_data.pop("itens")
        instance.vendedor = validated_data.get("vendedor", instance.vendedor)
        instance.save()

        instance.itens.all().delete()
        for item_data in itens_data:
            produto = item_data["produto"]
            percentual_comissao_vendedor = self.valida_comissao(produto)
            item_data.pop("venda", None)
            ItemVenda.objects.create(
                venda=instance,
                produto=produto,
                valor_unitario=produto.valor_unitario,
                percentual_comissao=produto.percentual_comissao,
                percentual_comissao_vendedor=percentual_comissao_vendedor,
                quantidade=item_data["quantidade"],
            )

        return instance
