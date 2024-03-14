import {
  handlerChangeToButtonUpdate,
  handlerLabelsAndInputs,
} from "../Components/Handlers/Change";
import {
  handlerFetchDelete,
  handlerFetchUpdate,
} from "../Components/Handlers/Fetch";
import { $, $Button, $LabelAndInput } from "../Element/Element";
import language from "../language";

const nl = navigator.language;
const jsonForLanguage = language[nl === "es" ? "es" : "en"];
const jFLPatient = jsonForLanguage.patient;

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

function LabelAndInput(name: string, label: string) {
  return new $LabelAndInput({
    type: "text",
    name,
    label,
    readonly: true,
  }).setStyle({ display: "flex", justifyContent: "space-between" });
}

export default class Patient extends $ {
  $_id = LabelAndInput("_id", `${jFLPatient[0]}: `);
  $full_name = LabelAndInput("full_name", `${jFLPatient[1]}: `);
  $birthday = LabelAndInput("birthday", `${jFLPatient[2]}: `);
  $internment_date = LabelAndInput("internment_date", `${jFLPatient[3]}: `);
  $discharge_date = LabelAndInput("discharge_date", `${jFLPatient[4]}: `);
  $creation_date = LabelAndInput("creation_date", `${jFLPatient[5]}: `);
  $last_update = LabelAndInput("last_update", `${jFLPatient[6]}: `);
  $pathologies = LabelAndInput("pathologies", `${jFLPatient[7]}: `);
  $status = LabelAndInput("status", `${jFLPatient[8]}: `);
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
    (ctx) => handlerFetchDelete(this, ctx),
    () => {}
  );
  $btnSendData = new $Button(
    {},
    "Guardar",
    (ctx) => handlerFetchUpdate(this, ctx),
    () => {}
  );
  $btnUpdate = new $Button(
    {},
    "Actualizar",
    (_ctx) => handlerChangeToButtonUpdate(this),
    () => {}
  );
  $containerBtns = new $("div", { class: "containerBtns" });
  patient: patient;
  constructor(patient: patient) {
    super("article", { class: "patient" });
    this.patient = patient;
    this.render();
  }
  render() {
    handlerLabelsAndInputs(this);
    this.$containerBtns.addChildren(this.$btnUpdate, this.$btnDelete);
    this.onDblClick(
      {
        callBack(ctx, _e) {
          let _ctx = ctx as Patient;
          _ctx.$containerBtns.addChildren(_ctx.$btnUpdate, _ctx.$btnDelete);
          ctx.addChild(_ctx.$containerBtns);
          ctx.setStyle({ scale: "1.03" });
        },
        backfn(ctx) {
          let _ctx = ctx as Patient;
          _ctx.$containerBtns.removeAllChildren();
          ctx.removeChildren(_ctx.$containerBtns);
          ctx.setStyle({ scale: "1" });
        },
      },
      true
    );
    return this;
  }
}
