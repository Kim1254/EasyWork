from django.urls import path
from .views import AnswerVoiceUploadView, OtherVoiceUploadView
from django.conf import settings
from django.conf.urls.static import static

app_name = "main"
urlpatterns = [
    path('voice/answer', AnswerVoiceUploadView.as_view(), name='answer-audio-upload'),
    path('voice/other', OtherVoiceUploadView.as_view(), name='other-audio-upload'),
]