from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings

from .models import VoiceRecord, QuestionVoiceRecord
from .serializers import AnswerSerializer
from EasyWork.openai.whisper import SpeechToText

# Create your views here.
class AnswerVoiceUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    # MultiPartParser : form-data 요청에서 파일을 파싱하는 데 사용
    # FormParser : 폼 데이터를 파싱하는 데 사용

    def post(self, request):
        audio_dict = request.FILES

        if len(audio_dict) > 0:
            VRView=VoiceRecord()

            question = list(audio_dict.keys())[0]
            audio = audio_dict[question]

            path = default_storage.save('temp.mp3', ContentFile(audio.read()))
            tmp_file = os.path.join(settings.MEDIA_ROOT, path)
            view_dict = parse(question, SpeechToText(tmp_file))

            VRView.result = view_dict[question]

            os.remove(tmp_file)
            answer = AnswerSerializer(VRView)

            return Response(answer.data, status=200)
        else:
            return Response({'message': '음성이 입력되지 않았습니다.'}, status=400)

def parse(key, text):
    result = {}

    if key == 'birth_place':
        spl = text['result'].split(' ')
        result['place'] = {'result': spl[0]}

        print("test:", len(spl))

        if len(spl) > 2:
            str2 = spl[1]
            for strs in spl[2:]:
                str2 = str2 + ' ' + strs
            result['birth'] = {'result': str2}
        elif len(spl) == 2:
            result['birth'] = {'result': spl[1]}
        else:
            result = {
                'place': {'result': ''},
                'birth': {'result': ''}
            }
    else:
        result = {key: {'result': text['result']}}

    return result



class OtherVoiceUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):
        audio_dict = request.FILES
        if len(audio_dict) > 0:
            VRView=QuestionVoiceRecord()

            question_audio = audio_dict['question']
            answer_audio = audio_dict['answer']


            #수정 필요

            result = AnswerSerializer(VRView)
            return Response(result.data, status=200)
        else:
            return Response({'message': '음성이 입력되지 않았습니다.'}, status=400)
