from rest_framework import serializers
from .models import VoiceRecord

class VoiceRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceRecord
        fields = ['voice']

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceRecord
        fields = [
                'name', 
                'birthday', 
                'phone', 
                'email', 
                'address', 
                'education', 
                'career', 
                'major_performance', 
                'certificate', 
                'prize', 
                'ability', 
                'military_service',
                'cover_letter',
                'why_apply',
                ]