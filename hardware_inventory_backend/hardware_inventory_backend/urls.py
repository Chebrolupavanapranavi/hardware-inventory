# urls.py

from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-token-auth/', obtain_auth_token),  # Token authentication endpoint
    # Add your app URLs here
    path('api/', include('inventory.urls')),  # Assuming you have an inventory app
]
