import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from '../lib/auth.guard';
import { Role } from '../models/role';
import { SharedModule } from '../shared/shared.module';
import { UnauthorizedComponent } from '../shared/unauthorized/unauthorized.component';
import { FileNotFoundComponent } from '../shared/file-not-found/file-not-found.component';
import { ChartModule , LineSeriesService,CategoryService,LegendService,DataLabelService,TooltipService } from '@syncfusion/ej2-angular-charts';
export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'not-found',
        component: FileNotFoundComponent,
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivate: [RoleGuard], data: { roles: [Role.admin] },
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact.module').then((m) => m.ContactModule),
        canActivate: [RoleGuard],
      },
    ],
  },
];
@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    MainComponent,
    DashboardComponent,
  ],
  providers:[ LineSeriesService,CategoryService,LegendService,DataLabelService,TooltipService],
  imports: [ChartModule,SharedModule, CommonModule, RouterModule.forChild(mainRoutes), ],
})
export class MainModule {}
