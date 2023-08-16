import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserService } from './user/user.service';
import { addTokenInterceptor } from './add-token.interceptor';
import { HearderComponent } from './hearder.component';
import { FooterComponent } from './footer.component';



const boostrap = function (userService: UserService) {
  return () => {
    const state = localStorage.getItem('ANGULAR_PROJECT');
    if (state) {
      userService.state.set(JSON.parse(state));
      console.log(userService.state())
    }
  };
};

@NgModule({
  declarations: [AppComponent, WelcomeComponent, HearderComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideHttpClient(withInterceptors([addTokenInterceptor])),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: boostrap,
      deps: [UserService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
