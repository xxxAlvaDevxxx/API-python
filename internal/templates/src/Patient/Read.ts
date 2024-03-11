import Searcher from "../Components/Searcher";
import { $ } from "../Element/Element";
import language from "../language";
import { styleRead } from "./styles";

const nl = navigator.language;
const jsonForLanguage = language[nl === "es" ? "es" : "en"];
const jFLSearch =
  jsonForLanguage.views[jsonForLanguage.nav[1].toLocaleLowerCase()];

class Read extends $ {
  $title = new $("h3", {}).setText(jFLSearch.title);
  $searcher = new Searcher();
  constructor() {
    super("article", { id: "PatientRead" });
    this.setStyle(styleRead);
    this.addChildren(this.$title, this.$searcher);
  }
}

export default new Read();
