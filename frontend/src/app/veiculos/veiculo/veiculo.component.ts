import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { VeiculoService } from '../veiculo.service';
@Component({
    selector: 'app-veiculo',
    templateUrl: './veiculo.component.html',
    styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {

    dadosVeiculo = [];
    novoVeiculo = {
        placa: '',
        chassi: '',
        renavam: '',
        modelo: '',
        marca: '',
        ano: '',

    };
    adicionarVeiculo = false;
    panelNovoVeiculo = false;
    hide = true;

    constructor(private veiculoService: VeiculoService) {
        this.listarVeiculos();
    }

    ngOnInit() {
    }

    listarVeiculos() {
        this.veiculoService.getVeiculo()
            .subscribe(dados => this.formarDadosVeiculo(dados));
    }

    formarDadosVeiculo(dados) {
        this.dadosVeiculo = dados.data;
    }

    teste() {
        this.hide = false;
        this.adicionarVeiculo = true;
    }

    cancelarNovo() {
        this.novoVeiculo = {
            placa: '',
            chassi: '',
            renavam: '',
            modelo: '',
            marca: '',
            ano: '',

        };
        this.adicionarVeiculo = false;
    }

    novoVeiculoInserido() {
        this.listarVeiculos();
    }
}
