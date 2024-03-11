import {
  $,
  $Button,
  $Input,
  $LabelAndInput,
  $Select,
} from "../Element/Element";
import { patient } from "./Patient";

export interface iSearcher {
  $typeSearch: $Select;
  $value: $Input;
  $btnCleanData: $Button;
  $btnSendData: $Button;
}

export interface iSelectorContainer {
  $btnCreate: $Button;
  $btnRead: $Button;
  $btnReadAll: $Button;
}

export interface iCreate {
  $title: $;
  $full_name: $LabelAndInput;
  $date_of_birth: $LabelAndInput;
  $intern_now: $LabelAndInput;
  $pathologies: $LabelAndInput;
  $btnCleanData: $Button;
  $btnSendData: $Button;
}

export interface iReadAll {
  $title: $;
}

export interface iRead {
  $title: $;
  $searcher: $;
}

export interface iPatient {
  $_id: $LabelAndInput;
  $full_name: $LabelAndInput;
  $birthday: $LabelAndInput;
  $internment_date: $LabelAndInput;
  $discharge_date: $LabelAndInput;
  $creation_date: $LabelAndInput;
  $last_update: $LabelAndInput;
  $pathologies: $LabelAndInput;
  $status: $LabelAndInput;
  labelsAndInputs: Array<$LabelAndInput>;
  $btnDelete: $Button;
  $btnSendData: $Button;
  $btnUpdate: $Button;
  $containerBtns: $;
  patient: patient;
}
