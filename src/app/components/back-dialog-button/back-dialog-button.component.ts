import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { BackDialogComponent } from '../back-dialog/back-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-back-dialog-button',
  templateUrl: './back-dialog-button.component.html',
  styleUrls: ['./back-dialog-button.component.css']
})
export class BackDialogButtonComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef= this.dialog.open(BackDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: '.btn-circle'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result===true){
        this.router.navigate(["/"]);
      }
    });
  }


}
