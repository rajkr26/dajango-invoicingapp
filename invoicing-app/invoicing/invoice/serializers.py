from rest_framework import serializers
from .models import *




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'



class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=Items
        fields=['desc','rate','quantity']



class InvoicesSerializer(serializers.ModelSerializer):
    items= ItemSerializer(many=True)
    class Meta:
        model=Invoices
        fields='__all__'