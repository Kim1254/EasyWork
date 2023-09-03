from django.urls import path
from .views import AnswerVoiceUploadView, OtherVoiceUploadView

app_name = "main"
urlpatterns = [
    path('voice/answer', AnswerVoiceUploadView.as_view(), name='answer-audio-upload'),
    path('voice/other', OtherVoiceUploadView.as_view(), name='other-audio-upload'),
]