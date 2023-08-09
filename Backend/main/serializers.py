from rest_framework import serializers
from .models import VoiceRecord

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceRecord
        fields = [
                'name', 
                'birth', 
                'place',
                'career',
                'phone_number',
                'certificate',
                'self_intro',
                ]