from django.urls import path, include
from . import views

urlpatterns = [
    # index view
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
]
