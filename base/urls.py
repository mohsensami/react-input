from django.urls import path
from . import views


urlpatterns = [
    path('', views.QuestionsView, name='details'),
    path('question/<int:pk>/', views.QuestionView, name='question-detail'),
]