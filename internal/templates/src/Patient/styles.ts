import { styleDeclaration } from "../Element/Element";

// CREATE
export const styleCreate: styleDeclaration = {
  width: "min(100%,600px)",
  height: "60%",
  background: "#00000004",
  boxShadow: "0 0 3px #0007",
  borderRadius: "0.4rem",
  padding: "1em",
  display: "grid",
};
export const styleCreateLabelAndInputContainer: styleDeclaration = {
  alignSelf: "center",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 4em",
};
export const styleCreateBtn: styleDeclaration = {
  width: "80%",
  margin: "auto",
  padding: "1em",
  border: "0",
  borderRadius: "0.2rem",
  boxShadow: "0 0 3px #0008",
  background: "#00f4",
};

// READ
export const styleRead: styleDeclaration = {
  width: "min(100%,600px)",
  background: "#00000004",
  boxShadow: "0 0 3px #0007",
  borderRadius: "0.4rem",
  padding: "1em",
  display: "flex",
  flexDirection: "column",
  gap: "1em",
};
export const styleReadSearcher: styleDeclaration = {
  width: "100%",
  background: "#00000004",
  boxShadow: "0 0 3px #0007",
  borderRadius: "0.4rem",
  padding: "1em",
  display: "flex",
  justifyContent: "space-between",
};
export const styleReadSearcherBtn: styleDeclaration = {
  padding: "0 1em",
  border: "0",
  borderRadius: "0.2rem",
  boxShadow: "0 0 3px #0008",
  background: "#fff5",
};

// ReadAll
export const styleReadAll: styleDeclaration = {
  width: "min(90%,600px)",
  height: "80%",
  background: "#00000004",
  boxShadow: "0 0 3px #0007",
  borderRadius: "0.4rem",
  padding: "1em",
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  overflowY: "scroll",
  overflowX: "hidden",
};

// Patient
export const stylePatient: styleDeclaration = {
  background: "#00000004",
  boxShadow: "0 0 3px #0007",
  borderRadius: "0.4rem",
  padding: "1em",
  display: "flex",
  gap: '0.3em',
  flexDirection: "column",
  transition: "scale 0.5s ease-in-out 0s",
};
export const stylePatientBtn: styleDeclaration = {
  border: "0",
  padding: "0.5em",
  background: "#00000008",
  boxShadow: "0 0 3px #00000080",
  borderRadius: "0.2rem",
};
export const stylePatientContainerBtns: styleDeclaration = {
  marginTop: "1em",
  display: "grid",
  gridTemplateColumns: "auto auto",
  gap: "1em",
};
export const stylePatientInput: styleDeclaration = {
  border: "0",
  boxShadow: "0 0 3px #0006",
  borderRadius: "0.2rem",
  padding: "0.2rem",
};

// BtnActions
export const styleBtnActions: styleDeclaration = {
  border: "0",
  padding: "1em",
  margin: "0.5em",
  background: "#00000008",
  boxShadow: "0 0 3px #00000040",
  borderRadius: "0.2rem",
};

// SelectorContainer
export const styleSelectorContainer: styleDeclaration = {
  background: "#00000008",
  boxShadow: "0 0 3px #00000070",
  borderRadius: "0.4rem",
  display: "flex",
  justifyContent: "center",
  width: "99%",
};
