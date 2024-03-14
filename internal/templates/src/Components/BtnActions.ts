import { $Button, Attribute } from "../Element/Element";
import {
  handlerBtnActionsBackfn,
  handlerBtnActionsCallBack,
} from "./Handlers/Change";

// button personalized
export default function $BtnActions(text: string, attribute: Attribute) {
  return new $Button(
    attribute,
    text,
    handlerBtnActionsCallBack,
    handlerBtnActionsBackfn,
    true
  );
}
