from django.urls import path
from . import views

urlpatterns = [
    path("get-env-vars/", views.get_env_variables, name="get_env_vars"),
]
