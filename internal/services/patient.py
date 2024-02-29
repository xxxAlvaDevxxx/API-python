from flask import request
from datetime import datetime
from internal.models.patient import Patient

def getArgsAndSetAttributes(log):
    print(f"service patient {log} - get args")
    args = request.args
    if len(args) == 0:
        return {"message": "Doesn't have Args"}
    print(f"service patient {log} - call class Patient")
    patient = Patient()
    print(f"service patient {log} - attributes assignation")
    if args.get("full_name"):
        patient.full_name = args.get("full_name")
    if args.get("birthday"):
        patient.birthday = args.get("birthday")
    if args.get("intern_now") == "true":
        patient.internment_date = datetime.now().strftime("%A, %B %d, %Y %H:%M:%S")
    if args.get("pathologies"):
        patient.pathologies = args.get("pathologies")
    if args.get("status"):
        patient.status = int(args.get("status"))
    return patient, args


class ServicePacient:
    def create(self):
        print("service patient create")
        patient = getArgsAndSetAttributes("create")
        if patient.status == 0:
            patient.status = 1
        patient.creation_date = datetime.now().strftime("%A, %B %d, %Y %H:%M:%S")
        patient.last_update = datetime.now().strftime("%A, %B %d, %Y %H:%M:%S")
        return patient.create()
    def read_all(self):
        print("service patient read_all")
        print("service patient read_all - call class Patient")
        patient = Patient()
        return patient.read_all()
    def read(self, _id):
        print("service patient read")
        print("service patient read - call class Patient")
        patient = Patient()
        return patient.read(int(_id))
    def update(self):
        print("service patient update")
        patient, args = getArgsAndSetAttributes("update")
        patient.last_update = datetime.now().strftime("%A, %B %d, %Y %H:%M:%S")
        return patient.update(int(args.get("id")))
    def delete(self, _id):
        print("service patient delete")
        print("service patient delete - call class Patient")
        patient = Patient()
        return patient.delete(int(_id))