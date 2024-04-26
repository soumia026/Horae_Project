from django.urls import path
from . import views

urlpatterns = [
path('teachinfos/<str:teacher_id>/', views.teacher_detail, name='teacher_detail'),
path('teachers',views.teacher_list,name='teacher_list'),
# path('absence/<str:teacher_id>/',views.addAbsence,name='addAbsence'),
path('insertAbs/<str:teacher_id>/',views.insertAbsence,name='insertAbs'),
path('deleteAbsence/<str:teacher_id>/<int:abs_id>/',views.deleteAbsence,name='deleteAbsence'),
path('modules',views.modules_list,name='modules_list'),
path('salles',views.salles_list,name='salles_list'),
path('specialites',views.specialites_list,name='specialites_list'),
path('sections',views.sections_list,name='sections_list'),
path('groupes',views.groupes_list,name='groupes_list'),
# path('addSeance/<str:teacher_id>/',views.addSeance,name='addSeance'),
# path('insertSeance/<str:teacher_id>/',views.insertSeance,name='insertSeance'),

path('delete_enseignants/<str:matricules>/', views.delete_enseignants, name='delete_enseignants'),
path('delete_salles/<str:ids_salles>/', views.delete_salles, name='delete_salles'),


]



