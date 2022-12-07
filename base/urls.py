from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.loginView, name='login'),
    path('logout/', views.logoutView, name='logout'),
    path('register/', views.registerView, name='register'),

    path('', views.questionsView, name='home'),
    path('question/<int:pk>/', views.questionView, name='question-detail'),
    path('create-question/', views.createQuestionView, name='create-question'),
    path('update-question/<int:pk>/', views.updateQuestionView, name='update-question'),
    path('delete-question/<int:pk>/', views.deleteQuestionView, name='delete-question'),
]