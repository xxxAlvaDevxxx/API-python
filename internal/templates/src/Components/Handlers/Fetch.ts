import { $ } from "../../Element/Element";
import Patient, { patient } from "../../Patient/Patient";
import { iCreate, iPatient, iSearcher } from "../../Patient/ports";
import { fetchDelete, fetchRead, fetchUpdate } from "../Fetch/Fetch";

/**
 * handlerFetchCreate(newThis: iCreate,ctx:$,response:Promise<unknown>):void
 *
 * - newthis: es la clase iCreate para poder tener los hijos
 * - data: para poder limpiar los datos
 * - ctx: es para poder obtener todos los metodos de $
 */
export const handlerFetchCreate = (
  newThis: iCreate,
  ctx: $,
  response: Promise<unknown>
): void => {
  response.then((value) => {
    let va = value as { message: string };
    alert(va.message);
    setTimeout(() => {
      const patientCreate = ctx.father;
      patientCreate.removeChildren(ctx);
      patientCreate.addChild(newThis.$btnCleanData);
    }, 500);
  });
};

/**
 * handlerFetchReadAll(ctx:$, response:Promise<unknown>):void
 */
export const handlerFetchReadAll = (
  ctx: $,
  response: Promise<unknown>
): void => {
  response.then((value) => {
    let va = value as { message: string; patients: { patients: patient[] } };
    va.patients.patients.forEach((data) => {
      const $patient = new Patient(data);
      ctx.addChild($patient);
    });
  });
};

export const handlerFetchUpdate = (newThis: iPatient, ctx: $): void => {
  newThis.labelsAndInputs.forEach((element) => {
    element.input.readOnly();
  });
  ctx.removeAllChildren();
  ctx.setText("guardando");
  const response = fetchUpdate(newThis.patient);
  response.then((value) => {
    let va = value as { message: string; patient: patient };
    ctx.removeAllChildren();
    ctx.setText(va.message);
  });
  setTimeout(() => {
    ctx.removeAllChildren();
    ctx.setText("Guardar");
    newThis.$containerBtns.removeAllChildren();
    newThis.$containerBtns.addChildren(newThis.$btnUpdate, newThis.$btnDelete);
  }, 1000);
};

export const handlerFetchDelete = (patient: iPatient, ctx: $): void => {
  patient.$status.input.setValue("2");
  const response = fetchDelete(patient.$_id.input.value);
  response.then((value) => {
    const { message } = value as { message: string };
    ctx.removeAllChildren();
    ctx.setText(message);
  });
  setTimeout(() => {
    ctx.removeAllChildren();
    ctx.setText("Eliminar");
  }, 1000);
};

export const handlerFetchSearcherRead = (
  newThis: iSearcher,
  ctx: $,
  data: any
) => {
  const response = fetchRead(data);
  response.then((value) => {
    const searcher = ctx.father;
    let va = value as { message: string; patient: patient };
    const $patient = new Patient(va.patient);
    searcher.father.addChild($patient);
    searcher.removeChildren(ctx);
    searcher.addChild(newThis.$btnCleanData);
  });
};
