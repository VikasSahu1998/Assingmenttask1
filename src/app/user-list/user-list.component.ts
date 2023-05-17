import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddFormComponent } from '../add-form/add-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})


export class UserListComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private api: ApiService,) { }

  ngOnInit(): void {
    this.getalldetail();
  }

  openDialog() {
    this.dialog.open(AddFormComponent, {
      width: '100%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getalldetail();
      }
    })
  }

  getalldetail() {
    this.api.getEmp()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error: (err) => {
          alert("error while fetching the data");
          // this.toastr.error('error while fetching the data', 'error', { timeOut: 2000, });
        }
      })
  }
  editdetail(row: any) {
    this.dialog.open(AddFormComponent, {
      width: '33%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getalldetail();
      }
    })
  }

  deletedetail(id: number) {
    this.api.deleteEmp(id)
      .subscribe({
        next: (res) => {
          alert("details deleted successfully");
          // this.toastr.success('details deleted successfully', 'successfully', { timeOut: 2000, });
          this.getalldetail();
        },
        error: () => {
          alert("someting went wrong");
          // this.toastr.error('someting went wrong', 'error', { timeOut: 2000, });
        }
      })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
