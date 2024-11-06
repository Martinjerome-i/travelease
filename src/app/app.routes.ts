import { Routes } from '@angular/router';
import { mainRoutes } from './main/main-routing.module';

export const routes: Routes = [
    {
        path: '',
        children: mainRoutes,
    },
];
