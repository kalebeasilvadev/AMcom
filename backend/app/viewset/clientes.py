from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissions

from app.models import Cliente
from app.serializer import ClienteSerializer


class ClienteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [DjangoModelPermissions]
