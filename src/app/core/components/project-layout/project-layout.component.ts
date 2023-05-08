import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAServerDialogComponent } from '../../dialog/create-a-server-dialog/create-a-server-dialog.component';


export interface Section {
  name: string;
  updated: Date;
}
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-project-layout',
  templateUrl: './project-layout.component.html',
  styleUrls: ['./project-layout.component.scss']
})
export class ProjectLayoutComponent {

  icons: any = new Set();
  increment: number = 0;
  animal!: string;
  name!: string;

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];
  constructor(
    public dialog: MatDialog
  ) {

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CreateAServerDialogComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.icons.add(42);
      this.increment += 1
      this.icons.add(this.increment)
      this.animal = result;
    });
  }
}
