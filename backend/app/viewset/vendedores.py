from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissions

from app.models import Vendedor
from app.serializer import VendedorSerializer


class VendedorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Vendedor.objects.all()
    serializer_class = VendedorSerializer
    permission_classes = [DjangoModelPermissions]
