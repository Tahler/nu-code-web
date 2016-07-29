import { Component, ViewContainerRef } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavbarComponent } from './navbar';
import { ProblemService, UserService } from './shared';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    NavbarComponent
  ],
  providers: [
    HTTP_PROVIDERS,
    ProblemService,
    UserService
  ]
})
export class AppComponent {
  // viewContainerRef is needed for angular2-bootstrap modals
  constructor(private viewContainerRef: ViewContainerRef) { }
}
