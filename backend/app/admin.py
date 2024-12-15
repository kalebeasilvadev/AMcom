from django.contrib import admin

from app.models import (
    Cliente,
    Comissao,
    ItemVenda,
    Produto,
    Venda,
    Vendedor,
)

admin.site.register(Cliente)
admin.site.register(Vendedor)
admin.site.register(Produto)
admin.site.register(Venda)
admin.site.register(ItemVenda)
admin.site.register(Comissao)
