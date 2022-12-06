from django.shortcuts import render, redirect
from .models import Question
from .forms import CreateQuestionForm


def questionsView(request):
    questions = Question.objects.all()
    context = {'questions': questions}
    return render(request, 'base/home.html', context)


def questionView(request, pk):
    question = Question.objects.get(id=pk)
    context = {'question': question}
    return render(request, 'base/question_detail.html', context)


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