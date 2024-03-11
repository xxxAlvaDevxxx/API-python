import { fetchReadAll } from "../Components/Fetch/Fetch";
import { handlerFetchReadAll } from "../Components/Handlers/Fetch";
import { $ } from "../Element/Element";
import language from "../language";
import { iReadAll } from "./ports";
import { styleReadAll } from "./styles";

const nl = navigator.language;
const jsonForLanguage = language[nl === "es" ? "es" : "en"];
const jFLSearchAll =
  jsonForLanguage.views[jsonForLanguage.nav[2].toLocaleLowerCase()];

class ReadAll extends $ implements iReadAll {
  $title = new $("h3", {}).setText(jFLSearchAll.title);
  constructor() {
    super("article", { id: "PatientReadAll" });
    this.setStyle(styleReadAll);
    this.addChild(this.$title);
  }
  loadData() {
    const response = fetchReadAll();
    handlerFetchReadAll(this, response);
    return this;
  }
}

export default new ReadAll();
