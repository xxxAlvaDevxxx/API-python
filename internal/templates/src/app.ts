import { $, $Button, styleDeclaration } from "./Element/Element";
import Create from "./Patient/Create";
import Read from "./Patient/Read";
import ReadAll from "./Patient/ReadAll";

// return a button personalized
function $BtnActions(text: string) {
  return new $Button(
    {},
    text,
    (ctx) => {
      // assign box-shadow to all btnActions
      ctx.father.children.forEach((element) => {
        element.setStyle({ boxShadow: "0 0 3px #00000040" });
      });
      // assign box-shadow to btn clicked
      ctx.setStyle({ boxShadow: "0 0 3px #00000020" });
      let $App = ctx.father.father;
      // remove display active
      if ($App.children.length > 2) $App.removeChildren($App.children[2]);
      // Set all buttons except the clicked one to status False
      ctx.father.children.forEach((element) => {
        if (element != ctx) element.status = false;
      });
      // conditional to know which button is clicked and display window
      if (text == "Crear") $App.addChild(Create);
      if (text == "Buscar") $App.addChild(Read);
      if (text == "Buscar Todos") $App.addChild(ReadAll.loadData());
    },
    (ctx) => {
      // Second click causes the element to have the default color
      ctx.setStyle({ boxShadow: "0 0 3px #00000040" });
      let $App = ctx.father.father;
      // conditional to know which button is clicked and remove the clicked
      if (text == "Crear") $App.removeChildren(Create);
      if (text == "Buscar") $App.removeChildren(Read);
      if (text == "Buscar Todos") $App.removeChildren(ReadAll);
    },
    true
  ).setStyle({
    border: "0",
    padding: "1em",
    margin: "0.5em",
    background: "#00000008",
    boxShadow: "0 0 3px #00000040",
    borderRadius: "0.2rem",
  });
}
// selector container that present the buttons that display windows
class SelectorContainer extends $ {
  // button that calls the create class
  $btnCreate = $BtnActions("Crear").setAttribute({
    name: "id",
    value: "btnCreate",
  });
  // button that calls the read class
  $btnRead = $BtnActions("Buscar").setAttribute({
    name: "id",
    value: "btnRead",
  });
  // button that calls the read_all class
  $btnReadAll = $BtnActions("Buscar Todos").setAttribute({
    name: "id",
    value: "btnReadAll",
  });
  // Class Styles
  style: styleDeclaration = {
    background: "#00000008",
    boxShadow: "0 0 3px #00000070",
    borderRadius: "0.2rem",
    padding: "1em",
  };
  constructor() {
    super("article", {});
    this.setStyle(this.style);
    this.addChildren(this.$btnCreate, this.$btnRead, this.$btnReadAll);
  }
}
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
    gap: "5%",
    paddingTop: "2em",
  };
  $title = new $("h1", { id: "app-title" }).text("MANAGER PATIENTS");
  $selectorContainer = new SelectorContainer();
  constructor() {
    super("article", { id: "app" });
    this.setStyle(this.style);
    this.addChildren(this.$title, this.$selectorContainer);
  }
}
