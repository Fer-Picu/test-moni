from .serializers import ConsultaSerializer
from .models import Consulta
from django.http import Http404
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
import requests


class ConsultaListView(APIView):

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, format=None):
        consultas = Consulta.objects.all()
        serializer = ConsultaSerializer(consultas, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = ConsultaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, format=None):
        serializer = ConsultaSerializer(data=request.data)
        
        description = ''
        aproved = False

        if serializer.is_valid():
            dni = serializer.validated_data.get('dni')

            try:
                api_url = settings.URL_MONI
                credential = settings.APIKEY_MONI
                complete_url = f"{api_url}{dni}"
                response = requests.get(complete_url, headers={"credential": credential})
                response_data = response.json()
                
                if response_data['has_error']:
                    description = 'Error en la validación del DNI.'
                else:
                    aproved = (response_data['status'] == 'approve')

            except Exception as e:
                description = f"Error al consultar la API: {e}"

            serializer.validated_data['aproved'] = aproved
            serializer.validated_data['description'] = description
            serializer.save()

            # Determinar el código de estado HTTP a devolver
            http_status = status.HTTP_201_CREATED if not description else status.HTTP_200_OK

            return Response(serializer.data, status=http_status)
        
        else:
            description = 'Error en la validación de los datos del formulario.'
            return Response({'description': description, **serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ConsultaDetailView(APIView):
    """
    Retrieve, update or delete a consulta instance.
    """
    def get_object(self, pk):
        try:
            return Consulta.objects.get(pk=pk)
        except Consulta.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        consulta = self.get_object(pk)
        serializer = ConsultaSerializer(consulta)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        print(f"PK recibido: {pk}")  # Depuración
        consulta = self.get_object(pk)
        print(f"PK recibido: {consulta}")  # Depuración
        serializer = ConsultaSerializer(consulta, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        consulta = self.get_object(pk)
        consulta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
