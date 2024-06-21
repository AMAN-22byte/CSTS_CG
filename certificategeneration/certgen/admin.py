from django.contrib import admin
from certgen.models import Certificate, BulkCertificates

# Register your models here.
admin.site.register(Certificate)
admin.site.register(BulkCertificates)