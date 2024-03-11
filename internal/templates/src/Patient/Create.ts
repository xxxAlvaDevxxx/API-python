import { fetchCreate } from "../Components/Fetch/Fetch";
import {
  handlerChange,
  handlerChangeCheckBox,
  handlerCleanDataToCreate,
} from "../Components/Handlers/Change";
import { handlerFetchCreate } from "../Components/Handlers/Fetch";
import { $, $Button, $Input, $LabelAndInput } from "../Element/Element";
import language from "../language";
import { iCreate } from "./ports";
import {
  styleCreate,
  styleCreateBtn,
  styleCreateLabelAndInputContainer,
} from "./styles";

const nl = navigator.language;
const jsonForLanguage = language[nl === "es" ? "es" : "en"];
const jFLCreate =
  jsonForLanguage.views[jsonForLanguage.nav[0].toLocaleLowerCase()];
const labels = jFLCreate["labels"];
const buttons = jFLCreate["buttons"];

let data = {
  full_name: "",
  date_of_birth: "",
  intern_now: false,
  pathologies: "",
};

export class Create extends $ implements iCreate {
  $title = new $("h3", { id: "title-Create" })
    .setText(jFLCreate.title)
    .setStyle({ position: "absolute", marginTop: "-35px" });
  $full_name = new $LabelAndInput({
    type: "text",
    name: "full_name",
    label: `${labels[0]}: `,
  }).setStyle(styleCreateLabelAndInputContainer);
  $date_of_birth = new $LabelAndInput({
    type: "date",
    name: "date_of_birth",
    label: `${labels[1]}: `,
  }).setStyle(styleCreateLabelAndInputContainer);
  $intern_now = new $LabelAndInput({
    type: "checkbox",
    name: "intern_now",
    label: `${labels[2]}: `,
  }).setStyle(styleCreateLabelAndInputContainer);
  $pathologies = new $LabelAndInput({
    type: "text",
    name: "pathologies",
    label: `${labels[3]}: `,
  }).setStyle(styleCreateLabelAndInputContainer);
  $btnCleanData = new $Button(
    {},
    `${buttons[1]}`,
    (ctx) => {
      handlerCleanDataToCreate(this, data, ctx);
    },
    () => {}
  ).setStyle(styleCreateBtn);
  $btnSendData = new $Button(
    {},
    `${buttons[0]}`,
    (ctx, e) => {
      const response = fetchCreate(data);
      handlerFetchCreate(this, ctx, response);
    },
    () => {}
  ).setStyle(styleCreateBtn);
  constructor() {
    super("article", { id: "PatientCreate" });
    this.render();
  }
  render() {
    this.setStyle(styleCreate);
    this.$intern_now.input.setStyle({ width: "1.5em", height: "1.5em" });
    this.$intern_now.onChangeInput({
      callBack: (ctx, e) => handlerChangeCheckBox(e,data),
      backfn: () => {},
    });
    this.addChildren(
      this.$title,
      this.$full_name,
      this.$date_of_birth,
      this.$intern_now,
      this.$pathologies,
      this.$btnSendData
    );
    [this.$full_name, this.$date_of_birth, this.$pathologies].forEach(
      (element) =>
        element.onChangeInput({
          callBack(ctx, e: Event) {
            handlerChange(e, data);
          },
          backfn() {},
        })
    );
  }
}

export default new Create();
