import {
  $Button,
  Attribute,
} from "../Element/Element";
import { styleBtnActions } from "../Patient/styles";
import { handlerBtnActionsBackfn, handlerBtnActionsCallBack } from "./Handlers/Change";

// button personalized
export default function $BtnActions(text: string, attribute: Attribute) {
  let $btn = new $Button(attribute, text, handlerBtnActionsCallBack, handlerBtnActionsBackfn, true);
  $btn.setStyle(styleBtnActions);
  return $btn;
}