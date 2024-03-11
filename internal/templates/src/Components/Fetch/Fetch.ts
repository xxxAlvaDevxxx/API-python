import { patient } from "../../Patient/Patient";
import language from "../../language";

const nl = navigator.language;
const jsonForLanguage = language[nl === "es" ? "es" : "en"];
const jFLCreate =
  jsonForLanguage.views[jsonForLanguage.nav[0].toLocaleLowerCase()];

export async function fetchCreate<T>(data: any): Promise<T> {
  if (data.full_name === "") throw Error(`${jFLCreate.labels[0]} esta vacio`);
  const response = await fetch(
    `${location.href}api/patient/create?full_name=${data.full_name}&birthday=${data.date_of_birth}&intern_now=${data.intern_now}&pathologies=[${data.pathologies}]`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

export async function fetchRead<T>(data: any): Promise<T> {
  if (data.value === "") throw Error("Valor a buscar esta vacio");
  const response = await fetch(
    `${location.href}api/patient/read/${data.value}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

export async function fetchReadAll<T>(): Promise<T> {
  const response = await fetch(`${location.href}api/patient/read_all`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

export async function fetchUpdate<T>(patient: patient): Promise<T> {
  const response = await fetch(
    `${location.href}api/patient/update?_id=${patient._id}&full_name=${patient.full_name}&birthday=${patient.birthday}&pathologies=${patient.pathologies}&status=${patient.status}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

export async function fetchDelete<T>(_id: number): Promise<T> {
  const response = await fetch(`${location.href}api/patient/delete/${_id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}
