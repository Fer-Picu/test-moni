from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from consulta import views

urlpatterns = [
    path('v1/consultas/', views.ConsultaListView.as_view()),
    path('v1/consulta/<int:pk>/', views.ConsultaDetailView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
