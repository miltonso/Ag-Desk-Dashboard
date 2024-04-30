from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from rest_framework import status
from django.shortcuts import render, redirect
from .forms import SignUpForm
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from django.middleware.csrf import get_token


# Create your views here.
class TaskList(APIView):
    def get(self, request, format=None):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Received data:", request.data)
            print("Errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def signup_view(request):
    # Force the setting of a CSRF token in every response from this view
    csrf_token = get_token(request)
    response = JsonResponse({"message": "Ready to handle form submission"})
    response.set_cookie("csrftoken", csrf_token, httponly=False)  # Make sure to set httponly to False for access via JavaScript
    if request.method == "POST":
        data = json.loads(request.body)
        form = SignUpForm(data)
        if form.is_valid():
            user = form.save()
            return JsonResponse(
                {"message": "User created successfully", "user_id": user.id}, status=201
            )
        else:
            return JsonResponse({"errors": form.errors}, status=400)
    return response


def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Redirect to a page after successful login, e.g., task list
            return redirect("/")
        else:
            return render(
                request, "login.html", {"error": "Invalid username or password"}
            )
    return render(request, "login.html")


def logout_view(request):
    logout(request)
    # Redirect to home or login page after logout
    return redirect("login")
