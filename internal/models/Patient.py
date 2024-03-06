import datetime
import json

filename = "./db.json"

def readDB():
    print("Load existing data (if file already exists) ", filename)
    try:
        with open(filename, "r") as file_json:
            data = json.load(file_json)
            if "patients" not in data:
                print("If the key 'patients' does not exist")
                return {"patients":[]}
            return data
    except FileNotFoundError:
        print("If the file does not exist, create an empty dictionary")
        return {"patients":[]}

def writeDB(data):
    try:
        print("Write the dictionary to a JSON file: ", filename)
        with open(filename, "w") as file_json:
            json.dump(data, file_json, indent=4)
        return True
    except:
        return False
    

class Patient:
    _id = 0
    full_name = ""
    birthday = ""
    internment_date = ""
    discharge_date = ""
    creation_date = ""
    last_update = ""
    pathologies = ""
    status = 0
    def create(self):
        print("model patient create")
        try:
            existing_data = readDB()
            self._id = len(existing_data["patients"])+1
            print("model patient create - set id: ", self._id)
            print("model patient create - extracting attributes of class")
            dict_attributes = self.__dict__
            print("model patient create - New data you want to add")
            new_data = json.dumps(dict_attributes,indent=4)
            print("model patient create - Add the new data to the patient list")
            if "patients" in existing_data:
                existing_data["patients"].append(json.loads(new_data))
            else:
                existing_data["patients"] = [new_data]
            return writeDB(existing_data)
        except:
            return False
    def read_all(self):
        print("model patient read_all")
        try:
            return True, readDB()
        except:
            return False, None
    def read(self, _id:int):
        print("model patient read")
        try:
            data = readDB()
            print("model patient read - search all patients, which one has the id being searched")
            for patient in data["patients"]:
                if patient["_id"] == _id:
                    print("model patient read - patient found with id: ",_id)
                    return True, patient
        except:
            return False, None
    def update(self,_id:int):
        print("model patient update")
        try:
            data = readDB()
            print("model patient update - search all patients, which one has the id being searched")
            for patient in data["patients"]:
                if patient["_id"] == _id:
                    print("model patient update - id found: ", _id)
                    print("model patient update - join the parts")
                    patient["_id"] = _id
                    patient["full_name"] = self.full_name
                    patient["birthday"] = self.birthday
                    patient["last_update"] = self.last_update
                    if self.internment_date is not "":
                        patient["internment_date"] = self.internment_date
                    if self.pathologies is not "":
                        patient["pathologies"] = self.pathologies
                    if self.status is not 0:
                        patient["status"] = self.status
                    return writeDB(data), patient
        except:
            return False, None
    def delete(self, _id:int):
        print("model patient delete")
        try:
            data = readDB()
            print("model patient delete - search all patients, which one has the id being searched")
            for patient in data["patients"]:
                if patient["_id"] == _id:
                    print("model patient delete - id found: ", _id)
                    patient["status"] = 2
                    print("model patient delete - set status: ", patient["status"])
                    return writeDB(data)
        except:
            return False
