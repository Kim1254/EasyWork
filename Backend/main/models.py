from django.db import models

# Create your models here.
class VoiceRecord(models.Model):
    voice = models.FileField(upload_to='media/')