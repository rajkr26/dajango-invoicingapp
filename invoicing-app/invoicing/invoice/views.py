from django.shortcuts import render
from .serializers import *
from .data import *
from django.views import View
from django.http import JsonResponse
import json
import uuid



class AllInvoices(View):
    def get(self, request):
        serializedData= InvoicesSerializer(invoiceData,many=True).data
        # print(serializedData)
        return JsonResponse(serializedData, safe=False)
    
    def post(self, request):
        invData=json.loads(request.body)
        invData['invoice_id']=len(invoiceData)+1
        serialized=InvoicesSerializer(data=invData )
        if serialized.is_valid():
            invoiceData.append(serialized.data)
            return JsonResponse(serialized.data, safe=False)
        return JsonResponse(serialized.errors, safe=False)
    

class SingleInvoice(View):
    def get(self,request,id):
        for item in invoiceData:
            if item['invoice_id']==id:
                serialized=InvoicesSerializer(item).data
                return JsonResponse(serialized, safe=True)
        return   JsonResponse({'message':'invoice not found'})



class AddItems(View):
    def post(self, request, id):
        data= json.loads(request.body)
        serialized=ItemSerializer(data=data)
        if serialized.is_valid():
            for item in invoiceData:
                if item['invoice_id']==id:
                    item['items'].append(serialized.data)
                    return JsonResponse(serialized.data,safe=False) 
            return JsonResponse({'message':'invoice not found'}) 
        return JsonResponse(serialized.errors,safe=False) 
        

class SignUp(View):
    def post(self,request):
        user_data=json.loads(request.body)
        user_data['user_id']=len(userData)+1
        user_serialized = UserSerializer(data=user_data)
        print(user_serialized)
        if (user_serialized.is_valid()):
            userData.append(user_serialized.data)
            # (user_serialized)
            return JsonResponse(user_serialized.data, status=201, safe=False)
        else:
            return JsonResponse(user_serialized.errors, safe=False)



class SignIn(View):
    def post(self, request):
        user_data=json.loads(request.body)
        for index, item in enumerate(userData):
            if(item['email']==user_data['email'] and item['password']==user_data['password']):
                token=str(uuid.uuid4())
                return JsonResponse({'message':"login succesfully",'token':token,"user":item,'state':True})
        return JsonResponse({"message":"Not valid Credential",'state':True}) 

  
# Create your views here.
