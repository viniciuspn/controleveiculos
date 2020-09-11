import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'app-toast-mensagem',
    templateUrl: './toast-mensagem.component.html',
    styleUrls: ['./toast-mensagem.component.css']
})
export class ToastMensagemComponent implements OnInit {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

    ngOnInit() {
    }

}
