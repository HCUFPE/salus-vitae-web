import { ItemPrescricao } from './item-prescricao.model';
import { Usuario } from './usuario.model';
import { Medicamento } from './medicamento.model';

export interface Prescricao {
    _id: string;
    dataPrescricao: Date;
    medicoId: Usuario;
    medicamentos: any[];

    // Novos atributos
    prescricao: number;
    statusPrescricao: string;
    codigoProfissional: number;
    profissional: string;
    Itens: ItemPrescricao[];
}
