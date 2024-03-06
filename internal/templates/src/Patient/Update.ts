import { $, styleDeclaration } from "../Element/Element"

class Update extends $ {
    style: styleDeclaration = {
        width: "80%",
        height: "2em",
        background: "red"
    }
    constructor() {
        super("article",{"id":"PatientUpdate"})
        this.setStyle(this.style)
        this.text("Actualizar")
    }
}

export default new Update()