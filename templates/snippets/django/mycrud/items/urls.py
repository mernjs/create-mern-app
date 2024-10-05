from django.urls import path
from . import views

urlpatterns = [
    path('', views.item_list, name='item_list'),       
    path('add/', views.add_item, name='add_item'),        
    path('edit/<int:id>/', views.edit_item, name='edit_item'),
    path('delete/<int:id>/', views.delete_item, name='delete_item'), 
]
