import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { HttpHeaders, HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import {Observable} from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { ToastMensagemComponent } from '../toast-mensagem/toast-mensagem.component';
import { MatSnackBar} from '@angular/material';
import {openApi} from '../app.api';


@Injectable()
export class VeiculoService{

  constructor(private http: HttpClient, public toast: MatSnackBar){}

    getVeiculo(): Observable<any>{
        return this.http.get(`${openApi}/retorna/veiculos`)
        .map(dados => dados);
    }

    updateVeiculo( json, idVeiculo: number): Observable<any>{
      return this.http.put(`${openApi}/atualiza/veiculo/${idVeiculo}`, json)
      .map(dados => dados);
  }
  
    excluirVeiculo(idVeiculo: number): Observable<any>{
      return this.http.delete(`${openApi}/delete/veiculo//${idVeiculo}`)
      .map(dados => dados);
  }

    addVeiculo(json): Observable<any>{
      return this.http.post(`${openApi}/cadastro/veiculo`, json)
      .map(dados => dados);
  }

  exibirToastAlterado(){
    this.toast.openFromComponent(ToastMensagemComponent,{
      data: {
        message: `Dado(s) alterado(s) com sucesso`,
        type: 'success'
      }
    });
  }

  exibirToastAdicionado(){
    this.toast.openFromComponent(ToastMensagemComponent,{
      data: {
        message: `Endereço adicionado com sucesso`,
        type: 'success'
      }
    });
  }

  exibirToastDeletado(){
    this.toast.openFromComponent(ToastMensagemComponent,{
      data: {
        message: `Endereço excluído com sucesso`,
        type: 'success'
      }
    });
  }

  exibirToastErro(){
    this.toast.openFromComponent(ToastMensagemComponent,{
      data: {
        message: `Escolha outro endereço para ser o principal, antes de excluí-lo!`,
        type: 'danger'
      }
    });
  }

}