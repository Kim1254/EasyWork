from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import VoiceRecord
from .serializers import VoiceRecordSerializer

# Create your views here.
class VoiceUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    # MultiPartParser : form-data 요청에서 파일을 파싱하는 데 사용
    # FormParser : 폼 데이터를 파싱하는 데 사용

    def post(self, request, *args, **kwargs):
        serializer = VoiceRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': '음성이 성공적으로 저장되었습니다.'}, status=200)
        else:
            return Response(serializer.errors, status=400)