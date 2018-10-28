import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guard/auth.guard';
import {ToastModule} from 'ng6-toastr/ng2-toastr';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ToastModule.forRoot()
    ],
    declarations: [AppComponent],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
