import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { DirectiveModule } from 'src/app/directive/directive.module';
@NgModule({
  declarations: [HeaderComponent, SideBarComponent],
  imports: [CommonModule, PrimeNgModule, DirectiveModule],
  exports: [HeaderComponent, SideBarComponent],
})
export class ComponentsModule {}
