import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ForgotComponent } from '../forgot/forgot.component';
import { LifecycleComponent } from '../lifecycle/lifecycle.component';
import { ProductsComponent } from '../products/products.component';
import { TemplateComponent } from '../forms/template/template.component';
import { ReactiveComponent } from '../forms/reactive/reactive.component';
import { CalculatorComponent } from '../calculator/calculator.component';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: HomeComponent,
  },
  {
    title: 'Forgot Pass Custom Alert',
    path: 'forgot-pass',
    component: ForgotComponent,
  },
  {
    title: 'Lifecycle',
    path: 'lifecycle',
    component: LifecycleComponent,
  },
  {
    title: 'Products',
    path: 'products',
    component: ProductsComponent,
  },
  {
    title: 'Calculator (service based)',
    path: 'calculator',
    component: CalculatorComponent,
  },
  {
    title: 'Template Form',
    path: 'template-form',
    component: TemplateComponent,
  },
  {
    title: 'Reactive Form',
    path: 'reactive-form',
    component: ReactiveComponent,
  },
];
