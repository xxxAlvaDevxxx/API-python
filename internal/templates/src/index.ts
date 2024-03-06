import { $2 } from "./Element/Element";
import App from "./app";
// call root element
let main = document.querySelector("main")
// Exist checking
if (!main) {
    throw Error("Not Exist main")
}
// set the root element as an Element class and add the application class as a child
new $2().setElement(main).addChild(new App())