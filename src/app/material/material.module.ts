import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTableModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatExpansionModule,
  MatChipsModule,
  MatSortModule,
  MatSelectModule,
  MatTooltipModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatExpansionModule,
    MatChipsModule,
    MatSortModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: []
})
export class MaterialModule { }
