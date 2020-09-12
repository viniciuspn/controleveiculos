import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { VeiculoService } from '../../veiculo.service';
import { Veiculo } from './veiculo-detalhe.model';
import { VeiculoComponent } from '../veiculo.component';

@Component({
  selector: 'app-veiculo-detalhe',
  templateUrl: './veiculo-detalhe.component.html',
  styleUrls: ['./veiculo-detalhe.component.css']
})
export class VeiculosDetalheComponent implements OnInit {

  panelOpenState = false;
  panelNovoVeicuo = false;
  hide = true;
  editarInfo = false;
  idveiculo;
  recePlacaVeiculo;
  recebChassiVeiculo;
  recebRenavamVeiculo;
  recebModeloVeiculo;
  recebMarcaVeiculo;
  recebAnoFabricacao;
  excluir = false;

  @Input() veiculoDetalhe: Veiculo;
  @Output() cancelarNovoVeiculo = new EventEmitter();
  @Output() novoVeiculoSucesso = new EventEmitter();

  veiculoForm = new FormGroup({
    placa: new FormControl(Validators.required),
    chassi: new FormControl(Validators.required),
    renavam: new FormControl(Validators.required),
    modelo: new FormControl(Validators.required),
    marca: new FormControl(Validators.required),
    ano: new FormControl(Validators.required),
  });

  desabilitarVeiculo() {
    this.veiculoForm.controls.placa.disable();
    this.veiculoForm.controls.chassi.disable();
    this.veiculoForm.controls.renavam.disable();
    this.veiculoForm.controls.modelo.disable();
    this.veiculoForm.controls.marca.disable();
    this.veiculoForm.controls.ano.disable();
  }

  habilitarVeiculo() {
    this.editarInfo = true;
    this.veiculoForm.controls.placa.enable();
    this.veiculoForm.controls.chassi.enable();
    this.veiculoForm.controls.renavam.enable();
    this.veiculoForm.controls.modelo.enable();
    this.veiculoForm.controls.marca.enable();
    this.veiculoForm.controls.ano.enable();
  }
  constructor(private veiculoService: VeiculoService) { }

  ngOnInit() {
    this.desabilitarVeiculo();
    this.panelOpenState = !(this.veiculoDetalhe.idveiculo > 0);
    if (!(this.veiculoDetalhe.idveiculo > 0)) {
      this.habilitarVeiculo();
    }

    this.veiculoForm.controls.placa.setValue(this.veiculoDetalhe.placaVeiculo);
    this.veiculoForm.controls.chassi.setValue(this.veiculoDetalhe.chassiVeiculo);
    this.veiculoForm.controls.renavam.setValue(this.veiculoDetalhe.renavamVeiculo);
    this.veiculoForm.controls.modelo.setValue(this.veiculoDetalhe.modeloVeiculo);
    this.veiculoForm.controls.marca.setValue(this.veiculoDetalhe.marcaVeiculo);
    this.veiculoForm.controls.ano.setValue(this.veiculoDetalhe.anoFabricacao);
  }
  editarVeiculo(): void {
    this.editarInfo = true;
    this.habilitarVeiculo();
    this.recePlacaVeiculo = this.veiculoForm.value.placa;
    this.recebChassiVeiculo = this.veiculoForm.value.chassi;
    this.recebRenavamVeiculo = this.veiculoForm.value.renavam;
    this.recebModeloVeiculo = this.veiculoForm.value.modelo;
    this.recebModeloVeiculo = this.veiculoForm.value.numero;
    this.recebMarcaVeiculo = this.veiculoForm.value.marca;
    this.recebAnoFabricacao = this.veiculoForm.value.ano;

    this.veiculoForm.patchValue({
      placa: this.recePlacaVeiculo,
      chassi: this.recebChassiVeiculo,
      renavam: this.recebRenavamVeiculo,
      modelo: this.recebModeloVeiculo,
      numero: this.recebModeloVeiculo,
      marca: this.recebMarcaVeiculo,
      ano: this.recebAnoFabricacao,
    });
  }

  cancelaEditVeiculo(): void {
    if (this.veiculoDetalhe.idveiculo > 0) {
      this.editarInfo = false;
      this.veiculoForm.patchValue({
        placa: this.recePlacaVeiculo,
        chassi: this.recebChassiVeiculo,
        renavam: this.recebRenavamVeiculo,
        modelo: this.recebModeloVeiculo,
        numero: this.recebModeloVeiculo,
        marca: this.recebMarcaVeiculo,
        ano: this.recebAnoFabricacao,
      });
      this.desabilitarVeiculo();
    } else {
      this.cancelarNovoVeiculo.emit();
    }
  }

  salvarVeiculo(): void {
    this.editarInfo = false;
    this.desabilitarVeiculo();
    this.veiculoForm.patchValue({
      placa: this.veiculoForm.value.placa,
      chassi: this.veiculoForm.value.chassi,
      renavam: this.veiculoForm.value.renavam,
      modelo: this.veiculoForm.value.modelo,
      marca: this.veiculoForm.value.marca,
      ano: this.veiculoForm.value.ano,
    });

    this.editarInfo = false;
    if (this.veiculoDetalhe.idveiculo === 0) {
      this.veiculoService.addVeiculo(Object.assign(this.veiculoForm.value))
        .subscribe(() => this.dadoSalvoSucesso(true));
    }
    else {
      this.veiculoService.updateVeiculo(Object.assign(this.veiculoForm.value), this.veiculoDetalhe.idveiculo)
        .subscribe(() => this.dadoSalvoSucesso(false));
    }
  }

  dadoSalvoSucesso(novoVeiculo: boolean) {
    if (novoVeiculo) {
      this.veiculoService.exibirToastAdicionado();
      this.cancelarNovoVeiculo.emit();
    } else {
      this.veiculoService.exibirToastAlterado();
    }
    this.novoVeiculoSucesso.emit();
  }

  excluirveiculo(): void {

    this.veiculoService.excluirVeiculo(this.veiculoDetalhe.idveiculo)
      .subscribe();

    this.veiculoService.exibirToastDeletado();
    this.excluir = true;
  }




}