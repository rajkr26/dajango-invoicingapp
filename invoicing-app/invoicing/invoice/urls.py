



from django.urls import path
from .views import *
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('invoices/' ,csrf_exempt(AllInvoices.as_view()), name='all-invoice' ),
    path('invoices/new' ,csrf_exempt(AllInvoices.as_view()), name= 'add-invoice' ),   
    path('invoices/<int:id>' ,csrf_exempt(SingleInvoice.as_view()), name= 'single-invoice' ),  
    path('invoices/<int:id>/items' ,csrf_exempt(AddItems.as_view()), name= 'Add-items' ),
    path('user/signup/',csrf_exempt(SignUp.as_view()), name = 'SignUp' ),
    path('user/signin/',csrf_exempt(SignIn.as_view()), name = 'SignIn' ),  
]