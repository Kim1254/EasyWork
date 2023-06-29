from django.db import models

# Create your models here.
class VoiceRecord(models.Model):
    # 녹음 내용
    voice = models.FileField(upload_to='media/')
    # 이력서 내용
    name = models.CharField(max_length=100)
    birthday = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    education = models.CharField(max_length=1000)
    career = models.CharField(max_length=1000)
    major_performance = models.CharField(max_length=1000)
    certificate = models.CharField(max_length=1000)
    prize = models.CharField(max_length=1000)
    ability = models.CharField(max_length=1000)
    military_service = models.CharField(max_length=1000)
    cover_letter = models.CharField(max_length=2000)
    why_apply = models.CharField(max_length=2000)

