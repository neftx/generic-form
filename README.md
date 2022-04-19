# Description

Form builder with typed elements.

## User Guide

Install Generic-Form using the [npm](https://www.npmjs.com/) package manager:

`npm i @neftx/generic-form --save-dev` for Generic Form.\
`npm i @ng-select/ng-select` for Ng-select.\
`npm i @kolkov/angular-editor` for Kolkov editor.\
`npm i bootstrap` for Bootstrap

## Before Using

1. Create 2 folders one in root directory as 'schema' another in src/app as 'elements-generated'.
2. In package.json under script tag add script ```"generate-elements": "node node_modules/@neftx/generic-form/generate-elements.js```
3. import GenericFormModule in app.module

## Creating Form Elements

Create a json file in the schema created above for generating input fields (form-elements)
**Sample**

> registration.model.json

```
{
  "modelName": "RegistrationModel",
  "fields": {
    "mobileNumber": {
      "label": "Mobile Number",
      "fieldType": "string",
      "helpText": "",
      "placeHolder": "Enter Mobile Number"
    },
    "userName": {
      "label": "User Name",
      "fieldType": "string",
      "helpText": "",
      "placeHolder": "Enter User Name"
    },
    "password": {
      "label": "Password",
      "fieldType": "string",
      "helpText": "",
      "placeHolder": "Enter Your Password"
    },
    "email": {
      "label": "Email",
      "fieldType": "string",
      "helpText": "example@example.com",
      "placeHolder": "Enter Your Email"
    },
    "createdAt": {
      "label": "Created at",
      "fieldType": "date",
      "helpText": "",
      "placeHolder": "Enter Created at"
    },
    "updatedAt": {
      "label": "Updated at",
      "fieldType": "date",
      "helpText": "",
      "placeHolder": "Enter Updated at"
    }
  },
  "inputs": {
    "registration": {
      "name": "AppRegistration",
      "requiredFields": [
        "userName",
        "password",
        "mobileNumber"
      ],
      "optionalFields": [
        "email"
      ]
    }
  }
}
```
## Generating Form Elements

1. Run ```npm run generate-elements``` in root directory
2. A typescripts file will be generated in the 'elements-generated' folder, created previously, with the provided modelName in json schema.


## Example

We are creating Registration form as an example.

1. **Simple form layout**
   > registration.component.ts
   ```
   import { Component } from "@angular/core";
   import { RegistrationForm } from '@generated-elements/RegistrationModel';
   @Component({
     selector: "registration-form",
     template: `<simple-form-layout [title]="'Generic Form'" [elementsHash]="input.elements"></simple-form-layout>`,
   })
   export class RegistrationComponent {
   constructor(public input: RegistrationForm){}
   }
   ```
   **Preview**
   ![simpleformlayout](https://user-images.githubusercontent.com/30525574/121009023-47a3fb80-c7b1-11eb-945d-cce997fc87de.png)
2. **Simple form dual-layout**
   > registration.component.ts
   ```
   import { Component } from "@angular/core";
   import { RegistrationForm } from '@generated-elements/RegistrationModel';
   @Component({
     selector: "registration-form",
     template: `<simple-form-dual-layout [title]="'Generic Form'" [elementsHash]="input.elements"></simple-form-dual-layout>`,
     })
   export class RegistrationComponent {
   constructor(public input: RegistrationForm){}
   }
   ```
   **Preview**
   ![simpledualform-layout](https://user-images.githubusercontent.com/30525574/121009326-a79aa200-c7b1-11eb-9a80-358db3d7db44.png)
3. **Creating custom forms by using form elements**
   > registration.component.ts

```
import { FormBaseService } from '@neftx/generic-form';
import { Component } from "@angular/core";
import { AppRegistration } from '@generated-elements/RegistrationModel';
import { FormGroup } from '@angular/forms';
@Component({
  selector: "registration-form",
  templateUrl: "registration.component.html"
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  constructor(
    private formBase: FormBaseService,
    public input: AppRegistration,
  ) {
    this.registrationForm = this.formBase.toFormGroupFromHash(this.input.elements);
  }
}
```

> registration.component.html

```
<form [formGroup]="registrationForm" *ngIf="input.elements">
    <div class="row">
      <div class="col-md-6">
        <form-element [element]="input.elements.mobileNumber" [form]="registrationForm"
         [label]="true" [labelType]="'top'">
        </form-element>
      </div>
      <div class="col-md-6">
        <form-element [element]="input.elements.userName" [form]="registrationForm" [label]="true"
          [labelType]="'top'">
        </form-element>
      </div>
      <div class="col-md-6">
        <form-element [element]="input.elements.password" [form]="registrationForm" [label]="true"
          [labelType]="'top'">
        </form-element>
      </div>
      <div class="col-md-6">
        <form-element [element]="input.elements.email" [form]="registrationForm" [label]="true"
         [labelType]="'top'">
        </form-element>
      </div>
    </div>
    <div class="form-footer">
      <div class="d-flex justify-content-center">
        <button class="btn btn-secondary mr-3" type="button">Cancel</button>
        <button class="btn btn-primary" type="button">Submit</button>
      </div>
    </div>
  </form>
```

**Preview**

> top :
> ![Screenshot from 2021-06-07 13-41-03](https://user-images.githubusercontent.com/30525574/121010472-13313f00-c7b3-11eb-9d03-7249a32f1505.png)

###### Change labelType options to 'left', 'right','top'

> left :
> ![Screenshot from 2021-06-07 13-43-35](https://user-images.githubusercontent.com/30525574/121010863-905cb400-c7b3-11eb-94cf-13aff17b9d82.png)
