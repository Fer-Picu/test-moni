from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        User.objects.create_user('usuario1', 'email1@example.com', 'password1')
        User.objects.create_user('usuario2', 'email2@example.com', 'password2')
        self.stdout.write(self.style.SUCCESS('Usuarios de ejemplo creados con éxito'))
