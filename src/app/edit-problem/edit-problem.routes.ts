import { RouterConfig } from '@angular/router';
import { EditProblemComponent } from './';

export const EditProblemRoutes: RouterConfig = [
  {
    path: 'edit-problem/:id',
    component: EditProblemComponent
  }
];
