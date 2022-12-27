from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Question, Answer, Topic
from .forms import CreateQuestionForm, MyUserCreationForm, AnswerForm
from django.utils.text import slugify

from django.db.models import Count

def loginView(request):
    page = 'login'
    if request.user.is_authenticated:
        messages.warning(request, 'You are already logged in!', 'warning')
        return redirect('home')

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
    if request.user.is_authenticated:
        messages.warning(request, 'You are already logged in!', 'warning')
        return redirect('home')
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


def homeView(request):
    q = request.GET.get('q') if request.GET.get('q') != None else ''
    tab = request.GET.get('tab') if request.GET.get('tab') != None else ''
    questions = Question.objects.filter(topic__slug__icontains=q)
    if tab=='hot':
        questions = Question.objects.all().annotate(num_answer=Count('answer')).order_by('-num_answer')
    # topics = Topic.objects.all()
    context = {'questions': questions}
    return render(request, 'base/home.html', context)


def questionsView(request):
    questions = Question.objects.all()
    context = {'questions': questions}
    return render(request, 'base/home.html', context)


def questionView(request, slug):
    question = Question.objects.get(slug=slug)
    form = AnswerForm()
    context = {'question': question, 'form':form}
    if request.method == 'POST':
        body = request.POST.get('body')
        Answer.objects.create(
            user = request.user,
            question = question,
            body = body
        )
        return redirect('question-detail' ,slug = question.slug )
    return render(request, 'base/question_detail.html', context)


@login_required(login_url='login')
def createQuestionView(request):
    form = CreateQuestionForm()
    if request.method == 'POST':
        form = CreateQuestionForm(request.POST)
        if form.is_valid():
            question = form.save(commit=False)
            question.slug = slugify(form.cleaned_data['name'])
            question.host = request.user
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