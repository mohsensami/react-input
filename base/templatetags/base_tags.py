from django import template
from ..models import Topic


register = template.Library()

@register.simple_tag
def sidebar_topics():
    return Topic.objects.all()

# @register.inclusion_tag('sidebar.html')
# def sidebar_topics():
#     return {
#         'topics': Topic.objects.all()
#     }