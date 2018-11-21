import { Prescricao } from './prescricao.model';

export interface Atendimento {
    atendimento: number;
    prontuario: number;
    prescricoes: Prescricao[];
}
