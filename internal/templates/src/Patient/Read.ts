import {
  $,
  $Button,
  $Input,
  $Select,
  styleDeclaration,
} from "../Element/Element";
import Patient, { patient } from "./Patient";

let data = {
  //type: "",
  value: "",
};

function handlerChange(e: Event) {
  const { name, value } = e.target as HTMLInputElement;
  data[name] = value;
}

async function fetchData<T>(): Promise<T> {
  if (data.value === "") throw Error("Valor a buscar esta vacio");
  const response = await fetch(
    `${location.href}api/patient/read/${data.value}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

// styles
const styleDataBtn: styleDeclaration = {
  padding: "0 1em",
  border: "0",
  borderRadius: "0.2rem",
  boxShadow: "0 0 3px #0008",
  background: "#fff5",
};

class Searcher extends $ {
  $typeSearch = new $Select({ name: "type", value: "id" })
    .addChild(new $("option", { value: "id" }).text("Id"))
    .setStyle({ width: "5em" });
  $value = new $Input({
    type: "text",
    name: "value",
    placeholder: "Escriba valor a buscar",
  }).onChange({
    callback(ctx, e) {
      handlerChange(e);
    },
    backfn() {},
  });
  $btnCleanData = new $Button(
    {},
    "Limpiar",
    (ctx) => {
      let element = this.$value.element as HTMLInputElement;
      element.value = "";
      data[this.$value.name] = "";
      const searcher = ctx.father;
      searcher.removeChildren(ctx);
      searcher.addChild(this.$btnSendData);
      // remove patient searched
      if (searcher.father.children.length > 2) {
        searcher.father.removeLastChildren();
      }
    },
    () => {}
  )
    .setStyle(styleDataBtn)
    .setStyle({ background: "#f005" });
  $btnSendData = new $Button(
    {},
    "Buscar",
    (ctx, e) => {
      const response = fetchData();
      response.then((value) => {
        const searcher = ctx.father;
        let va = value as { message: string; patient: patient };
        const $patient = new Patient(va.patient);
        searcher.father.addChild($patient);
        searcher.removeChildren(ctx);
        searcher.addChild(this.$btnCleanData);
      });
    },
    () => {}
  ).setStyle(styleDataBtn);
  style: styleDeclaration = {
    width: "100%",
    background: "#00000004",
    boxShadow: "0 0 3px #0007",
    borderRadius: "0.4rem",
    padding: "1em",
    display: "flex",
    justifyContent: "space-between",
  };
  constructor() {
    super("div", {});
    this.setStyle(this.style);
    this.addChildren(this.$typeSearch, this.$value, this.$btnSendData);
  }
}

class Read extends $ {
  $title = new $("h3", {}).text("Buscar Paciente");
  $searcher = new Searcher();
  style: styleDeclaration = {
    width: "min(100%,600px)",
    background: "#00000004",
    boxShadow: "0 0 3px #0007",
    borderRadius: "0.4rem",
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    gap: "1em",
  };
  constructor() {
    super("article", { id: "PatientRead" });
    this.setStyle(this.style);
    this.addChildren(this.$title, this.$searcher);
  }
}

export default new Read();
