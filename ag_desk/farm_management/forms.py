from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import UserProfile

class SignUpForm(UserCreationForm):
    is_owner = forms.BooleanField(required=False, help_text='Check if the user is an owner.')

    class Meta:
        model = User
        fields = ("username", "password1", "password2", "is_owner")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_staff = self.cleaned_data["is_owner"]
        if commit:
            user.save()
            UserProfile.objects.create(user=user, is_owner=self.cleaned_data["is_owner"])
        return user