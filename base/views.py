from django.shortcuts import render
from .models import Question


def QuestionsView(request):
    questions = Question.objects.all()
    context = {'questions': questions}
    return render(request, 'base/home.html', context)


def QuestionView(request, pk):
    question = Question.objects.get(id=pk)
    context = {'question': question}
    return render(request, 'base/question_detail.html', context)