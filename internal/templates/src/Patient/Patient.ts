import {
  $,
  $Button,
  $Input,
  $LabelAndInput,
  styleDeclaration,
} from "../Element/Element";

export type patient = {
  _id: number;
  full_name: string;
  birthday: string;
  internment_date: string;
  discharge_date: string;
  creation_date: string;
  last_update: string;
  pathologies: string;
  status: number;
};

const btnStyle: styleDeclaration = {
  border: "0",
  padding: "0.5em",
  background: "#00000008",
  boxShadow: "0 0 3px #00000080",
  borderRadius: "0.2rem",
};

async function fetchData<T>(patient: patient): Promise<T> {
  const response = await fetch(
    `${location.href}api/patient/update?_id=${patient._id}&full_name=${patient.full_name}&birthday=${patient.birthday}&pathologies=${patient.pathologies}&status=${patient.status}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

async function fetchDelete<T>(_id): Promise<T> {
  const response = await fetch(
    `${location.href}api/patient/delete/${_id}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

function LabelAndInput(name: string, label: string) {
  return new $LabelAndInput({
    type: "text",
    name,
    label,
    readonly: true,
  }).setStyle({ display: "flex", justifyContent: "space-between" });
}

export default class Patient extends $ {
  $_id = LabelAndInput("_id", "Id: ");
  $full_name = LabelAndInput("full_name", "Nombre Completo: ");
  $birthday = LabelAndInput("birthday", "Fecha de nacimiento: ");
  $internment_date = LabelAndInput("internment_date", "Fecha de internamiento");
  $discharge_date = LabelAndInput("discharge_date", "Fecha de alta: ");
  $creation_date = LabelAndInput("creation_date", "Fecha de Creacion: ");
  $last_update = LabelAndInput("last_update", "Ultima modificacion: ");
  $pathologies = LabelAndInput("pathologies", "Patologias: ");
  $status = LabelAndInput("status", "Estatus: ");
  labelsAndInputs = [
    this.$_id,
    this.$full_name,
    this.$birthday,
    this.$internment_date,
    this.$discharge_date,
    this.$creation_date,
    this.$last_update,
    this.$pathologies,
    this.$status,
  ];
  $btnDelete = new $Button(
    {},
    "Eliminar",
    (ctx, e) => {
      let patient = ctx.father.father as Patient
      patient.$status.input.setValue("2")
      const response = fetchDelete(patient.$_id.input.value)
      response.then((value)=>{
        const {message} = value as {message:string}
        ctx.removeAllChildren()
        ctx.text(message)
      })
      setTimeout(()=>{
        ctx.removeAllChildren()
        ctx.text("Eliminar")
      },1000)
    },
    () => {}
  ).setStyle(btnStyle);
  $btnSendData = new $Button(
    {},
    "Guardar",
    (ctx, e) => {
      this.labelsAndInputs.forEach((element) => {
        element.input.readOnly();
      });
      let $containerBtns = ctx.father;
      ctx.removeAllChildren()
      ctx.text("guardando")
      const response = fetchData(this.patient);
      response.then((value) => {
        let va = value as { message: string; patient: patient };
        ctx.removeAllChildren()
        ctx.text(va.message)
      });
      setTimeout(() => {
        ctx.removeAllChildren()
        ctx.text("Guardar")
        $containerBtns.removeAllChildren();
        $containerBtns.addChildren(this.$btnUpdate, this.$btnDelete);
      }, 1000);
    },
    () => {}
  ).setStyle(btnStyle);
  $btnUpdate = new $Button(
    {},
    "Actualizar",
    (ctx, e) => {
      this.labelsAndInputs.forEach((element) => {
        if (element.input.name != "_id") element.input.removeAttr("readonly");
      });
      let $containerBtns = ctx.father;
      $containerBtns.removeAllChildren();
      $containerBtns.addChildren(this.$btnSendData, this.$btnDelete);
    },
    () => {}
  ).setStyle(btnStyle);
  $containerBtns = new $("div", { class: "containerBtns-Patient" }).setStyle({
    marginTop: "1em",
    display: "grid",
    gridTemplateColumns: "auto auto",
    gap: "1em",
  });
  patient: patient;
  style: styleDeclaration = {
    background: "#00000004",
    boxShadow: "0 0 3px #0007",
    borderRadius: "0.4rem",
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    transition: "scale 0.5s ease-in-out 0s",
  };
  constructor(patient: patient) {
    super("article", { class: "patient" });
    this.patient = patient;
    this.setStyle(this.style);
    this.render();
  }
  render() {
    this.labelsAndInputs.forEach((element) => {
      let value = this.patient[element.input.name];
      if (typeof value == "number") value = value.toString();
      element.input.setValue(value);
      this.addChild(element);
      element.onChangeInput({
        callback(ctx, e: Event) {
          let _ctx = ctx as $Input
          //const { name, value } = e.target as HTMLInputElement;
          const $patient = ctx.father.father as Patient;
          let patient = $patient.patient;
          patient[_ctx.name] = _ctx.value;
        },
        backfn(ctx, e) {},
      });
    });
    this.$containerBtns.addChildren(this.$btnUpdate, this.$btnDelete);
    this.onDblClick(
      {
        callback(ctx, e) {
          let _ctx = ctx as Patient
          _ctx.$containerBtns.addChildren(_ctx.$btnUpdate, _ctx.$btnDelete);
          ctx.addChild(_ctx.$containerBtns);
          ctx.setStyle({ scale: "1.03" });
        },
        backfn(ctx, e) {
          let _ctx = ctx as Patient
          _ctx.$containerBtns.removeAllChildren()
          ctx.removeChildren(_ctx.$containerBtns);
          ctx.setStyle({ scale: "1" });
        },
      },
      true
    );
    return this;
  }
}
