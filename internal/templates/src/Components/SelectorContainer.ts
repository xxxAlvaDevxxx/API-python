import $BtnActions from "./BtnActions";
import { $ } from "../Element/Element";
import language from "../language";
import { iSelectorContainer } from "../Patient/ports";

const nl = navigator.language;
const jsonForLanguage = language[nl === "es" ? "es" : "en"];
const jFLNav = jsonForLanguage.nav;

// selector container that present the buttons that display windows
class SelectorContainer extends $ implements iSelectorContainer {
  // button that calls the create class
  $btnCreate = $BtnActions(jFLNav[0], { name: "id", value: "btnCreate" });
  // button that calls the read class
  $btnRead = $BtnActions(jFLNav[1], { name: "id", value: "btnRead" });
  // button that calls the read_all class
  $btnReadAll = $BtnActions(jFLNav[2], {
    name: "id",
    value: "btnReadAll",
  });
  constructor() {
    super("article", { id: "SelectorContainer" });
    this.addChildren(this.$btnCreate, this.$btnRead, this.$btnReadAll);
  }
}

export default new SelectorContainer();
