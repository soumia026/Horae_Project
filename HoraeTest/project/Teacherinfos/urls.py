from django.urls import path
from . import views

urlpatterns = [
path('teachinfos/<str:teacher_id>/', views.teacher_detail, name='teacher_detail'),
path('teachers',views.teacher_list,name='teacher_list'),
path('absence/<str:teacher_id>/',views.addAbsence,name='addAbsence'),
path('insertAbs/<str:teacher_id>/',views.insertAbsence,name='insertAbs'),
path('deleteAbsence/<str:teacher_id>/<int:abs_id>/',views.deleteAbsence,name='deleteAbsence'),
path('addSeance/<str:teacher_id>/',views.addSeance,name='addSeance'),
path('insertSeance/<str:teacher_id>/',views.insertSeance,name='insertSeance'),


path('recover-password/', views.password_recovery, name='password_recovery'),
]
