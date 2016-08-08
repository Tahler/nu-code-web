import { provideRouter, RouterConfig } from '@angular/router';
import { HomeRoutes } from './home';
import { ProblemRoutes } from './problem';
import { ProblemListRoutes } from './problem-list';
import { ProfileRoutes } from './profile';
import { EditProfileRoutes } from './edit-profile';
import { CompetitionListRoutes } from './competition-list';
import { RegisterRoutes } from './register';
import { LoginRoutes } from './login-required';
import { VerificationRoutes } from './verification-required';
import { UserManagementRoutes } from './user-management';
import { CreateProblemRoutes } from './create-problem';
import { EditProblemRoutes } from './edit-problem';
import { ResetPasswordRoutes } from './reset-password';
import {
  LoggedInGuard,
  NotLoggedInGuard,
  VerifiedGuard,
  NotVerifiedGuard,
  IsNeumonterGuard,
  CanEditProblemGuard,
  IsMyProfileGuard
} from './shared';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...ProblemListRoutes,
  ...ProblemRoutes,
  ...ProfileRoutes,
  ...EditProfileRoutes,
  ...CompetitionListRoutes,
  ...RegisterRoutes,
  ...LoginRoutes,
  ...VerificationRoutes,
  ...UserManagementRoutes,
  ...CreateProblemRoutes,
  ...EditProblemRoutes,
  ...ResetPasswordRoutes
];

export const AppRouterProviders = [
  LoggedInGuard,
  NotLoggedInGuard,
  VerifiedGuard,
  NotVerifiedGuard,
  IsNeumonterGuard,
  CanEditProblemGuard,
  IsMyProfileGuard,
  provideRouter(routes),
];
