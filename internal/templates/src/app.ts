import { $, styleDeclaration } from "./Element/Element";
import SelectorContainer from "./Components/SelectorContainer";

// class app
export default class App extends $ {
  constructor() {
    super("article", { id: "app" });
    this.addChildren(SelectorContainer);
  }
}
