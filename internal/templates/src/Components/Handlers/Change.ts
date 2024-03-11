import { $, $Input, $LabelAndInput, CallBack } from "../../Element/Element";
import Create from "../../Patient/Create";
import Patient from "../../Patient/Patient";
import Read from "../../Patient/Read";
import ReadAll from "../../Patient/ReadAll";
import { iCreate, iPatient, iSearcher } from "../../Patient/ports";
import { stylePatientInput } from "../../Patient/styles";
import language from "../../language";

const nl = navigator.language;
const jsonForLanguage = language[nl === "es" ? "es" : "en"];
const jFLNav = jsonForLanguage.nav;

/**
 *
 * handlerChange(e:Event,data:any): void
 *
 * la funcion tiene dos entradas
 *  - e: evento del boton para que pase el valor y el nombre
 *  - data: datos donde se guardaran los datos
 *
 *  */
export const handlerChange = (e: Event, data: any): void => {
  const { name, value } = e.target as HTMLInputElement;
  data[name] = value;
};
export const handlerChangeCheckBox = (e: Event, data: any): void => {
  const { name, checked } = e.target as HTMLInputElement;
  data[name] = checked;
};

// Searcher
export const handlerSearcherCleanData = (
  newThis: iSearcher,
  ctx: $,
  data: any
) => {
  let element = newThis.$value.element as HTMLInputElement;
  element.value = "";
  data[newThis.$value.name] = "";
  const searcher = ctx.father;
  searcher.removeChildren(ctx);
  searcher.addChild(newThis.$btnSendData);
  // remove patient searched
  if (searcher.father.children.length > 2) {
    searcher.father.removeLastChildren();
  }
};

/**
 * TODO: create function that handler change to button
 *
 * handlerChangeToButton(value,data:any): void
 *
 * la funcion tiene dos entradas
 *  - e: evento del boton para que pase el valor y el nombre
 *  - data: datos donde se guardaran los datos
 *
 *  */

/**
 * handlerCleanDatatoCreate(newThis: iCreate,data:any,ctx:$):void
 *
 * - newnewThis: es la clase iCreate para poder tener los hijos
 * - data: para poder limpiar los datos
 * - ctx: es para poder obtener todos los metodos de $
 */
export const handlerCleanDataToCreate = (
  newThis: iCreate,
  data: any,
  ctx: $
): void => {
  [
    newThis.$full_name,
    newThis.$date_of_birth,
    newThis.$intern_now,
    newThis.$pathologies,
  ].forEach((element) => {
    let inputElement = element.input.element as HTMLInputElement;
    inputElement.value = "";
    inputElement.checked = false;
    data[element.input.name] = "";
  });

  setTimeout(() => {
    const patientCreate = ctx.father;
    patientCreate.removeChildren(ctx);
    patientCreate.addChild(newThis.$btnSendData);
  }, 500);
};

export const handlerChangeToButtonUpdate = (newThis: iPatient): void => {
  newThis.labelsAndInputs.forEach((element) => {
    if (element.input.name != "_id") element.input.removeAttr("readonly");
  });
  newThis.$containerBtns.removeAllChildren();
  newThis.$containerBtns.addChildren(newThis.$btnSendData, newThis.$btnDelete);
};

export const handlerLabelsAndInputs = (newThis: Patient) => {
  newThis.labelsAndInputs.forEach((element) => {
    const currentElement = element as $LabelAndInput;
    let value = newThis.patient[currentElement.input.name];
    if (typeof value == "number") value = value.toString();
    currentElement.input.setValue(value);
    currentElement.input.setStyle(stylePatientInput);
    newThis.addChild(currentElement);
    currentElement.onChangeInput({
      callBack(ctx) {
        let _ctx = ctx as $Input;
        const $patient = ctx.father.father as Patient;
        let patient = $patient.patient;
        patient[_ctx.name] = _ctx.value;
      },
      backfn(_e) {},
    });
  });
};

// BtnActions
export const handlerBtnActionsCallBack: CallBack = (ctx) => {
  // assign box-shadow to all btnActions
  ctx.father.children.forEach((element) => {
    element.setStyle({ boxShadow: "0 0 3px #00000040" });
  });
  // assign box-shadow to btn clicked
  ctx.setStyle({ boxShadow: "0 0 3px #00000020" });
  let $App = ctx.father.father;

  // remove display active
  if ($App.children.length > 1) $App.removeChildren($App.children[1]);
  // Set all buttons except the clicked one to status False
  ctx.father.children.forEach((element) => {
    if (element != ctx) element.status = false;
  });
  // conditional to know which button is clicked and display window
  if (ctx.text == jFLNav[0]) $App.addChild(Create);
  if (ctx.text == jFLNav[1]) $App.addChild(Read);
  if (ctx.text == jFLNav[2]) $App.addChild(ReadAll.loadData());
};
export const handlerBtnActionsBackfn: CallBack = (ctx) => {
  // Second click causes the element to have the default color
  ctx.setStyle({ boxShadow: "0 0 3px #00000040" });
  let $App = ctx.father.father;
  // conditional to know which button is clicked and remove the clicked
  if (ctx.text == jFLNav[0]) $App.removeChildren(Create);
  if (ctx.text == jFLNav[1]) $App.removeChildren(Read);
  if (ctx.text == jFLNav[2]) $App.removeChildren(ReadAll);
};
