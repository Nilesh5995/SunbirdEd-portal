import { ProgramsService } from '@sunbird/core';
import { ListAllProgramsComponent } from './components';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramComponent } from './components';
import { EnrollContributorComponent } from './components/enroll-contributor/enroll-contributor.component';

const routes: Routes = [{
  path: '', component: ListAllProgramsComponent, canActivate: [ProgramsService],
  data: {
    telemetry: {
      env: 'contribute', pageid: 'programs-list', type: 'view', subtype: 'paginate'
    }
  }
},
{
  path: 'enrollprograms', component: EnrollContributorComponent, pathMatch: 'full',
  data: {
   // telemetry: { env: 'programs', type: 'view', subtype: 'paginate' }
  }, 
},
{
  path: 'program/:programId', component: ProgramComponent,
  data: {
    telemetry: { env: 'programs', type: 'view', subtype: 'paginate' }
  },
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
