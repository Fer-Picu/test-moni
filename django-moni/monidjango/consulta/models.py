from django.db import models

# Create your models here.

class Consulta(models.Model):
    nombre = models.CharField(max_length=200, blank=False)
    apellido = models.CharField(max_length=200, blank=False)
    dni = models.IntegerField(max_length=9999999999, blank=False)
    email = models.EmailField(blank=False)
    sexo = models.CharField(choices=[("Hombre", "Hombre"), ("Mujer", "Mujer")], blank=False)
    aproved = models.BooleanField(default=False, blank=True)
    description = models.CharField(max_length=3000, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.dni)
    
    class Meta:
        ordering = ['created']

