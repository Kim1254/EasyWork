from rest_framework import serializers
from .models import VoiceRecord


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceRecord
        fields = [
                'question',
                'answer',
                ]