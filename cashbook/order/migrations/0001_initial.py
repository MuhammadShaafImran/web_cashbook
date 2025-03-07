# Generated by Django 5.1.6 on 2025-03-07 01:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('order_item_id', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.PositiveIntegerField()),
                ('total', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_id', models.AutoField(primary_key=True, serialize=False)),
                ('category', models.CharField(choices=[('User_Defined', 'User Defined')], max_length=50)),
                ('seller_id', models.IntegerField()),
                ('name', models.CharField(max_length=50)),
                ('price', models.IntegerField()),
                ('size_type', models.CharField(choices=[('lb', 'Pound'), ('onz', 'Ounce')], max_length=3)),
                ('size', models.IntegerField()),
                ('quantity', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('order_id', models.AutoField(primary_key=True, serialize=False)),
                ('customer_id', models.IntegerField()),
                ('total', models.IntegerField(blank=True, null=True)),
                ('order_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='order.orderitem')),
            ],
        ),
        migrations.AddField(
            model_name='orderitem',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='order.product'),
        ),
    ]
