import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from 'src/app/add-form/add-form.component';
import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private api: ApiService,) { }
  openDialog() {
    this.dialog.open(AddFormComponent, {
      width: '33%',
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
          alert("error while fetching the data")
          // this.toastr.error('error while fetching the data', 'error', { timeOut: 2000, });
        }
      })
  }
}
