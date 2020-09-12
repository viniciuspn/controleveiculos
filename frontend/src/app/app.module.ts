import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { HttpModule } from '@angular/http'
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogRef } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
//import { FlexLayoutModule } from "@angular/flex-layout";
import 'hammerjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
/*import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { AppRoutingModule } from './app-routing.module';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { VeiculoService } from './veiculos/veiculo.service';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { VeiculoComponent } from './veiculos/veiculo/veiculo.component';
import { VeiculosDetalheComponent } from './veiculos/veiculo/veiculo-detalhe/veiculo-detalhe.component';
import { ToastMensagemComponent } from './toast-mensagem/toast-mensagem.component';
@NgModule({
  declarations: [
    AppComponent,
    VeiculosComponent,
    VeiculoComponent,
    VeiculosDetalheComponent,
    ToastMensagemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpModule,
    MatCheckboxModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDividerModule,
    //FlexLayoutModule,
    MatSlideToggleModule,
    //SwiperModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    LayoutModule,
    InfiniteScrollModule,
    RouterModule.forRoot(ROUTES, {onSameUrlNavigation: 'reload'})
  ],
  providers: [
    VeiculoService,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-PT' },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true
      }
    },
    HttpClientModule
    /* {
       provide: SWIPER_CONFIG,
       useValue: DEFAULT_SWIPER_CONFIG
     },
     */
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
