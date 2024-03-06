(() => {
  // src/Element/Element.ts
  var $2 = class _$2 {
    id;
    father;
    element;
    children = [];
    status = false;
    focus = false;
    style;
    setElement(element) {
      this.element = element;
      return this;
    }
    create(tag) {
      this.element = document.createElement(tag);
      return this;
    }
    setFather(father) {
      this.father = father;
      this.father.addChildren(this);
      return this;
    }
    /*     setFatherElement(father) {
        if (!this.element) throw Error("element is null");
        this.father = new $2().element = father;
        this.father.appendChild(this.element);
        return this;
      } */
    addChildren(...children) {
      children.forEach((child) => {
        this.addChild(child);
      });
      return this;
    }
    addChild(child) {
      if (!this.element)
        throw Error("element is null");
      if (!child.element)
        throw Error("child is null");
      child.father = this;
      this.element.appendChild(child.element);
      this.children.push(child);
      return this;
    }
    removeChildren(...children) {
      children.forEach((child) => {
        if (!this.element)
          throw Error("element is null");
        if (!child.element)
          throw Error("child is null");
        this.element.removeChild(child.element);
        const indiceAEliminar = this.children.findIndex(
          (_child) => _child == child
        );
        if (indiceAEliminar !== -1) {
          this.children.splice(indiceAEliminar, 1);
        } else {
          throw Error("El hijo no est\xE1 en el array.");
        }
      });
      return this;
    }
    removeLastChildren() {
      this.removeChildren(this.children[this.children.length - 1]);
      return this;
    }
    createAndAppendFather(tag, father) {
      this.create(tag);
      this.father = father;
      return this;
    }
    setAttribute(attributes) {
      if (!this.element)
        throw Error("element is null");
      if (attributes.name == "id")
        this.id = attributes.value;
      this.element.setAttribute(attributes.name, attributes.value);
      return this;
    }
    setAttributes(attributes) {
      if (typeof attributes != "object")
        throw Error("objects only");
      let arr = Object.entries(attributes);
      arr.forEach((arg) => {
        if (!this.element)
          throw Error("element is null");
        this.setAttribute({ name: arg[0], value: arg[1] });
      });
      return this;
    }
    setStyle(styleObj) {
      Object.keys(styleObj).forEach((styleKey) => {
        this.element.style[styleKey] = styleObj[styleKey];
      });
      return this;
    }
    setClassNames(...classNames) {
      if (!this.element)
        throw Error("element is null");
      this.element.classList.add(...classNames);
      return this;
    }
    include($22) {
      let index = this.children.findIndex((_child) => _child == $22);
      if (index !== -1) {
        return true;
      } else {
        return false;
      }
    }
    findAndSetElement(selector) {
      this.element = document.querySelector(selector);
      if (!this.element) {
        return new _$2();
      }
      return this;
    }
    findChildren(selector) {
      if (!this.element)
        throw Error("element is null");
      return this.element.querySelector(selector);
    }
    text(text) {
      if (!this.element)
        throw Error("element is null");
      this.element.appendChild(document.createTextNode(text));
      return this;
    }
    //event(event: any, callback: callback, backfn: callback | nonBackfn) {
    event({
      event,
      callback,
      backfn
    }, back = false) {
      this.element.addEventListener(event, (e) => {
        if (!e)
          return;
        if (this.status && back) {
          this.status = false;
          return backfn(this, e);
        }
        this.status = true;
        return callback(this, e);
      });
      return this;
    }
    onClick({ callback, backfn }, back = false) {
      return this.event({ event: "click", callback, backfn }, back);
    }
    onChange({ callback, backfn }, back = false) {
      return this.event({ event: "change", callback, backfn }, back);
    }
    onSumit({ callback, backfn }, back = false) {
      return this.event({ event: "submit", callback, backfn }, back);
    }
    onDblClick({ callback, backfn }, back = false) {
      return this.event({ event: "dblclick", callback, backfn }, back);
    }
    onFocus({ callback, backfn }, back = false) {
      return this.event({ event: "focus", callback, backfn }, back);
    }
    click() {
      this.element.click();
      return this;
    }
    /* onLoad(callback:callback){
      console.log(123);
      callback()
      return this
      //return this.event({event:'load',callback,backfn:()=>{}})
    } */
    firstChild() {
      return this.children[0];
    }
    removeAllChildren() {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
    }
    removeAttr(attribute) {
      this.element.removeAttribute(attribute);
      return this;
    }
  };
  var $ = class extends $2 {
    constructor(tag, attributes) {
      super();
      this.create(tag);
      this.setAttributes(attributes);
    }
  };
  var $Button = class extends $ {
    constructor(attributes, text, callback, backfn, back = false) {
      super("button", attributes);
      this.text(text);
      this.onClick({ callback, backfn }, back);
    }
  };
  var $Input = class extends $ {
    type;
    name;
    value;
    placeholder;
    constructor({
      type,
      name,
      value,
      placeholder,
      readonly
    }, list = "") {
      super("input", {
        type,
        name,
        list
      });
      this.type = type;
      this.name = name;
      this.value = value;
      this.placeholder = placeholder;
      if (typeof placeholder == "string")
        this.element.setAttribute("placeholder", placeholder);
      if (typeof value == "string")
        this.setValue(value);
      if (type == "date" && value != "") {
        let element = this.element;
        element.valueAsDate = value;
      }
      if (typeof readonly == "boolean") {
        this.readOnly();
      }
      this.onChange({ callback(ctx, e) {
        let _ctx = ctx;
        const { value: value2 } = e.target;
        _ctx.value = value2;
      }, backfn() {
      } });
    }
    setValue(value) {
      this.value = value;
      this.element.setAttribute("value", value);
      return this;
    }
    readOnly() {
      let element = this.element;
      element.readOnly = true;
      return this;
    }
  };
  var $Select = class extends $ {
    name;
    value;
    constructor({ name, value }, readOnly = false) {
      super("select", {
        name,
        value
      });
      this.name = name;
      this.value = value;
      if (readOnly) {
        this.readOnly();
      }
    }
    readOnly() {
      let element = this.element;
      element.readOnly = true;
      return this;
    }
  };
  var $LabelAndInput = class extends $ {
    label;
    input;
    constructor({
      type,
      name,
      label,
      value,
      readonly
    }, list = "") {
      super("div", { id: `container${name}` });
      if (value == void 0)
        value = "";
      this.label = new $("label", { for: name }).text(label);
      this.input = new $Input(
        { type, name, value, placeholder: "", readonly },
        list
      );
      this.addChildren(this.label, this.input);
    }
    onChangeInput({
      callback,
      backfn
    }) {
      this.input.onChange({ callback, backfn });
    }
    //valueToInput(value: any) {}
  };

  // src/Patient/Create.ts
  var data = {
    full_name: "",
    date_of_birth: "",
    intern_now: false,
    pathologies: ""
  };
  function handlerChange(e) {
    const { name, value } = e.target;
    data[name] = value;
  }
  async function fetchData() {
    if (data.full_name === "")
      throw Error("Nombre completo esta vacio");
    const response = await fetch(
      `${location.href}api/patient/create?full_name=${data.full_name}&birthday=${data.date_of_birth}&intern_now=${data.intern_now}&pathologies=[${data.pathologies}]`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  var styleLabelAndInputContainer = {
    alignSelf: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 4em"
  };
  var styleDataBtn = {
    width: "80%",
    margin: "auto",
    padding: "1em",
    border: "0",
    borderRadius: "0.2rem",
    boxShadow: "0 0 3px #0008",
    background: "#00f4"
  };
  var Create = class extends $ {
    $title = new $("h3", { id: "title-Create" }).text("Crear Paciente").setStyle({ position: "absolute", marginTop: "-35px" });
    $full_name = new $LabelAndInput({
      type: "text",
      name: "full_name",
      label: "Nombre Completo: "
    }).setStyle(styleLabelAndInputContainer);
    $date_of_birth = new $LabelAndInput({
      type: "date",
      name: "date_of_birth",
      label: "Fecha de nacimiento: "
    }).setStyle(styleLabelAndInputContainer);
    $intern_now = new $LabelAndInput({
      type: "checkbox",
      name: "intern_now",
      label: "Internar ahora: "
    }).setStyle(styleLabelAndInputContainer);
    $pathologies = new $LabelAndInput({
      type: "text",
      name: "pathologies",
      label: "Patologias: "
    }).setStyle(styleLabelAndInputContainer);
    $btnCleanData = new $Button({}, "Limpiar", (ctx) => {
      [this.$full_name, this.$date_of_birth, this.$pathologies].forEach(
        (element) => {
          let inputElement = element.input.element;
          inputElement.value = "";
          data[element.input.name] = "";
        }
      );
      setTimeout(() => {
        const patientCreate = ctx.father;
        patientCreate.removeChildren(ctx);
        patientCreate.addChild(this.$btnSendData);
      }, 500);
    }, () => {
    }).setStyle(styleDataBtn);
    $btnSendData = new $Button(
      {},
      "Guardar",
      (ctx, e) => {
        const response = fetchData();
        response.then((value) => {
          let va = value;
          alert(va.message);
          setTimeout(() => {
            const patientCreate = ctx.father;
            patientCreate.removeChildren(ctx);
            patientCreate.addChild(this.$btnCleanData);
          }, 500);
        });
      },
      () => {
      }
    ).setStyle(styleDataBtn);
    style = {
      width: "min(100%,600px)",
      height: "60%",
      background: "#00000004",
      boxShadow: "0 0 3px #0007",
      borderRadius: "0.4rem",
      padding: "1em",
      display: "grid"
    };
    constructor() {
      super("article", { id: "PatientCreate" });
      this.setStyle(this.style);
      this.$intern_now.children[1].setStyle({ width: "1.5em", height: "1.5em" });
      this.addChildren(
        this.$title,
        this.$full_name,
        this.$date_of_birth,
        this.$intern_now,
        this.$pathologies,
        this.$btnSendData
      );
      [this.$full_name, this.$date_of_birth, this.$pathologies].forEach(
        (element) => element.onChangeInput({
          callback(ctx, e) {
            handlerChange(e);
          },
          backfn() {
          }
        })
      );
    }
  };
  var Create_default = new Create();

  // src/Patient/Patient.ts
  var btnStyle = {
    border: "0",
    padding: "0.5em",
    background: "#00000008",
    boxShadow: "0 0 3px #00000080",
    borderRadius: "0.2rem"
  };
  async function fetchData2(patient3) {
    const response = await fetch(
      `${location.href}api/patient/update?_id=${patient3._id}&full_name=${patient3.full_name}&birthday=${patient3.birthday}&pathologies=${patient3.pathologies}&status=${patient3.status}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  async function fetchDelete(_id) {
    const response = await fetch(
      `${location.href}api/patient/delete/${_id}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  function LabelAndInput(name, label) {
    return new $LabelAndInput({
      type: "text",
      name,
      label,
      readonly: true
    }).setStyle({ display: "flex", justifyContent: "space-between" });
  }
  var Patient = class extends $ {
    $_id = LabelAndInput("_id", "Id: ");
    $full_name = LabelAndInput("full_name", "Nombre Completo: ");
    $birthday = LabelAndInput("birthday", "Fecha de nacimiento: ");
    $internment_date = LabelAndInput("internment_date", "Fecha de internamiento");
    $discharge_date = LabelAndInput("discharge_date", "Fecha de alta: ");
    $creation_date = LabelAndInput("creation_date", "Fecha de Creacion: ");
    $last_update = LabelAndInput("last_update", "Ultima modificacion: ");
    $pathologies = LabelAndInput("pathologies", "Patologias: ");
    $status = LabelAndInput("status", "Estatus: ");
    labelsAndInputs = [
      this.$_id,
      this.$full_name,
      this.$birthday,
      this.$internment_date,
      this.$discharge_date,
      this.$creation_date,
      this.$last_update,
      this.$pathologies,
      this.$status
    ];
    $btnDelete = new $Button(
      {},
      "Eliminar",
      (ctx, e) => {
        let patient3 = ctx.father.father;
        patient3.$status.input.setValue("2");
        const response = fetchDelete(patient3.$_id.input.value);
        response.then((value) => {
          const { message } = value;
          ctx.removeAllChildren();
          ctx.text(message);
        });
        setTimeout(() => {
          ctx.removeAllChildren();
          ctx.text("Eliminar");
        }, 1e3);
      },
      () => {
      }
    ).setStyle(btnStyle);
    $btnSendData = new $Button(
      {},
      "Guardar",
      (ctx, e) => {
        this.labelsAndInputs.forEach((element) => {
          element.input.readOnly();
        });
        let $containerBtns = ctx.father;
        ctx.removeAllChildren();
        ctx.text("guardando");
        const response = fetchData2(this.patient);
        response.then((value) => {
          let va = value;
          ctx.removeAllChildren();
          ctx.text(va.message);
        });
        setTimeout(() => {
          ctx.removeAllChildren();
          ctx.text("Guardar");
          $containerBtns.removeAllChildren();
          $containerBtns.addChildren(this.$btnUpdate, this.$btnDelete);
        }, 1e3);
      },
      () => {
      }
    ).setStyle(btnStyle);
    $btnUpdate = new $Button(
      {},
      "Actualizar",
      (ctx, e) => {
        this.labelsAndInputs.forEach((element) => {
          if (element.input.name != "_id")
            element.input.removeAttr("readonly");
        });
        let $containerBtns = ctx.father;
        $containerBtns.removeAllChildren();
        $containerBtns.addChildren(this.$btnSendData, this.$btnDelete);
      },
      () => {
      }
    ).setStyle(btnStyle);
    $containerBtns = new $("div", { class: "containerBtns-Patient" }).setStyle({
      marginTop: "1em",
      display: "grid",
      gridTemplateColumns: "auto auto",
      gap: "1em"
    });
    patient;
    style = {
      background: "#00000004",
      boxShadow: "0 0 3px #0007",
      borderRadius: "0.4rem",
      padding: "1em",
      display: "flex",
      flexDirection: "column",
      transition: "scale 0.5s ease-in-out 0s"
    };
    constructor(patient3) {
      super("article", { class: "patient" });
      this.patient = patient3;
      this.setStyle(this.style);
      this.render();
    }
    render() {
      this.labelsAndInputs.forEach((element) => {
        let value = this.patient[element.input.name];
        if (typeof value == "number")
          value = value.toString();
        element.input.setValue(value);
        this.addChild(element);
        element.onChangeInput({
          callback(ctx, e) {
            let _ctx = ctx;
            const $patient = ctx.father.father;
            let patient3 = $patient.patient;
            patient3[_ctx.name] = _ctx.value;
          },
          backfn(ctx, e) {
          }
        });
      });
      this.$containerBtns.addChildren(this.$btnUpdate, this.$btnDelete);
      this.onDblClick(
        {
          callback(ctx, e) {
            let _ctx = ctx;
            _ctx.$containerBtns.addChildren(_ctx.$btnUpdate, _ctx.$btnDelete);
            ctx.addChild(_ctx.$containerBtns);
            ctx.setStyle({ scale: "1.03" });
          },
          backfn(ctx, e) {
            let _ctx = ctx;
            _ctx.$containerBtns.removeAllChildren();
            ctx.removeChildren(_ctx.$containerBtns);
            ctx.setStyle({ scale: "1" });
          }
        },
        true
      );
      return this;
    }
  };

  // src/Patient/Read.ts
  var data2 = {
    //type: "",
    value: ""
  };
  function handlerChange2(e) {
    const { name, value } = e.target;
    data2[name] = value;
  }
  async function fetchData3() {
    if (data2.value === "")
      throw Error("Valor a buscar esta vacio");
    const response = await fetch(
      `${location.href}api/patient/read/${data2.value}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  var styleDataBtn2 = {
    padding: "0 1em",
    border: "0",
    borderRadius: "0.2rem",
    boxShadow: "0 0 3px #0008",
    background: "#fff5"
  };
  var Searcher = class extends $ {
    $typeSearch = new $Select({ name: "type", value: "id" }).addChild(new $("option", { value: "id" }).text("Id")).setStyle({ width: "5em" });
    $value = new $Input({
      type: "text",
      name: "value",
      placeholder: "Escriba valor a buscar"
    }).onChange({
      callback(ctx, e) {
        handlerChange2(e);
      },
      backfn() {
      }
    });
    $btnCleanData = new $Button(
      {},
      "Limpiar",
      (ctx) => {
        let element = this.$value.element;
        element.value = "";
        data2[this.$value.name] = "";
        const searcher = ctx.father;
        searcher.removeChildren(ctx);
        searcher.addChild(this.$btnSendData);
        if (searcher.father.children.length > 2) {
          searcher.father.removeLastChildren();
        }
      },
      () => {
      }
    ).setStyle(styleDataBtn2).setStyle({ background: "#f005" });
    $btnSendData = new $Button(
      {},
      "Buscar",
      (ctx, e) => {
        const response = fetchData3();
        response.then((value) => {
          const searcher = ctx.father;
          let va = value;
          const $patient = new Patient(va.patient);
          searcher.father.addChild($patient);
          searcher.removeChildren(ctx);
          searcher.addChild(this.$btnCleanData);
        });
      },
      () => {
      }
    ).setStyle(styleDataBtn2);
    style = {
      width: "100%",
      background: "#00000004",
      boxShadow: "0 0 3px #0007",
      borderRadius: "0.4rem",
      padding: "1em",
      display: "flex",
      justifyContent: "space-between"
    };
    constructor() {
      super("div", {});
      this.setStyle(this.style);
      this.addChildren(this.$typeSearch, this.$value, this.$btnSendData);
    }
  };
  var Read = class extends $ {
    $title = new $("h3", {}).text("Buscar Paciente");
    $searcher = new Searcher();
    style = {
      width: "min(100%,600px)",
      background: "#00000004",
      boxShadow: "0 0 3px #0007",
      borderRadius: "0.4rem",
      padding: "1em",
      display: "flex",
      flexDirection: "column",
      gap: "1em"
    };
    constructor() {
      super("article", { id: "PatientRead" });
      this.setStyle(this.style);
      this.addChildren(this.$title, this.$searcher);
    }
  };
  var Read_default = new Read();

  // src/Patient/ReadAll.ts
  async function fetchData4() {
    const response = await fetch(`${location.href}api/patient/read_all`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  var ReadAll = class extends $ {
    $title = new $("h3", {}).text("Buscar Todos");
    style = {
      width: "min(100%,600px)",
      background: "#00000004",
      boxShadow: "0 0 3px #0007",
      borderRadius: "0.4rem",
      padding: "1em",
      display: "flex",
      flexDirection: "column",
      gap: "1em",
      overflowY: "scroll",
      overflowX: "hidden"
    };
    constructor() {
      super("article", { id: "PatientReadAll" });
      this.setStyle(this.style);
      this.addChild(this.$title);
    }
    loadData() {
      const response = fetchData4();
      response.then((value) => {
        let va = value;
        va.patients.patients.forEach((data3) => {
          const $patient = new Patient(data3);
          this.addChild($patient);
        });
      });
      return this;
    }
  };
  var ReadAll_default = new ReadAll();

  // src/app.ts
  function $BtnActions(text) {
    return new $Button(
      {},
      text,
      (ctx) => {
        ctx.father.children.forEach((element) => {
          element.setStyle({ boxShadow: "0 0 3px #00000040" });
        });
        ctx.setStyle({ boxShadow: "0 0 3px #00000020" });
        let $App = ctx.father.father;
        if ($App.children.length > 2)
          $App.removeChildren($App.children[2]);
        ctx.father.children.forEach((element) => {
          if (element != ctx)
            element.status = false;
        });
        if (text == "Crear")
          $App.addChild(Create_default);
        if (text == "Buscar")
          $App.addChild(Read_default);
        if (text == "Buscar Todos")
          $App.addChild(ReadAll_default.loadData());
      },
      (ctx) => {
        ctx.setStyle({ boxShadow: "0 0 3px #00000040" });
        let $App = ctx.father.father;
        if (text == "Crear")
          $App.removeChildren(Create_default);
        if (text == "Buscar")
          $App.removeChildren(Read_default);
        if (text == "Buscar Todos")
          $App.removeChildren(ReadAll_default);
      },
      true
    ).setStyle({
      border: "0",
      padding: "1em",
      margin: "0.5em",
      background: "#00000008",
      boxShadow: "0 0 3px #00000040",
      borderRadius: "0.2rem"
    });
  }
  var SelectorContainer = class extends $ {
    // button that calls the create class
    $btnCreate = $BtnActions("Crear").setAttribute({
      name: "id",
      value: "btnCreate"
    });
    // button that calls the read class
    $btnRead = $BtnActions("Buscar").setAttribute({
      name: "id",
      value: "btnRead"
    });
    // button that calls the read_all class
    $btnReadAll = $BtnActions("Buscar Todos").setAttribute({
      name: "id",
      value: "btnReadAll"
    });
    // Class Styles
    style = {
      background: "#00000008",
      boxShadow: "0 0 3px #00000070",
      borderRadius: "0.2rem",
      padding: "1em"
    };
    constructor() {
      super("article", {});
      this.setStyle(this.style);
      this.addChildren(this.$btnCreate, this.$btnRead, this.$btnReadAll);
    }
  };
  var App = class extends $ {
    style = {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      overflow: "hidden",
      gap: "5%",
      paddingTop: "2em"
    };
    $title = new $("h1", { id: "app-title" }).text("MANAGER PATIENTS");
    $selectorContainer = new SelectorContainer();
    constructor() {
      super("article", { id: "app" });
      this.setStyle(this.style);
      this.addChildren(this.$title, this.$selectorContainer);
    }
  };

  // src/index.ts
  var main = document.querySelector("main");
  if (!main) {
    throw Error("Not Exist main");
  }
  new $2().setElement(main).addChild(new App());
})();
