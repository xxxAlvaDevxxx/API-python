import { $, styleDeclaration } from "./Element/Element";
import SelectorContainer from "./Components/SelectorContainer";

// class app
export default class App extends $ {
  style: styleDeclaration = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    overflow: "hidden",
    gap: "3em",
    paddingTop: "0.4%",
  };
  constructor() {
    super("article", { id: "app" });
    this.setStyle(this.style);
    this.addChildren(SelectorContainer);
  }
}

