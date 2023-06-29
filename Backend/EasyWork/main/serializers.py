from rest_framework import serializers
from .models import VoiceRecord

class VoiceRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceRecord
        fields = ['voice']