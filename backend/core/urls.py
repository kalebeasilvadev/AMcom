from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from app.viewset import (
    ClienteViewSet,
    ComissaoReportViewSet,
    ComissaoViewSet,
    ProdutoViewSet,
    VendaViewSet,
    VendedorViewSet,
)

router = DefaultRouter()
router.register(r"venda", VendaViewSet, basename="venda")
router.register(r"vendedor", VendedorViewSet, basename="vendedor")
router.register(r"produto", ProdutoViewSet, basename="produto")
router.register(r"comissao", ComissaoViewSet, basename="comissao")
router.register(r"cliente", ClienteViewSet, basename="cliente")
router.register(r"comissao-report", ComissaoReportViewSet, basename="comissao-report")

schema_view = get_schema_view(
    openapi.Info(
        title="API",
        default_version="v1",
    ),
    public=True,
)

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("docs", schema_view.with_ui("swagger", cache_timeout=0)),
]
