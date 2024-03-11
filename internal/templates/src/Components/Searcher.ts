import { $Select, $Input, $Button, $ } from "../Element/Element";
import { iSearcher } from "../Patient/ports";
import { styleReadSearcherBtn, styleReadSearcher } from "../Patient/styles";
import language from "../language";
import { handlerChange, handlerSearcherCleanData } from "./Handlers/Change";
import { handlerFetchSearcherRead } from "./Handlers/Fetch";

const nl = navigator.language;
const jsonForLanguage = language[nl === "es" ? "es" : "en"];
const jFLSearch =
  jsonForLanguage.views[jsonForLanguage.nav[1].toLocaleLowerCase()];

let data = {
  //type: "",
  value: "",
};

export default class Searcher extends $ implements iSearcher {
  $typeSearch = new $Select({ name: "type", value: "id" })
    .addChild(
      new $("option", { value: "id" }).setText(
        jFLSearch["search_types"] /* "Id" */
      )
    )
    .setStyle({ width: "5em" });
  $value = new $Input({
    type: "text",
    name: "value",
    placeholder: jFLSearch["placeholder_look_for"],
  }).onChange({
    callBack(ctx, e) {
      handlerChange(e, data);
    },
    backfn() {},
  });
  $btnCleanData = new $Button(
    {},
    jFLSearch.buttons[1],
    (ctx) => handlerSearcherCleanData(this, ctx, data),
    () => {}
  )
    .setStyle(styleReadSearcherBtn)
    .setStyle({ background: "#f005" });
  $btnSendData = new $Button(
    {},
    jFLSearch.buttons[0],
    (ctx) => handlerFetchSearcherRead(this, ctx, data),
    () => {}
  ).setStyle(styleReadSearcherBtn);
  constructor() {
    super("div", {});
    this.setStyle(styleReadSearcher);
    this.addChildren(this.$typeSearch, this.$value, this.$btnSendData);
  }
}
