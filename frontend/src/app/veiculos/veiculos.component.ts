import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { VeiculoService } from './veiculo.service';

@Component({
    selector: 'app-veiculo',
    templateUrl: './veiculos.component.html',
    styleUrls: ['./veiculos.component.css']
  })
  export class VeiculosComponent implements OnInit {
  
  
    constructor(public dialog: MatDialog, private veiculoService: VeiculoService) {
    }
  
    ngOnInit() {
    }
  }
  