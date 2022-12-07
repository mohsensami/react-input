from django import forms
from .models import Question
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class MyUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        # fields = ['name', 'username', 'email', 'password1', 'password2']
        fields = '__all__'


class CreateQuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = '__all__'
        exclude = ['host', 'participants']