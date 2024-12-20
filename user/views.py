from django.shortcuts import render,redirect
from django.http import HttpResponse
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
def dashboard(request):
    # Print all cookies
    print("All cookies:", request.COOKIES)

    # Check specific cookie
    user_cookie = request.COOKIES.get('userLoggedIn')
    if not user_cookie:
        print("User is not logged in. Redirecting to signup...")
        return redirect('/signup')
    
    print("User is logged in with cookie:", user_cookie)
    return render(request, 'dashboard/dashboard.html')
def test(request):
    return render(request, 'dashboard/test/test.html')
def result(request):
    return render(request, 'dashboard/result.html')