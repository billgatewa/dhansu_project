from django.shortcuts import render

# Create your views here.
def index(request):
    context = {
        'var':'variable'
    }
    return render(request,'index.html')
def login(request):
    return render(request, 'login.html')
def signup(request):
    return render(request, 'signup.html')