from datetime import datetime, time, timedelta

from django.db.models import Count, F, Sum
from django.db.models.fields import FloatField
from django.db.models.functions.comparison import Cast
from django.utils.dateparse import parse_date
from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissions

from app.models import Comissao, Venda
from app.serializer import ComissaoSerializer
from app.serializer.comissoes import ComissaoReportSerializer


class ComissaoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Comissao.objects.all()
    serializer_class = ComissaoSerializer
    permission_classes = [DjangoModelPermissions]


class ComissaoReportViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Venda.objects.all()
    serializer_class = ComissaoReportSerializer

    def get_queryset(self):
        queryset = Venda.objects.all()
        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")

        if start_date:
            start_date = parse_date(start_date)
            queryset = queryset.filter(data_hora__gte=start_date)
        if end_date:
            end_date = parse_date(end_date)
            queryset = queryset.filter(data_hora__lte=end_date)

        vendedores = (
            queryset.values("vendedor__id", "vendedor__nome")
            .annotate(
                quantidade_vendas=Count("id", distinct=True),
                total_comissao=Sum(
                    Cast(F("itens__valor_unitario"), FloatField())
                    * Cast(F("itens__quantidade"), FloatField())
                    * Cast(F("itens__percentual_comissao_vendedor"), FloatField())
                    / 100,
                    output_field=FloatField(),
                ),
            )
            .order_by("-total_comissao")
        )
        return vendedores
