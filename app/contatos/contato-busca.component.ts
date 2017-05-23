import { Component, OnInit, OnChanges, Input, SimpleChanges, SimpleChange, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Contato } from "./contato.model";
import { ContatoService } from "./contato.service";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [`
        .cursor-pointer:hover {
            cursor: pointer;
        }
    `]/*,
    inputs: [
        'busca:mySearch' // propertyName:alias
    ]*/
})

export class ContatoBuscaComponent implements OnInit, OnChanges {
   
    @Input('mySearch') busca: string; // recomendado
    @Output('mySearchChange') buscaChange: EventEmitter<string> = new EventEmitter<string>(); // padrão x xChange [x]="" (xChange)="" [(x)]=""
    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<string> = new Subject<string>();
    
    constructor(
        private contatoService: ContatoService,
        private router: Router
    ) { }

    ngOnInit(): void { 
        this.contatos = this.termosDaBusca
            .debounceTime(500) // aguarde por 500ms para emitir novos eventos
            .distinctUntilChanged() // ignore se o próximo termo de busca for igual ao anterior
            .switchMap(term => term ? this.contatoService.search(term) : Observable.of<Contato[]>([]))
            .catch(err => Observable.of<Contato[]>([]));

            /*this.contatos.subscribe((contatos: Contato[]) => {
                console.log('retornou do servidor: ', contatos);
            });*/
    }

    ngOnChanges(changes: SimpleChanges): void {
        let busca: SimpleChange = changes['busca'];
        this.search(busca.currentValue);
    }

    search(term: string): void {        
        this.termosDaBusca.next(term);
        this.buscaChange.emit(term);
    }

    verDetalhe(contato: Contato): void {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }

}