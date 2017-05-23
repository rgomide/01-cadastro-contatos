import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Contato } from "./contatos/contato.model";

export class InMemoryDataService implements InMemoryDbService {

    createDb(): {} {
        let contatos: Contato[] = [
            { id: 1, nome: 'Fulano', email: 'a@a.com', telefone: '(00) 0000-5555' },
            { id: 2, nome: 'Ciclano', email: 'a@a.com', telefone: '(00) 0000-5555' },
            { id: 3, nome: 'Beltrano', email: 'a@a.com', telefone: '(00) 0000-5555' },
            { id: 4, nome: 'Jorjano', email: 'a@a.com', telefone: '(00) 0000-5555' }
        ];

        let carros: any[] = [
            {id: 1, descricao: 'Camar'},
            {id: 2, descricao: 'Mustange'}
        ];

        return {
            'contatos' :contatos,
            'carros': carros
        };
    }

}