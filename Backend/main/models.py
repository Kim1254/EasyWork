from django.db import models

# Create your models here.
class VoiceRecord(models.Model):
    # 녹음 내용
    voice = models.FileField(upload_to='media/')
    # 이력서 내용
    name = models.CharField(max_length=100, null=True)
    birthday = models.CharField(max_length=100, null=True)
    phone = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=100, null=True)
    address = models.CharField(max_length=100, null=True)
    education = models.CharField(max_length=1000, null=True)
    career = models.CharField(max_length=1000, null=True)
    major_performance = models.CharField(max_length=1000, null=True)
    certificate = models.CharField(max_length=1000, null=True)
    prize = models.CharField(max_length=1000, null=True)
    ability = models.CharField(max_length=1000, null=True)
    military_service = models.CharField(max_length=1000, null=True)
    cover_letter = models.CharField(max_length=2000, null=True)
    why_apply = models.CharField(max_length=2000, null=True)