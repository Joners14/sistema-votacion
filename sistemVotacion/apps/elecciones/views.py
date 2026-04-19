from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Eleccion
from .serializers import EleccionSerializer
from apps.permissions import EsAdmin
#en este codigo aplicamos los permisos en las vistas, provenientes de permissions.py
# Solo admin puede crear, editar y eliminar
# Cualquier usuario autenticado puede ver

class EleccionViewSet(viewsets.ModelViewSet):
    queryset = Eleccion.objects.all()
    serializer_class = EleccionSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            
            return [EsAdmin()]
       
        return [IsAuthenticated()]
