from django.contrib import admin
from .models import Question, Topic


admin.site.register(Topic)
admin.site.register(Question)
