# Generated by Django 4.2.4 on 2023-08-26 14:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_remove_voicerecord_voice_voicerecord_birth_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='voicerecord',
            old_name='career',
            new_name='result',
        ),
        migrations.RemoveField(
            model_name='voicerecord',
            name='birth',
        ),
        migrations.RemoveField(
            model_name='voicerecord',
            name='certificate',
        ),
        migrations.RemoveField(
            model_name='voicerecord',
            name='name',
        ),
        migrations.RemoveField(
            model_name='voicerecord',
            name='phone_number',
        ),
        migrations.RemoveField(
            model_name='voicerecord',
            name='place',
        ),
        migrations.RemoveField(
            model_name='voicerecord',
            name='self_intro',
        ),
    ]
