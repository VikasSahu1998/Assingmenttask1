import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ApiService } from '../shared/api.service';



@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  AddDetailsForm : FormGroup |any;
  button1: string = "Save"
  constructor(private formbuilder: FormBuilder,
    private dialogref: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: ApiService,) { }

  ngOnInit(): void {
    this.AddDetailsForm = new FormGroup({
      name: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    if (this.editData) {
      this.button1 = "Update";
      this.AddDetailsForm.controls['email'].setValue(this.editData.email);
      this.AddDetailsForm.controls['name'].setValue(this.editData.name);
    }
  }

  adddetail() {
    if (!this.editData) {
      if (this.AddDetailsForm.valid) {
        this.api.postEmp(this.AddDetailsForm.value)
          .subscribe({
            next: (res) => {
              alert("details added successfully");
              // this.toastr.success('details added successfully', 'successfully', { timeOut: 2000, });
              this.AddDetailsForm.reset();
              this.dialogref.close('save');
            },
            error: () => {
              alert("error while adding  the data ")
              // this.toastr.error('error while adding  the data', 'error', { timeOut: 2000, });
            }
          })
      }
    } else {
      this.updatedetail();
    }
  }

  updatedetail() {
    this.api.putEmp(this.AddDetailsForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("details updated successfully");
          // this.toastr.success('details updated successfully', 'successfully', { timeOut: 2000, });
          this.AddDetailsForm.reset();
          this.dialogref.close('update');
        },
        error: () => {
          alert("error while updating the data");
          // this.toastr.error('error while updating the data', 'error', { timeOut: 2000, });
        }
      })
  }
}
