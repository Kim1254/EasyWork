from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings

from .models import VoiceRecord
from .serializers import ResumeSerializer
from EasyWork.openai.whisper import SpeechToText

# Create your views here.
class VoiceUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    # MultiPartParser : form-data 요청에서 파일을 파싱하는 데 사용
    # FormParser : 폼 데이터를 파싱하는 데 사용

    def post(self, request):
        audio_dict = request.FILES

        if len(audio_dict) > 1:
            VRView=VoiceRecord()
            for key, value in audio_dict.items():
                path = default_storage.save('temp.mp3', ContentFile(value.read()))
                tmp_file = os.path.join(settings.MEDIA_ROOT, path)
                setattr(VRView, key, SpeechToText(tmp_file))
                os.remove(tmp_file)
            resume = ResumeSerializer(VRView)
            return Response(resume.data, status=200)
        else:
            return Response({'message': '음성이 입력되지 않았습니다.'}, status=400)
