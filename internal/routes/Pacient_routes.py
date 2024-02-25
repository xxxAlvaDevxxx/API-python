from flask import Blueprint
import json
from internal.models.Patient import Patient

# point access
api = Blueprint('routes', __name__, static_folder='static', template_folder='templates')

# api route patient create
@api.route("/api/patient/create")
def create_patient():
    # call class Patient
    new_patient = Patient()
    
    # call method create and asignation to values
    create = new_patient.create(full_name="Doe,Joe",birthday="02/01/2000")

    # filename json
    filename = "../db.json"

    # Load existing data (if file already exists)
    try:
        with open(filename, "r") as file_json:
            existing_data = json.load(file_json)
    except FileNotFoundError:
        # If the file does not exist, create an empty dictionary
        existing_data = {"patients":[]}
    
    # asignating id to patient
    if "patients" in existing_data:
        new_patient._id = len(existing_data["patients"])+1
    
    # extracting attributes of class
    dict_attributes = new_patient.__dict__
    
    # New data you want to add
    new_data = json.dumps(dict_attributes,indent=4)
    
    # Add the data from json1 to the patient list
    if "patients" in existing_data:
        existing_data["patients"].append(json.loads(new_data))
    else:
        existing_data["patients"] = [new_data]

    # Write the dictionary to a JSON file
    with open(filename, "w") as file_json:
        json.dump(existing_data, file_json, indent=4)
    print(f"Los datos se han guardado en el archivo '{filename}'.")

    # creation check
    if create is not True:
        return {"message": "Error in Creation"}
    return {"message": "Creation Sucesfully"}

# api route patient read
@api.route("/api/patient/read")
def read_patient():
    pass

# api route patient update
@api.route("/api/patient/update")
def update_patient():
    pass

# api route patient delete
@api.route("/api/patient/delete")
def delete_patient():
    pass
