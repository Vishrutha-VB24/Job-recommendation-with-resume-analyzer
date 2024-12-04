from django.urls import path
from . import views

urlpatterns = [
    path('parse-resume/', views.parse_resume, name='parse_resume'),
    path('parse-job-posting/', views.create_job_posting, name='parse_job_posting'),

    # path('api/profile/', views.profile_view, name='profile_view'),
    # path('api/profile/update/', views.profile_update, name='profile_update'),
]
