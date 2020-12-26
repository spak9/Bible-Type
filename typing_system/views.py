from django.shortcuts import render
from django.http import HttpResponse

# a play view
def play(request):
    return render(request, 'typing_system/index.html')
