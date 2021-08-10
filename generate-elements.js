const fs = require('fs');
const FeMapper = {
  boolean: "BooleanElement",
  date: "DateElement",
  display: "DisplayElement",
  string: "InputElement",
  int: "NumberElement",
  float: "NumberElement",
  encrypted: "PasswordElement",
  text: "TextElement",
  smart_text: "SmartTextElement"
}
let allInputs = {};
let dir = fs.readdirSync('./schema');
dir.forEach((file) => {
  let data = fs.readFileSync(`./schema/${file}`);
  let schema = JSON.parse(data);
  for (let key in schema.inputs) {
    // For embedded objects
    allInputs[schema.inputs[key].name] = schema.modelName;
  }
});
fs.readdir('./schema', function (err, files) {
  files.forEach((file) => {
    let requiredImports = {};
    fs.readFile(`./schema/${file}`, (err, data) => {
      let finalOutput = ``;
      let schema = JSON.parse(data);
      let inputs = schema.inputs;
      if (inputs) {
        for (let key in inputs) {
          let currentInput = inputs[key];
          finalOutput += `
@Injectable({
  providedIn: 'root'
})
export class ${currentInput.name} {
  public elements = {`;
          if (currentInput.requiredFields) {
            finalOutput += setFields(schema, currentInput.requiredFields, true, requiredImports);
          }
          if (currentInput.optionalFields) {
            finalOutput += setFields(schema, currentInput.optionalFields, false, requiredImports);
          }
          finalOutput += `
  }
}`;
        }
      }
      let importsOutput = `// Auto generated file do not edit.
`;
      importsOutput += `import {Injectable} from '@angular/core';
`;
      importsOutput += `import {`
      Object.keys(requiredImports).forEach((name) => {
        importsOutput += `
${name},`
      });
      importsOutput += `} from '@neftx/generic-form';
`
      fs.writeFile(`./src/app/elements-generated/${schema.modelName}.ts`, importsOutput + finalOutput, function (err) {
        if (err)
          console.error(err);
      });
    });
  });
});
const setFields = (schema, fields, required, requiredImports) => {
  let output = ``;
  let fieldType = '';
  fields.forEach((field, index) => {
    let currentField = schema.fields[field];
    if (currentField && currentField.fieldType != "association") {
      fieldType = FeMapper[currentField.fieldType] ? FeMapper[currentField.fieldType] : "InputElement";
      if (currentField.ngSelectArray || currentField.isReference) {
        fieldType = "NgSelectElement";
        requiredImports["NgSelectElement"] = true;
      } else {
        requiredImports[fieldType] = true;
      }
      let options = ``;
      if (currentField.ngSelectArray) {
        options += `,{
      async: ${currentField.ngSelectArray.async ? currentField.ngSelectArray.async : false},
      multiple: ${currentField.ngSelectArray.multiple ? currentField.ngSelectArray.multiple : false},
      tag: ${currentField.ngSelectArray.tag ? currentField.ngSelectArray.tag : false},
      searchable: ${currentField.ngSelectArray.searchable ? currentField.ngSelectArray.searchable : false},
      options: [${currentField.ngSelectArray.options ? currentField.ngSelectArray.options.toString() : []}]
    }`
      }
      output += `
    ${field} : new ${fieldType}({
      key: "${field}",
      label: "${currentField.label}",
      placeHolder: "${currentField.placeHolder}",
      defaultValue: ${currentField.defaultValue ? currentField.defaultValue : null},
      required: ${required},
      helpText: "${currentField.helpText ? currentField.helpText : ""}"
    }`
      output += `
    ${currentField.ngSelectArray ? options : ''}),`
    }

  });
  return output;
}