from django.shortcuts import render
from django.http import HttpResponse

# view for homepage
def index(request):
    return render(request, 'typing_system/index.html')

# view for about page
def about(request):
    return render(request, 'typing_system/about.html')
