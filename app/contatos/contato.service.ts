import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { CONTATOS } from './contatos-mock';
import {Contato} from './contato.model';
import { ServiceInterface } from "../interfaces/service.interface";

@Injectable()
export class ContatoService implements ServiceInterface<Contato> {

    private contatosUrl: string = 'app/contatos';
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http        
    ) {}

    /*getContatos(): Promise<Contato[]> {
        return Promise.resolve(CONTATOS);
    }*/

    findAll(): Promise<Contato[]> {        
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data as Contato[])
            .catch(this.handleError);
    }

    find(id: number): Promise<Contato> {
        return this.findAll()
            .then((contatos: Contato[]) => contatos.find(contato => contato.id === id));
    }

    private handleError(err: any): Promise<any> {
        console.log('Error: ', err);
        return Promise.reject(err.message || err);
    }

    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
        })
        .then(() => {
            console.log('primeiro then');
            return 'Curso Angular 2';
        })
        .then((param: string) => {
            console.log('segundo then');
            console.log(param);

            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log('continuando depois de 2 segundos...');
                    resolve2();
                }, 2000);
            });

        })
        .then(() => {
            console.log('terceiro then');
            return this.findAll();
        });
    }

    update(contato: Contato): Promise<Contato> {
        const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id
        return this.http
            .put(url, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }

    create(contato: Contato): Promise<Contato> {
        return this.http
            .post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((response: Response) => {
                console.log(response.json());
                return response.json().data as Contato
            })
            .catch(this.handleError);
    }

    delete(contato: Contato): Promise<Contato> {
        const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }

    search(term: string): Observable<Contato[]> {
        return this.http
            .get(`${this.contatosUrl}/?nome=${term}`)
            .map((res: Response) => res.json().data as Contato[]);
    }

}