from django.urls import path
from .views import VoiceUploadView
from django.conf import settings
from django.conf.urls.static import static

app_name = "main"
urlpatterns = [
    path('voice', VoiceUploadView.as_view(), name='audio-upload'),
]