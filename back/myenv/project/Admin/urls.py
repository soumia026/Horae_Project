from django.urls import path
from . import views

urlpatterns = [
path('teachinfos/<str:teacher_id>/', views.teacher_detail, name='teacher_detail'),
path('teachers',views.teacher_list,name='teacher_list'),
# path('absence/<str:teacher_id>/',views.addAbsence,name='addAbsence'),
path('insertAbs/<str:teacher_id>/',views.insertAbs,name='insertAbs'),
path('insertEnseignant/',views.insertEnseignant,name='insertEnseignant'),
path('deleteAbsence/<str:teacher_id>/<int:abs_id>/',views.deleteAbsence,name='deleteAbsence'),


path('modules',views.modules_list,name='modules_list'),
path('salles',views.salles_list,name='salles_list'),
path('specialites',views.specialites_list,name='specialites_list'),
path('sections',views.sections_list,name='sections_list'),
path('groupes',views.groupes_list,name='groupes_list'),
path('addSeance/<str:teacher_id>/<str:semestre>/',views.addSeance,name='addSeance'),
path('insertSeance/<str:teacher_id>/<str:semestre>/',views.insertSeance,name='insertSeance'),
path('delete_enseignants/<str:matricule>/', views.delete_enseignants, name='delete_enseignants'),
path('delete_salles/<str:id_salle>/', views.delete_salles, name='delete_salles'),
path('delete_specialites/<str:ids_specialites>/', views.delete_specialites, name='delete_specialites'),
path('delete_sections/<int:section_id>/', views.delete_sections, name='delete_sections'),
path('delete_groupes/<str:ids_groupes>/', views.delete_groupes, name='delete_groupes'),
path('delete_modules/<str:code>/', views.delete_modules, name='delete_modules'),
path('insertSpecialite/', views.insertSpecialite, name='insertSpecialite'),
path('delete_promotion/<str:nom_promo>/', views.delete_promotion, name='delete_promotion'),
path('delete_seance/<int:seance_id>/', views.delete_seance, name='delete_seance'),
path('insertSection/<str:idPromo>/', views.insertSection, name='insertSection'),
path('insertGroupe/<int:idSection>/', views.insertGroupe, name='insertGroupe'),


path('insertHeure/<int:idSeance>/', views.insertHeure, name='insertHeure'),
path('deleteHeure/<int:ids_Heures>/', views.deleteHeure, name='deleteHeure'),
path('updateHeure/<int:idHeure>/',views.updateHeure, name='update_heure'),
path('updateGroupe/<int:idGroupe>/', views.updateGroupe, name='update_groupe'),
path('updateSpecialite/<int:idSpecialite>/', views.updateSpecialite, name='update_specialite'),
path('updateSection/<int:idSection>/', views.updateSection, name='update_section'),
path('updateEnseignant/<str:matricule>/', views.updateEnseignant, name='update_enseignant'),
path('updateAbsence/<int:idAbs>/', views.updateAbsence, name='update_absence'),

path('updateSalle/<int:id_salle>/', views.updateSalle, name='update_salle'),
path('updateModule/<str:code>/', views.updateModule, name='update_module'),
path('updateSeance/<int:idSeance>/',views.updateSeance, name='update_seance'),

]



