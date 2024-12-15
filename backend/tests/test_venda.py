from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from app.models import Venda, ItemVenda


class VendaTests(APITestCase):
    def setUp(self):
        # Setup code to create initial data for tests
        self.venda_data = {
            "itens": [],
            "vendedor": 1,
            "numero_nota": "12345",
            "cliente": 1,
        }
        self.venda = Venda.objects.create(**self.venda_data)

    def test_venda_list(self):
        url = reverse("venda-list")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_venda_create(self):
        url = reverse("venda-list")
        data = {"itens": [], "vendedor": 1, "numero_nota": "67890", "cliente": 2}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_venda_read(self):
        url = reverse("venda-detail", args=[self.venda.id])
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_venda_update(self):
        url = reverse("venda-detail", args=[self.venda.id])
        data = {"itens": [], "vendedor": 1, "numero_nota": "54321", "cliente": 1}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_venda_partial_update(self):
        url = reverse("venda-detail", args=[self.venda.id])
        data = {"numero_nota": "98765"}
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_venda_delete(self):
        url = reverse("venda-detail", args=[self.venda.id])
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
