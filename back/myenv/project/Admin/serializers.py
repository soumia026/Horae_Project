# serializers.py
from rest_framework import serializers
from .models import *


class EnseignantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enseignant
        fields = '__all__'
        
class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = '__all__'

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'

class SalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salle
        fields = '__all__'

class SeanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seance
        fields = '__all__'

class DateSeanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateSeance
        fields = '__all__'

class SeancesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seances
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = section
        fields = '__all__'

class GroupeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groupe
        fields = '__all__'

class SpecialiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialite
        fields = '__all__'

class HeureSerializer(serializers.ModelSerializer):
    class Meta:
        model = heure
        fields = '__all__'

class EnseigneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enseigne
        fields = '__all__'

class SpecPromoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecPromo
        fields = '__all__'

#class AbcenceSerializer(serializers.ModelSerializer):
    #class Meta:
       # model = Abcence
       # fields = '__all__'


        



class AbcenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abcence
        fields = '__all__'

    def validate_DateAbs(self, value):
        if value is None:
            raise serializers.ValidationError("La date d'absence ne peut pas être nulle.")
        return value



class EcoleAdministrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EcoleAdministration
        fields = '__all__'

class MontantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Montant
        fields = '__all__'
