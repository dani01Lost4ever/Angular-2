import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-back-dialog',
  templateUrl: './back-dialog.component.html',
  styleUrls: ['./back-dialog.component.css']
})
export class BackDialogComponent {
  constructor(public dialogRef: MatDialogRef<BackDialogComponent>) {}

  onYesClick(): void {
    this.dialogRef.close(true);
  }


}


