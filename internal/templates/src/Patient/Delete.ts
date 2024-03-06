import { $, styleDeclaration } from "../Element/Element"

class Delete extends $ {
    style: styleDeclaration = {
        width: "80%",
        height: "2em",
        background: "red"
    }
    constructor() {
        super("article",{"id":"PatientDelete"})
        this.setStyle(this.style)
        this.text("Eliminar")
    }
}

export default new Delete()