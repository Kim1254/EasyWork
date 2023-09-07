from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings

from EasyWork.bert.bert import QuestionAnswering
from .models import VoiceRecord
from .serializers import AnswerSerializer
from EasyWork.openai.whisper import SpeechToText

question_dict = {
    'name' : '이름이 무엇입니까?',
    'career' : '어디에서 얼마나 근무하였습니까?',
    'birth' : '생년월일은 언제입니까?',
    'place' : '어디에 거주하고 있습니까?',
    'phone_number' : '번호가 어떻게 됩니까?',
    'certificate' : '어떤 자격증이 있습니까?',
    'self_intro' : '나는 어떤 사람입니까?',
}

class AnswerVoiceUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    # MultiPartParser : form-data 요청에서 파일을 파싱하는 데 사용
    # FormParser : 폼 데이터를 파싱하는 데 사용

    def post(self, request):

        audio_dict = request.FILES

        if len(audio_dict) > 0:
            VRView=VoiceRecord()

            key = list(audio_dict.keys())[0]   #키 이름
            audio = audio_dict[key]    #오디오 파일

            path = default_storage.save('temp.mp3', ContentFile(audio.read()))
            tmp_file = os.path.join(settings.MEDIA_ROOT, path)

            text = SpeechToText(tmp_file)
            print(text)
            answer = QuestionAnswering(text, question_dict[key])
            if key == "phone_number":
                answer = answer[:3]+"-"+answer[3:7]+"+"+answer[7:]

            VRView.question = key
            VRView.answer = answer

            os.remove(tmp_file)
            result = AnswerSerializer(VRView)

            return Response(result.data, status=200)

        else:
            return Response({'message': '음성이 입력되지 않았습니다.'}, status=400)


class OtherVoiceUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):

        audio_dict = request.FILES

        if len(audio_dict) > 0:
            VRView=VoiceRecord()

            question_audio = audio_dict['question']
            answer_audio = audio_dict['answer']

            question_audio_path = default_storage.save('question_temp.mp3', ContentFile(question_audio.read()))
            question_tmp_file = os.path.join(settings.MEDIA_ROOT, question_audio_path)

            answer_audio_path = default_storage.save('answer_temp.mp3', ContentFile(answer_audio.read()))
            answer_tmp_file = os.path.join(settings.MEDIA_ROOT, answer_audio_path)

            question_text = SpeechToText(question_tmp_file)
            answer_text = SpeechToText(answer_tmp_file)

            answer = QuestionAnswering(answer_text, question_text)

            VRView.question = 'other'
            VRView.answer = answer

            result = AnswerSerializer(VRView)
            return Response(result.data, status=200)

        else:
            return Response({'message': '음성이 입력되지 않았습니다.'}, status=400)


"""
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
"""