from datetime import datetime
from django.utils.translation import gettext as _

import schedule
import time
from .models import *
def translate_day_to_french(day):
    if day.lower() == "monday":
        return _("Lundi")
    elif day.lower() == "tuesday":
        return _("Mardi")
    elif day.lower() == "wednesday":
        return _("Mercredi")
    elif day.lower() == "thursday":
        return _("Jeudi")
    elif day.lower() == "friday":
        return _("Vendredi")
    elif day.lower() == "saturday":
        return _("Samedi")
    elif day.lower() == "sunday":
        return _("Dimanche")
    else:
        return None  # Handle error or return None if day is not recognized




def createDate():
    now = datetime.now()
    today = translate_day_to_french(now.strftime("%A"))

    if not today:
        print("Day translation not found.")
        return

    if not DateSeance.objects.filter(date=now.date()).exists():
        DateSeance.objects.create(date=now.date())

    seances = Seance.objects.filter(Jour__iexact=today)
    dateId = DateSeance.objects.get(date=now.date())

    for seance in seances:
        Seances.objects.create(date=dateId, idSeance=seance, present=True)# myapp/utils.py


def schedule_function():
    # Schedule the function to run every 24 hours
    schedule.every(24).hours.do(createDate)

    # Run the schedule loop
    while True:
        schedule.run_pending()
        time.sleep(1)  # Optional: adjust sleep time to avoid high CPU usage