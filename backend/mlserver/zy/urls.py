from django.urls import path
from .views import file_to_text

urlpatterns = [
    path('doc/', file_to_text)
]