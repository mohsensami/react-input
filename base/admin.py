from django.contrib import admin
from .models import Question, Topic, Answer


class TopicAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug' : ('name',)}


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('name', 'host', 'topic')
    prepopulated_fields = {'slug' : ('name',)}


admin.site.register(Answer)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Question, QuestionAdmin)
