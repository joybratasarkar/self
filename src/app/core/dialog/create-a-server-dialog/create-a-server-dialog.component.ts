import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../components/project-layout/project-layout.component';

@Component({
  selector: 'app-create-a-server-dialog',
  templateUrl: './create-a-server-dialog.component.html',
  styleUrls: ['./create-a-server-dialog.component.scss']
})
export class CreateAServerDialogComponent {
  icons:any = new Set();
  constructor(
    public dialogRef: MatDialogRef<CreateAServerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData | any,
  ) {}
  addIcons()
  {
    
    // this.icons.add(42);
    // debugger;
    // for (const item of this.icons) {
    //   console.log('this.icons',item);
      
    // }
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
