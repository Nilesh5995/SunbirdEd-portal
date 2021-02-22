import { Framework } from '@sunbird/shared';
//import { CreateFormApiService } from './../../services/create-form/create-form-api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateFormApiService} from './../../services/index';
import { FrameworkService, PermissionService, UserService } from '@sunbird/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '@sunbird/shared';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})

export class CreateFormComponent implements OnInit {
  public formCreationForm: FormGroup;
  public formIsInvalid = false;
  public updateFormData: any;
  public showForm = false;
  public rootOrgId: string;
  public isOrgIdDisabled = true;
  public formSubmitUrl: string
  public successMsg: string;
  filterConfig = {
    "fields": [
      {
        "code": "primaryCategory",
        "dataType": "list",
        "description": "Type",
        "editable": true,
        "default": [],
        "renderingHints": {
          "class": "sb-g-col-lg-1"
        },
        "inputType": "nestedselect",
        "label": "Content Type(s)",
        "name": "Type",
        "placeholder": "Select ContentType",
        "required": false,
        "visible": true
      },
      {
        "code": "board",
        "visible": true,
        "depends": [],
        "editable": true,
        "dataType": "list",
        "renderingHints": {
          "class": "sb-g-col-lg-1"
        },
        "description": "Board",
        "label": "Board",
        "required": false,
        "name": "Board",
        "inputType": "select",
        "placeholder": "Select Board",
        "output": "name"
      },
      {
        "code": "medium",
        "visible": true,
        "depends": [
          "board"
        ],
        "editable": true,
        "dataType": "list",
        "renderingHints": {
          "class": "sb-g-col-lg-1"
        },
        "description": "",
        "label": "Medium(s)",
        "required": false,
        "name": "Medium",
        "inputType": "nestedselect",
        "placeholder": "Select Medium",
        "output": "name"
      },
      {
        "code": "gradeLevel",
        "visible": true,
        "depends": [
          "board",
          "medium"
        ],
        "editable": true,
        "default": "",
        "dataType": "list",
        "renderingHints": {
          "class": "sb-g-col-lg-1"
        },
        "description": "Class",
        "label": "Class(es)",
        "required": false,
        "name": "Class",
        "inputType": "nestedselect",
        "placeholder": "Select Class",
        "output": "name"
      },
      {
        "code": "subject",
        "visible": true,
        "depends": [
          "board",
          "medium",
          "gradeLevel"
        ],
        "editable": true,
        "default": "",
        "dataType": "list",
        "renderingHints": {
          "class": "sb-g-col-lg-1"
        },
        "description": "",
        "label": "Subject(s)",
        "required": false,
        "name": "Subject",
        "inputType": "nestedselect",
        "placeholder": "Select Subject",
        "output": "name"
      },
      {
        "code": "topic",
        "visible": true,
        "editable": true,
        "dataType": "list",
        "depends": [
          "board",
          "medium",
          "gradeLevel",
          "subject"
        ],
        "default": "",
        "renderingHints": {
          "class": "sb-g-col-lg-1"
        },
        "name": "Topic",
        "description": "Choose a Topics",
        "inputType": "topicselector",
        "label": "Topic(s)",
        "placeholder": "Choose Topics",
        "required": false
      }
    ]
  }
  constructor(public formBuilder: FormBuilder, public createFormApiService: CreateFormApiService, private activatedRoute: ActivatedRoute, public toasterService: ToasterService, public userService:UserService) {
   }

  ngOnInit() {
    this.rootOrgId = this.userService.userProfile.rootOrgId;
    console.log(this.activatedRoute.snapshot.params, 'this.activatedRoute.snapshot');
    if (this.activatedRoute.snapshot.data.isUpdate) {
        this.formSubmitUrl = 'http://localhost:3000/api/data/v1/form/update';
        this.successMsg = 'Form Updated Successfully...';
        this.getForm();
    } else {
      
      this.formSubmitUrl = 'http://localhost:3000/api/data/v1/form/create';
      this.successMsg = 'Form Created Successfully...';
      this.initializeFormFields();
    }
  }

  initializeFormFields(): void {
      this.formCreationForm = this.formBuilder.group({
      id: ['', ],
      ver: ['', ],
      msgid: ['', ],
      did: ['', ],
      type: ['', Validators.required],
      subType: ['', Validators.required],
      action: ['', Validators.required],
      framework: ['', Validators.required],
      rootOrgId: [this.rootOrgId, Validators.required],
      templateName: ['', Validators.required],
      fields: ['', Validators.required]
    });
    this.showForm = true;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched();
    });
  }

  validateFields() {
    if (!this.formCreationForm.valid) {
      this.formIsInvalid = true;
      this.validateAllFormFields(this.formCreationForm);
    } else {
    let payload = {
        id: this.formCreationForm.controls['id'].value,
        ver: this.formCreationForm.controls['id'].value,
        ets: 0,
        params: {
          msgid: this.formCreationForm.controls['msgid'].value,
          did:  this.formCreationForm.controls['did'].value,
        },
        request: {
          type: this.formCreationForm.controls['type'].value,
          subType: this.formCreationForm.controls['subType'].value,
          action: this.formCreationForm.controls['action'].value,
          framework: this.formCreationForm.controls['framework'].value,
          rootOrgId: this.formCreationForm.controls['rootOrgId'].value,
          data: {
            templateName: this.formCreationForm.controls['templateName'].value,
            action: this.formCreationForm.controls['action'].value,
            fields:  this.formCreationForm.controls['fields'].value
          }
        }
      };
      const data = {
        url : this.formSubmitUrl,
        data : payload
      }
      this.createFormApiService.createForm(data).subscribe(res => {
        this.toasterService.success(this.successMsg);

      },
      (err) => {
        this.toasterService.error('Something Went Wrong..');
      });
    }
  }

  getForm() {
    let payload = {
      // request: {
      //   action: "create",
      //   framework: "*",
      //   rootOrgId: "0131779743139266560",
      //   subType: "test-resource2",
      //   type: "test-content2",
      // }
      request: {
        action: this.activatedRoute.snapshot.params.action,
        framework: this.activatedRoute.snapshot.params.framework,
        rootOrgId: this.activatedRoute.snapshot.params.rootOrgId,
        subType: this.activatedRoute.snapshot.params.subtype,
        type: this.activatedRoute.snapshot.params.type,
      }
    }
    const data = {
        url: 'data/v1/form/read',
        data : payload
    };
    this.createFormApiService.readForm(data).subscribe(res => {
      console.log(res.result, 'res.result')
      this.updateFormData = res.result;
      this.formCreationForm = this.formBuilder.group({
        id: ['', ],
        ver: ['', ],
        msgid: ['', ],
        did: ['', ],
        type: [this.updateFormData.form.type, Validators.required],
        subType: [this.updateFormData.form.subtype, Validators.required],
        action: [this.updateFormData.form.action, Validators.required],
        framework: [this.updateFormData.form.framework, Validators.required],
        rootOrgId: [this.updateFormData.form.rootOrgId, Validators.required],
        templateName: [this.updateFormData.form.data.templateName, Validators.required],
        fields: [this.updateFormData.form.data.fields, Validators.required]
      });
      this.showForm = true;
    },
    (err) => {

    });
  }
}
