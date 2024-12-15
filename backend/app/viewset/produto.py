from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissions

from app.models import Produto
from app.serializer.produto import ProdutoSerializer


class ProdutoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [DjangoModelPermissions]
    search_fields = ["descricao", "codigo"]
