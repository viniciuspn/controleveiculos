import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VeiculoService } from './veiculos/veiculo.service';
import { VeiculosComponent } from './veiculos/veiculo.component';
import { VeiculoComponent } from './veiculos/veiculo/veiculo.component';
import { VeiculosDetalheComponent } from './veiculos/veiculo/veiculo-detalhe/veiculos-detalhe.component';
import { ToastMensagemComponent } from './toast-mensagem/toast-mensagem.component';
@NgModule({
  declarations: [
    AppComponent,
    VeiculosComponent,
    VeiculoComponent,
    VeiculosDetalheComponent,
    ToastMensagemComponent,
    MatTabsModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule
  ],
  providers: [
    VeiculoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
