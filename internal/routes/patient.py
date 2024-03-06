from flask import Blueprint
from internal.services.patient import ServicePacient

# point access
api = Blueprint('routes', __name__, static_folder='static', template_folder='templates')

# call class services
service = ServicePacient()

@api.route("/api/patient/create")
def create_patient():
    print("\napi route patient create")
    ok = service.create()
    print("api route patient create - creation check")
    if ok is not True:
        return {"message": "Creation Error"}
    return {"message": "Creation successfully"}

@api.route('/api/patient/read_all')
def read_all_patient():
    print("\napi route patient read_all")
    ok, patients = service.read_all()
    print("api route patient read_all - creation check")
    if ok is not True:
        return {"message": "Reading Error"}
    return {"message": "Reading successfully", "patients": patients}

@api.route("/api/patient/read/<id>")
def read_patient(id):
    print("\napi route patient read")
    ok, patient = service.read(id)
    print("api route patient read - creation check")
    if ok is not True:
        return {"message": "Reading Error"}
    return {"message": "Reading successfully", "patient": patient}

@api.route("/api/patient/update")
def update_patient():
    print("\napi route patient update")
    ok, patient = service.update()
    print("api route patient update - creation check")
    if ok is not True:
        return {"message": "Updating Error"}
    return {"message": "Updating successfully", "patient": patient}

@api.route("/api/patient/delete/<id>")
def delete_patient(id):
    print("\napi route patient delete")
    ok = service.delete(id)
    print("api route patient update - creation check")
    if ok is not True:
        return {"message": "Delete Error"}
    return {"message": "Delete successfully"}
