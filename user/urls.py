from django.contrib import admin
from django.urls import path
from user import views

urlpatterns = [
    path('', views.index, name='home'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('dashboard/', views.dashboard, name='dashboard')
]
