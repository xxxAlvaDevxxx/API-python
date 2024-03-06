import {
  $,
  $Button,
  $LabelAndInput,
  styleDeclaration,
} from "../Element/Element";

let data = {
  full_name: "",
  date_of_birth: "",
  intern_now: false,
  pathologies: "",
};

function handlerChange(e: Event) {
  const { name, value } = e.target as HTMLInputElement;
  data[name] = value;
}

async function fetchData<T>(): Promise<T> {
  if (data.full_name === "") throw Error("Nombre completo esta vacio")
  const response = await fetch(
    `${location.href}api/patient/create?full_name=${data.full_name}&birthday=${data.date_of_birth}&intern_now=${data.intern_now}&pathologies=[${data.pathologies}]`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

// styles
const styleLabelAndInputContainer: styleDeclaration = {
  alignSelf: "center",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 4em",
};
const styleDataBtn: styleDeclaration = {
  width: "80%",
  margin: "auto",
  padding: "1em",
  border: "0",
  borderRadius: "0.2rem",
  boxShadow: "0 0 3px #0008",
  background: "#00f4",
}

class Create extends $ {
  $title = new $("h3", { id: "title-Create" })
    .text("Crear Paciente")
    .setStyle({ position: "absolute", marginTop: "-35px" });
  $full_name = new $LabelAndInput({
    type: "text",
    name: "full_name",
    label: "Nombre Completo: ",
  }).setStyle(styleLabelAndInputContainer);
  $date_of_birth = new $LabelAndInput({
    type: "date",
    name: "date_of_birth",
    label: "Fecha de nacimiento: ",
  }).setStyle(styleLabelAndInputContainer);
  $intern_now = new $LabelAndInput({
    type: "checkbox",
    name: "intern_now",
    label: "Internar ahora: ",
  }).setStyle(styleLabelAndInputContainer);
  $pathologies = new $LabelAndInput({
    type: "text",
    name: "pathologies",
    label: "Patologias: ",
  }).setStyle(styleLabelAndInputContainer);
  $btnCleanData = new $Button({},"Limpiar",(ctx)=>{
    [this.$full_name, this.$date_of_birth, this.$pathologies].forEach(
      (element) =>{
        let inputElement = element.input.element as HTMLInputElement
        inputElement.value = ""
        data[element.input.name] = ""
      }
    );
    setTimeout(()=>{
      const patientCreate = ctx.father
      patientCreate.removeChildren(ctx)
      patientCreate.addChild(this.$btnSendData)
    },500)
  },()=>{}).setStyle(styleDataBtn)
  $btnSendData = new $Button(
    {},
    "Guardar",
    (ctx, e) => {
      const response = fetchData();
      response.then((value) => {
        let va = value as {message:string}
        alert(va.message)
        setTimeout(()=>{
          const patientCreate = ctx.father
          patientCreate.removeChildren(ctx)
          patientCreate.addChild(this.$btnCleanData)
        },500)
      });
    },
    () => {}
  ).setStyle(styleDataBtn);
  style: styleDeclaration = {
    width: "min(100%,600px)",
    height: "60%",
    background: "#00000004",
    boxShadow: "0 0 3px #0007",
    borderRadius: "0.4rem",
    padding: "1em",
    display: "grid",
  };
  constructor() {
    super("article", { id: "PatientCreate" });
    this.setStyle(this.style);
    this.$intern_now.children[1].setStyle({ width: "1.5em", height: "1.5em" });
    this.addChildren(
      this.$title,
      this.$full_name,
      this.$date_of_birth,
      this.$intern_now,
      this.$pathologies,
      this.$btnSendData
    );
    [this.$full_name, this.$date_of_birth, this.$pathologies].forEach(
      (element) =>
        element.onChangeInput({
          callback(ctx, e: Event) {
            handlerChange(e);
          },
          backfn() {},
        })
    );
  }
}

export default new Create();
