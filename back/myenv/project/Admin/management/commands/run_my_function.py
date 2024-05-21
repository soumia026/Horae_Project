# myapp/management/commands/run_my_function.py
from django.core.management.base import BaseCommand
from Admin.utils import schedule_function

class Command(BaseCommand):
    help = 'Runs my_function'

    def handle(self, *args, **options):
       schedule_function()
