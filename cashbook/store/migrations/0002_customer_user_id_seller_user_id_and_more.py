# Generated by Django 5.1.6 on 2025-03-07 16:26

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
        ('store', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='user_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='seller',
            name='user_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='seller',
            name='category',
            field=models.CharField(choices=[('WholeSale', 'WholeSale'), ('Reseller', 'Reseller')], max_length=20),
        ),
        migrations.CreateModel(
            name='Record',
            fields=[
                ('record_id', models.AutoField(primary_key=True, serialize=False)),
                ('shipping_id', models.IntegerField()),
                ('credit', models.IntegerField()),
                ('debit', models.IntegerField()),
                ('current', models.IntegerField()),
                ('date', models.DateField()),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.customer')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='order.order')),
            ],
        ),
    ]
