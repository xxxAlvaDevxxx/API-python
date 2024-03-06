import { $, styleDeclaration } from "../Element/Element";
import Patient, { patient } from "./Patient";

async function fetchData<T>(): Promise<T> {
  const response = await fetch(`${location.href}api/patient/read_all`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

class ReadAll extends $ {
    $title = new $('h3',{}).text("Buscar Todos")
  style: styleDeclaration = {
    width: "min(100%,600px)",
    background: "#00000004",
    boxShadow: "0 0 3px #0007",
    borderRadius: "0.4rem",
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    overflowY: "scroll",
    overflowX: "hidden"
  };
  constructor() {
    super("article", { id: "PatientReadAll" });
    this.setStyle(this.style);
    this.addChild(this.$title)
  }
  loadData(){
    const response = fetchData();
    response.then((value) => {
      let va = value as { message: string; patients: { patients: patient[] } };
      va.patients.patients.forEach((data)=>{
        const $patient = new Patient(data)
        this.addChild($patient)
      })
    });
    return this
  }
}

export default new ReadAll()