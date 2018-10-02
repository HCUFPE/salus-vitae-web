import { Alergia } from './alergia.model';

export interface Paciente {
    _id: string;
    nome: string;
    sexo: string;
    numeroRg: string;
    numeroCpf: string;
    nomeMae: string;
    nomePai: string;
    alergias: Alergia[];
}

