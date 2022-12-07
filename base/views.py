from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Question
from .forms import CreateQuestionForm, MyUserCreationForm


def loginView(request):
    page = 'login'
    # if request.user.is_authenticated:
    #     return redirect('home')

    if request.method == 'POST':
        userlogin = request.POST.get('userlogin').lower()
        password = request.POST.get('password')

        try:
            user = User.objects.get(username=userlogin)
        except:
            messages.error(request, 'User does not exist')

        user = authenticate(request, username=userlogin, password=password)

        print(user)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Username OR password does not exit')

    context = {'page': page}
    return render(request, 'base/login_register.html', context)



def logoutView(request):
    logout(request)
    return redirect('home')


def registerView(request):
    form = MyUserCreationForm()

    if request.method == 'POST':
        form = MyUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'An error occurred during registration')

    return render(request, 'base/login_register.html', {'form': form})


def questionsView(request):
    questions = Question.objects.all()
    context = {'questions': questions}
    return render(request, 'base/home.html', context)


def questionView(request, pk):
    question = Question.objects.get(id=pk)
    context = {'question': question}
    return render(request, 'base/question_detail.html', context)


@login_required(login_url='login')
def createQuestionView(request):
    form = CreateQuestionForm()
    if request.method == 'POST':
        form = CreateQuestionForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect('home')
    context = {'form': form}
    return render(request, 'base/question_form.html', context)


def updateQuestionView(request, pk):
    question = Question.objects.get(id=pk)
    form = CreateQuestionForm(instance=question)
    if request.method == 'POST':
        form = CreateQuestionForm(request.POST, instance=question)
        if form.is_valid():
            form.save()
        return redirect('home')
    context = {'form': form}
    return render(request, 'base/question_form.html', context)


def deleteQuestionView(request, pk):
    question = Question.objects.get(id=pk)
    question.delete()
    return redirect('home')