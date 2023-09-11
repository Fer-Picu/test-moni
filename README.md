# Ejercicio técnico MONI


## Requerimientos

- Docker, docker-compose

## Como levantar el proyecto

1- git clone [este repositorio] proyecto

2- cd proyecto

3- docker compose up -d

4- docker compose exec backend python manage.py makemigrations 

5- docker compose exec backend python manage.py migrate

6- docker compose exec backend python manage.py create_users_example

## Datos 

- Servidor de django http://localhost:8000

- Frontend http://localhost:5173/

    - Cliente http://localhost:5173/Cliente
    - Admin http://localhost:5173/Login datos de usuarios:
        
        -   usuario1 , password1
        -   usuario2 , password2
    

### Decripción del ejercicio :

Se debe desarrollar sitio web en el que se registran pedido de préstamos de usuarios que acceden a él.
El usuario no necesita registrarse para solicitar un préstamo.
Para definir si al usuario se le aprueba o no el préstamo usaremos una API definida debajo.

endpoint: https://api.moni.com.ar/api/v4/scoring/pre-score/[dni]
tenés que pasarle en los headers credential: ZGpzOTAzaWZuc2Zpb25kZnNubm5u

ejemplo: curl https://api.moni.com.ar/api/v4/scoring/pre-score/30156149 -H "credential: ZGpzOTAzaWZuc2Zpb25kZnNubm5u"

En el formulario de pedido de préstamos, el usuario debe ingresar dni, nombre y apellido, género, email y monto solicitado.

El usuario luego de ingresar los datos debe recibir la respuesta negativa o positiva en la misma página que ingresó sus datos.
Contemplar casos de datos ingresados con errores.

También se debe desarrollar un sitio de administración en el que se puedan ver los pedidos de préstamo, con la opción de editarlos y eliminarlos. A este sitio sólo pueden acceder usuarios administradores. No usar admin de Django.
