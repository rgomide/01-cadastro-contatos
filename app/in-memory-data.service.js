"use strict";
class InMemoryDataService {
    createDb() {
        let contatos = [
            { id: 1, nome: 'Fulano', email: 'a@a.com', telefone: '(00) 0000-5555' },
            { id: 2, nome: 'Ciclano', email: 'a@a.com', telefone: '(00) 0000-5555' },
            { id: 3, nome: 'Beltrano', email: 'a@a.com', telefone: '(00) 0000-5555' },
            { id: 4, nome: 'Jorjano', email: 'a@a.com', telefone: '(00) 0000-5555' }
        ];
        let carros = [
            { id: 1, descricao: 'Camaro' },
            { id: 2, descricao: 'Mustange' }
        ];
        return {
            'contatos': contatos,
            'carros': carros
        };
    }
}
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map