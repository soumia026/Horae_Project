from django.urls import path
from . import views

urlpatterns = [
path('teachinfos/<str:teacher_id>/', views.teacher_detail, name='teacher_detail'),
path('teachers',views.teacher_list,name='teacher_list'),
# path('absence/<str:teacher_id>/',views.addAbsence,name='addAbsence'),
path('insertAbs/<str:teacher_id>/',views.insertAbs,name='insertAbs'),
path('insertEnseignant/',views.insertEnseignant,name='insertEnseignant'),
# path('insert-enseignant/', views.insertEnseignant, name='insert_enseignant'),
path('attribuer_Module_Ens/',views.attribuer_Module_Ens,name='attribuer_Module_Ens'),

path('inscription/', views.inscription, name='inscription'),
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
path('calculerHeuresSup/<str:matricule>/<str:nbrHeuresCharge>/<str:TauxCours>/<str:TauxTd>/<str:TauxTp>/',views.calculerHeuresSup, name='calculerHeuresSup'),
path('inscription_ecole_administration/', views.inscription_ecole_administration, name='inscription_ecole_administration'),
path('changer_mot_de_passe/', views.changer_mot_de_passe_ecole_administration, name='changer_mot_de_passe_ecole_administration'),
path('changer_mot_de_passe_enseignant/', views.changer_mot_de_passe_enseignant, name='changer_mot_de_passe_enseignant'),
path('insert_ecole_administration/', views.insert_ecole_administration, name='insert_ecole_administration'),
path('delete_ecole_administration/<str:matricule>/', views.delete_ecole_administration, name='delete_ecole_administration'),
path('update_ecole_administration/<str:matricule>/', views.update_ecole_administration, name='update_ecole_administration'),
path('exporter_donnees_excel/', views.exporter_donnees_excel, name='exporter_donnees_excel'),
path('exporter_donnees_pdf/', views.export_enseignants_pdf, name='export_enseignants_pdf'),
path('export_groupes_pdf/', views.export_groupes_pdf, name='export_groupes_pdf'),
path('export_specialites_pdf/', views.export_specialites_pdf, name='export_specialites_pdf'),
path('export_modules_pdf/', views.export_modules_pdf, name='export_modules_pdf'),
path('export_absences_pdf/', views.export_absences_pdf, name='export_absences_pdf'),
path('export_sections_pdf/', views.export_sections_pdf, name='export_sections_pdf'),
path('export_seances_pdf/', views.export_seances_pdf, name='export_seances_pdf'),
path('calculer_montant/<str:debut_semestre>/<str:fin_semestre>/<str:PU_MAB>/<str:PU_MAA>/<str:PU_MCB>/<str:PU_MCA>/<str:PU_Professeur>/<str:per_securite_social>/<str:per_irg>/',views.calculer_montant,name="calculer_montant"),
path('inscription_ecole_administration/', views.inscription_ecole_administration, name='inscription_ecole_administration'),
path('export_montants_pdf/', views.export_montants_pdf, name='export_montants_pdf'),
]





