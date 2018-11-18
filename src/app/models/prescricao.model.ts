import { ItemPrescricao } from './item-prescricao.model';
import { Usuario } from './usuario.model';
import { Medicamento } from './medicamento.model';

export interface Prescricao {
    _id: string;
    medicoId: Usuario;
    medicamentos: any[];

    // Novos atributos
    prescricao: number;
    dataPrescricao: string;
    tipoPrescricao: string;
    statusPrescricao: string;
    codigoProfissional: number;
    profissional: string;
    Itens: ItemPrescricao[];
}
