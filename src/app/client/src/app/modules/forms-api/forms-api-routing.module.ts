import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guard/auth-gard.service';
import { CreateFormComponent, FormsListComponent } from './index'
const routes: Routes = [
  {
   path: 'create-form', component: FormsListComponent, canActivate: [AuthGuard], data: { roles: 'workspace' },
    children: [
      {
        path: 'create', component: CreateFormComponent, canActivate: [AuthGuard],
        data: {
          breadcrumbs: [{ label: 'Home', url: '/home' }, { label: 'Profile', url: '/profile' }, { label: 'forms', url: '' }],
          roles: 'workspace',
          isUpdate: false
        }
      },
      {
        path: 'update/:action/:framework/:rootOrgId/:type/:subtype', component: CreateFormComponent, canActivate: [AuthGuard],
        data: {
          breadcrumbs: [{ label: 'Home', url: '/home' }, { label: 'Profile', url: '/profile' }, { label: 'forms', url: '' }],
          roles: 'workspace',
          isUpdate: true
        }
      },
   ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsApiRoutingModule { }


