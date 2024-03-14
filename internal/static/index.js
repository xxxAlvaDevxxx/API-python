(() => {
  // src/Element/Element.ts
  var $2 = class _$2 {
    id;
    father;
    tag;
    element;
    children = [];
    status = false;
    focus = false;
    style;
    text;
    setElement(element) {
      this.element = element;
      return this;
    }
    create(tag) {
      this.tag = tag;
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
      this.style = styleObj;
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
    setText(text) {
      if (!this.element)
        throw Error("element is null");
      this.text = text;
      this.element.appendChild(document.createTextNode(text));
      return this;
    }
    //event(event: any, callBack: CallBack, backfn: CallBack | nonBackfn) {
    event({
      event,
      callBack,
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
        return callBack(this, e);
      });
      return this;
    }
    onClick({ callBack, backfn }, back = false) {
      return this.event({ event: "click", callBack, backfn }, back);
    }
    onChange({ callBack, backfn }, back = false) {
      return this.event({ event: "change", callBack, backfn }, back);
    }
    onSumit({ callBack, backfn }, back = false) {
      return this.event({ event: "submit", callBack, backfn }, back);
    }
    onDblClick({ callBack, backfn }, back = false) {
      return this.event({ event: "dblclick", callBack, backfn }, back);
    }
    onFocus({ callBack, backfn }, back = false) {
      return this.event({ event: "focus", callBack, backfn }, back);
    }
    click() {
      this.element.click();
      return this;
    }
    /* onLoad(callBack:CallBack){
      console.log(123);
      return this
      //return this.event({event:'load',CallBack,backfn:()=>{}})
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
    constructor(attributes, text, callBack, backfn, back = false) {
      super("button", attributes);
      this.setText(text);
      this.onClick({ callBack, backfn }, back);
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
      this.onChange({
        callBack(ctx, e) {
          let _ctx = ctx;
          const { value: value2 } = e.target;
          _ctx.value = value2;
        },
        backfn() {
        }
      });
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
      this.label = new $("label", { for: name }).setText(label);
      this.input = new $Input(
        { type, name, value, placeholder: "", readonly },
        list
      );
      this.addChildren(this.label, this.input);
    }
    onChangeInput({
      callBack,
      backfn
    }, back) {
      this.input.onChange({ callBack, backfn }, back);
    }
    //valueToInput(value: any) {}
  };

  // src/language.ts
  var language_default = {
    "en": {
      "header": {
        "title": "Manager Patients"
      },
      "nav": ["Create", "Search", "Search All"],
      "views": {
        "create": {
          "title": "Create Patient",
          "labels": ["Full name", "Date of Birth", "Intern Now", "Pathologies"],
          "buttons": ["Save", "Clean"]
        },
        "search": {
          "title": "Search Patient",
          "search_types": ["Id"],
          "placeholder_look_for": "type value to search",
          "buttons": ["Search", "Clean"]
        },
        "search all": {
          "title": "Search All Patients"
        }
      },
      "patient": [
        "Id",
        "Full name",
        "Date of Birth",
        "Internament date",
        "discharge date",
        "Creation Date",
        "Last Update",
        "Pathologies",
        "Status"
      ]
    },
    "es": {
      "header": {
        "title": "Administrador de pacientes"
      },
      "nav": ["Crear", "Buscar", "Buscar Todos"],
      "views": {
        "crear": {
          "title": "Crear Patiente",
          "labels": ["Nombre completo", "Fecha de nacimiento", "Internar ahora", "Patologias"],
          "buttons": ["Guardar", "Limpiar"]
        },
        "buscar": {
          "title": "Buscar Patientes",
          "search_types": ["Identificaci\xF3n"],
          "placeholder_look_for": "Escriba valor a buscar",
          "buttons": ["Buscar", "Limpiar"]
        },
        "buscar todos": { "title": "Buscar Todos Los Pacientes" }
      },
      "patient": [
        "Identificaci\xF3n",
        "Nombre completo",
        "Fecha de nacimiento",
        "Fecha de internamiento",
        "fecha de alta",
        "Fecha de creaci\xF3n",
        "\xDAltima actualizaci\xF3n",
        "Patolog\xEDas",
        "Estado"
      ]
    }
  };

  // src/Components/Fetch/Fetch.ts
  var nl = navigator.language;
  var jsonForLanguage = language_default[nl === "es" ? "es" : "en"];
  var jFLCreate = jsonForLanguage.views[jsonForLanguage.nav[0].toLocaleLowerCase()];
  async function fetchCreate(data3) {
    if (data3.full_name === "")
      throw Error(`${jFLCreate.labels[0]} esta vacio`);
    const response = await fetch(
      `${location.href}api/patient/create?full_name=${data3.full_name}&birthday=${data3.date_of_birth}&intern_now=${data3.intern_now}&pathologies=[${data3.pathologies}]`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  async function fetchRead(data3) {
    if (data3.value === "")
      throw Error("Valor a buscar esta vacio");
    const response = await fetch(
      `${location.href}api/patient/read/${data3.value}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  async function fetchReadAll() {
    const response = await fetch(`${location.href}api/patient/read_all`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  async function fetchUpdate(patient2) {
    const response = await fetch(
      `${location.href}api/patient/update?_id=${patient2._id}&full_name=${patient2.full_name}&birthday=${patient2.birthday}&pathologies=${patient2.pathologies}&status=${patient2.status}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  async function fetchDelete(_id) {
    const response = await fetch(`${location.href}api/patient/delete/${_id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  // src/Patient/Patient.ts
  var nl2 = navigator.language;
  var jsonForLanguage2 = language_default[nl2 === "es" ? "es" : "en"];
  var jFLPatient = jsonForLanguage2.patient;
  function LabelAndInput(name, label) {
    return new $LabelAndInput({
      type: "text",
      name,
      label,
      readonly: true
    }).setStyle({ display: "flex", justifyContent: "space-between" });
  }
  var Patient = class extends $ {
    $_id = LabelAndInput("_id", `${jFLPatient[0]}: `);
    $full_name = LabelAndInput("full_name", `${jFLPatient[1]}: `);
    $birthday = LabelAndInput("birthday", `${jFLPatient[2]}: `);
    $internment_date = LabelAndInput("internment_date", `${jFLPatient[3]}: `);
    $discharge_date = LabelAndInput("discharge_date", `${jFLPatient[4]}: `);
    $creation_date = LabelAndInput("creation_date", `${jFLPatient[5]}: `);
    $last_update = LabelAndInput("last_update", `${jFLPatient[6]}: `);
    $pathologies = LabelAndInput("pathologies", `${jFLPatient[7]}: `);
    $status = LabelAndInput("status", `${jFLPatient[8]}: `);
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
      (ctx) => handlerFetchDelete(this, ctx),
      () => {
      }
    );
    $btnSendData = new $Button(
      {},
      "Guardar",
      (ctx) => handlerFetchUpdate(this, ctx),
      () => {
      }
    );
    $btnUpdate = new $Button(
      {},
      "Actualizar",
      (_ctx) => handlerChangeToButtonUpdate(this),
      () => {
      }
    );
    $containerBtns = new $("div", { class: "containerBtns" });
    patient;
    constructor(patient2) {
      super("article", { class: "patient" });
      this.patient = patient2;
      this.render();
    }
    render() {
      handlerLabelsAndInputs(this);
      this.$containerBtns.addChildren(this.$btnUpdate, this.$btnDelete);
      this.onDblClick(
        {
          callBack(ctx, _e) {
            let _ctx = ctx;
            _ctx.$containerBtns.addChildren(_ctx.$btnUpdate, _ctx.$btnDelete);
            ctx.addChild(_ctx.$containerBtns);
            ctx.setStyle({ scale: "1.03" });
          },
          backfn(ctx) {
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

  // src/Components/Handlers/Fetch.ts
  var handlerFetchCreate = (newThis, ctx, response) => {
    response.then((value) => {
      let va = value;
      alert(va.message);
      setTimeout(() => {
        const patientCreate = ctx.father;
        patientCreate.removeChildren(ctx);
        patientCreate.addChild(newThis.$btnCleanData);
      }, 500);
    });
  };
  var handlerFetchReadAll = (ctx, response) => {
    response.then((value) => {
      let va = value;
      va.patients.patients.forEach((data3) => {
        const $patient = new Patient(data3);
        ctx.addChild($patient);
      });
    });
  };
  var handlerFetchUpdate = (newThis, ctx) => {
    newThis.labelsAndInputs.forEach((element) => {
      element.input.readOnly();
    });
    ctx.removeAllChildren();
    ctx.setText("guardando");
    const response = fetchUpdate(newThis.patient);
    response.then((value) => {
      let va = value;
      ctx.removeAllChildren();
      ctx.setText(va.message);
    });
    setTimeout(() => {
      ctx.removeAllChildren();
      ctx.setText("Guardar");
      newThis.$containerBtns.removeAllChildren();
      newThis.$containerBtns.addChildren(newThis.$btnUpdate, newThis.$btnDelete);
    }, 1e3);
  };
  var handlerFetchDelete = (patient2, ctx) => {
    patient2.$status.input.setValue("2");
    const response = fetchDelete(patient2.$_id.input.value);
    response.then((value) => {
      const { message } = value;
      ctx.removeAllChildren();
      ctx.setText(message);
    });
    setTimeout(() => {
      ctx.removeAllChildren();
      ctx.setText("Eliminar");
    }, 1e3);
  };
  var handlerFetchSearcherRead = (newThis, ctx, data3) => {
    const response = fetchRead(data3);
    response.then((value) => {
      const searcher = ctx.father;
      let va = value;
      const $patient = new Patient(va.patient);
      searcher.father.addChild($patient);
      searcher.removeChildren(ctx);
      searcher.addChild(newThis.$btnCleanData);
    });
  };

  // src/Patient/Create.ts
  var nl3 = navigator.language;
  var jsonForLanguage3 = language_default[nl3 === "es" ? "es" : "en"];
  var jFLCreate2 = jsonForLanguage3.views[jsonForLanguage3.nav[0].toLocaleLowerCase()];
  var labels = jFLCreate2["labels"];
  var buttons = jFLCreate2["buttons"];
  var data = {
    full_name: "",
    date_of_birth: "",
    intern_now: false,
    pathologies: ""
  };
  var Create = class extends $ {
    $title = new $("h3", { id: "title-Create" }).setText(jFLCreate2.title).setStyle({ position: "absolute", marginTop: "-35px" });
    $full_name = new $LabelAndInput({
      type: "text",
      name: "full_name",
      label: `${labels[0]}: `
    });
    $date_of_birth = new $LabelAndInput({
      type: "date",
      name: "date_of_birth",
      label: `${labels[1]}: `
    });
    $intern_now = new $LabelAndInput({
      type: "checkbox",
      name: "intern_now",
      label: `${labels[2]}: `
    });
    $pathologies = new $LabelAndInput({
      type: "text",
      name: "pathologies",
      label: `${labels[3]}: `
    });
    $btnCleanData = new $Button(
      {},
      `${buttons[1]}`,
      (ctx) => {
        handlerCleanDataToCreate(this, data, ctx);
      },
      () => {
      }
    );
    $btnSendData = new $Button(
      {},
      `${buttons[0]}`,
      (ctx, e) => {
        const response = fetchCreate(data);
        handlerFetchCreate(this, ctx, response);
      },
      () => {
      }
    );
    constructor() {
      super("article", { id: "PatientCreate" });
      this.render();
    }
    render() {
      this.$intern_now.input.setStyle({ width: "1.5em", height: "1.5em" });
      this.$intern_now.onChangeInput({
        callBack: (ctx, e) => handlerChangeCheckBox(e, data),
        backfn: () => {
        }
      });
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
          callBack(ctx, e) {
            handlerChange(e, data);
          },
          backfn() {
          }
        })
      );
    }
  };
  var Create_default = new Create();

  // src/Components/Searcher.ts
  var nl4 = navigator.language;
  var jsonForLanguage4 = language_default[nl4 === "es" ? "es" : "en"];
  var jFLSearch = jsonForLanguage4.views[jsonForLanguage4.nav[1].toLocaleLowerCase()];
  var data2 = {
    //type: "",
    value: ""
  };
  var Searcher = class extends $ {
    $typeSearch = new $Select({ name: "type", value: "id" }).addChild(
      new $("option", { value: "id" }).setText(
        jFLSearch["search_types"]
        /* "Id" */
      )
    ).setStyle({ width: "5em" });
    $value = new $Input({
      type: "text",
      name: "value",
      placeholder: jFLSearch["placeholder_look_for"]
    }).onChange({
      callBack(ctx, e) {
        handlerChange(e, data2);
      },
      backfn() {
      }
    });
    $btnCleanData = new $Button(
      {},
      jFLSearch.buttons[1],
      (ctx) => handlerSearcherCleanData(this, ctx, data2),
      () => {
      }
    ).setStyle({ backgroundColor: "#ff000061" });
    $btnSendData = new $Button(
      {},
      jFLSearch.buttons[0],
      (ctx) => handlerFetchSearcherRead(this, ctx, data2),
      () => {
      }
    );
    constructor() {
      super("article", { id: "Searcher" });
      this.addChildren(this.$typeSearch, this.$value, this.$btnSendData);
    }
  };

  // src/Patient/Read.ts
  var nl5 = navigator.language;
  var jsonForLanguage5 = language_default[nl5 === "es" ? "es" : "en"];
  var jFLSearch2 = jsonForLanguage5.views[jsonForLanguage5.nav[1].toLocaleLowerCase()];
  var Read = class extends $ {
    $title = new $("h3", {}).setText(jFLSearch2.title);
    $searcher = new Searcher();
    constructor() {
      super("article", { id: "PatientRead" });
      this.addChildren(this.$title, this.$searcher);
    }
  };
  var Read_default = new Read();

  // src/Patient/ReadAll.ts
  var nl6 = navigator.language;
  var jsonForLanguage6 = language_default[nl6 === "es" ? "es" : "en"];
  var jFLSearchAll = jsonForLanguage6.views[jsonForLanguage6.nav[2].toLocaleLowerCase()];
  var ReadAll = class extends $ {
    $title = new $("h3", {}).setText(jFLSearchAll.title);
    constructor() {
      super("article", { id: "PatientReadAll" });
      this.addChild(this.$title);
    }
    loadData() {
      this.removeAllChildren();
      const response = fetchReadAll();
      handlerFetchReadAll(this, response);
      return this;
    }
  };
  var ReadAll_default = new ReadAll();

  // src/Patient/styles.ts
  var stylePatientInput = {
    border: "0",
    boxShadow: "0 0 3px #0006",
    borderRadius: "0.2rem",
    padding: "0.2rem"
  };

  // src/Components/Handlers/Change.ts
  var nl7 = navigator.language;
  var jsonForLanguage7 = language_default[nl7 === "es" ? "es" : "en"];
  var jFLNav = jsonForLanguage7.nav;
  var handlerChange = (e, data3) => {
    const { name, value } = e.target;
    data3[name] = value;
  };
  var handlerChangeCheckBox = (e, data3) => {
    const { name, checked } = e.target;
    data3[name] = checked;
  };
  var handlerSearcherCleanData = (newThis, ctx, data3) => {
    let element = newThis.$value.element;
    element.value = "";
    data3[newThis.$value.name] = "";
    const searcher = ctx.father;
    searcher.removeChildren(ctx);
    searcher.addChild(newThis.$btnSendData);
    if (searcher.father.children.length > 2) {
      searcher.father.removeLastChildren();
    }
  };
  var handlerCleanDataToCreate = (newThis, data3, ctx) => {
    [
      newThis.$full_name,
      newThis.$date_of_birth,
      newThis.$intern_now,
      newThis.$pathologies
    ].forEach((element) => {
      let inputElement = element.input.element;
      inputElement.value = "";
      inputElement.checked = false;
      data3[element.input.name] = "";
    });
    setTimeout(() => {
      const patientCreate = ctx.father;
      patientCreate.removeChildren(ctx);
      patientCreate.addChild(newThis.$btnSendData);
    }, 500);
  };
  var handlerChangeToButtonUpdate = (newThis) => {
    newThis.labelsAndInputs.forEach((element) => {
      if (element.input.name != "_id")
        element.input.removeAttr("readonly");
    });
    newThis.$containerBtns.removeAllChildren();
    newThis.$containerBtns.addChildren(newThis.$btnSendData, newThis.$btnDelete);
  };
  var handlerLabelsAndInputs = (newThis) => {
    newThis.labelsAndInputs.forEach((element) => {
      const currentElement = element;
      let value = newThis.patient[currentElement.input.name];
      if (typeof value == "number")
        value = value.toString();
      currentElement.input.setValue(value);
      currentElement.input.setStyle(stylePatientInput);
      newThis.addChild(currentElement);
      currentElement.onChangeInput({
        callBack(ctx) {
          let _ctx = ctx;
          const $patient = ctx.father.father;
          let patient2 = $patient.patient;
          patient2[_ctx.name] = _ctx.value;
        },
        backfn(_e) {
        }
      });
    });
  };
  var handlerBtnActionsCallBack = (ctx) => {
    ctx.father.children.forEach((element) => {
      element.setStyle({ boxShadow: "0 0 3px #00000040" });
    });
    ctx.setStyle({ boxShadow: "0 0 3px #00000020" });
    let $App = ctx.father.father;
    if ($App.children.length > 1)
      $App.removeChildren($App.children[1]);
    ctx.father.children.forEach((element) => {
      if (element != ctx)
        element.status = false;
    });
    if (ctx.text == jFLNav[0])
      $App.addChild(Create_default);
    if (ctx.text == jFLNav[1])
      $App.addChild(Read_default);
    if (ctx.text == jFLNav[2])
      $App.addChild(ReadAll_default.loadData());
  };
  var handlerBtnActionsBackfn = (ctx) => {
    ctx.setStyle({ boxShadow: "0 0 3px #00000040" });
    let $App = ctx.father.father;
    if (ctx.text == jFLNav[0])
      $App.removeChildren(Create_default);
    if (ctx.text == jFLNav[1])
      $App.removeChildren(Read_default);
    if (ctx.text == jFLNav[2])
      $App.removeChildren(ReadAll_default);
  };

  // src/Components/BtnActions.ts
  function $BtnActions(text, attribute) {
    return new $Button(
      attribute,
      text,
      handlerBtnActionsCallBack,
      handlerBtnActionsBackfn,
      true
    );
  }

  // src/Components/SelectorContainer.ts
  var nl8 = navigator.language;
  var jsonForLanguage8 = language_default[nl8 === "es" ? "es" : "en"];
  var jFLNav2 = jsonForLanguage8.nav;
  var SelectorContainer = class extends $ {
    // button that calls the create class
    $btnCreate = $BtnActions(jFLNav2[0], { name: "id", value: "btnCreate" });
    // button that calls the read class
    $btnRead = $BtnActions(jFLNav2[1], { name: "id", value: "btnRead" });
    // button that calls the read_all class
    $btnReadAll = $BtnActions(jFLNav2[2], {
      name: "id",
      value: "btnReadAll"
    });
    constructor() {
      super("article", { id: "SelectorContainer" });
      this.addChildren(this.$btnCreate, this.$btnRead, this.$btnReadAll);
    }
  };
  var SelectorContainer_default = new SelectorContainer();

  // src/app.ts
  var App = class extends $ {
    constructor() {
      super("article", { id: "app" });
      this.addChildren(SelectorContainer_default);
    }
  };

  // src/index.ts
  var nl9 = navigator.language;
  var jsonForLanguage9 = language_default[nl9 === "es" ? "es" : "en"];
  document.title = jsonForLanguage9.header.title;
  var main = document.querySelector("main");
  if (!main) {
    throw Error("Not Exist main");
  }
  new $2().setElement(main).addChild(new App());
})();
