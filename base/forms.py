from django import forms
from .models import Question
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class MyUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        # fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for name, field in self.fields.items():
            field.widget.attrs.update({'class': 's-input js-post-title-field ask-title-field'})


class CreateQuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['topic', 'name', 'description']
        # exclude = ['host', 'participants', 'slug']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for name, field in self.fields.items():
            field.widget.attrs.update({'class': 's-input js-post-title-field ask-title-field'})