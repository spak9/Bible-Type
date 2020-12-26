from django.urls import path, include
from . import views

urlpatterns = [
    # play view
    path('', views.play, name='play'),
]
