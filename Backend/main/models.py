from django.db import models

# Create your models here.
class VoiceRecord(models.Model):
    name = models.CharField(max_length=100, null=True)
    birth = models.CharField(max_length=100, null=True)
    place = models.CharField(max_length=1000, null=True)
    career = models.CharField(max_length=1000, null=True)
    phone_number = models.CharField(max_length=100, null=True)
    certificate = models.CharField(max_length=1000, null=True)
    self_intro = models.CharField(max_length=1000, null=True)