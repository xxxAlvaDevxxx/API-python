from time import time

class Patient:
    _id = 0
    full_name = ""
    birthday = ""
    internment_date = ""
    discharge_date = ""
    creation_date = ""
    last_update = ""
    pathologies = []
    
    def create(self, full_name, birthday, internment_now = None, pathologies = None):
        try:
            # join the parts
            self.creation_date = time()
            self.last_update = self.creation_date
            self.full_name = full_name
            self.birthday = birthday
            if internment_now is not None:
                self.internment_date = self.creation_date
            if pathologies is not None:
                self.pathologies = pathologies

            return True
        except:
            return False

    def read(self):
        try:
        # code...
            return True
        except:
            return False
        
    def update(self):
        try:
        # code...
            return True
        except:
            return False
    
    def delete(self):
        try:
        # code...
            return True
        except:
            return False
