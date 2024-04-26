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
path('delete_specialites/<str:ids_specialites>/', views.delete_specialites, name='delete_specialites'),
path('delete_sections/<str:ids_sections>/', views.delete_sections, name='delete_sections'),
path('delete_groupes/<str:ids_groupes>/', views.delete_groupes, name='delete_groupes'),
path('delete_modules/<str:codes_modules>/', views.delete_modules, name='delete_modules'),
path('delete_absences/<str:ids_absences>/', views.delete_absences, name='delete_absences'),
path('delete_promotion/<str:nom_promo>/', views.delete_promotion, name='delete_promotion'),
path('delete_seance/<int:seance_id>/', views.delete_seance, name='delete_seance'),

 


]



