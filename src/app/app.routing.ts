import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { CreateComponent } from './create/create.component';
import { DeployComponent } from './deploy/deploy.component';
import { CreateNewProjectComponent } from './create-new-project/create-new-project.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'instruction',component: CreateComponent},
    { path: 'delete',component: DeployComponent},
    { path: 'create',component:CreateNewProjectComponent},
    { path: 'edit/:id',component :EditComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);