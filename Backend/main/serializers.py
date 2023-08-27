from rest_framework import serializers
from .models import VoiceRecord, QuestionVoiceRecord


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceRecord
        fields = [
                'result',
                ]

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionVoiceRecord
        fields = [
                'question',
                'answer',
                ]