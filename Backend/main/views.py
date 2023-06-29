from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings

from .models import VoiceRecord
from .serializers import VoiceRecordSerializer
from EasyWork.openai.whisper import SpeechToText
import io

# Create your views here.
class VoiceUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    # MultiPartParser : form-data 요청에서 파일을 파싱하는 데 사용
    # FormParser : 폼 데이터를 파싱하는 데 사용

    def post(self, request, *args, **kwargs):
        audio_file = request.FILES.get('audio')

        if audio_file != None:
            path = default_storage.save('temp.mp3', ContentFile(audio_file.read()))
            tmp_file = os.path.join(settings.MEDIA_ROOT, path)
            result = SpeechToText(tmp_file)
            print(result['language'], result['result'])
            os.remove(tmp_file)
            return Response({'message': '음성이 성공적으로 저장되었습니다.'}, status=200)
        else:
            return Response({'message': '음성이 입력되지 않았습니다.'}, status=400)
