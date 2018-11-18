import { Ala } from './ala.model';

export interface Leito {
    leito: number;
    atendimento?: number;
    prontuario?: number;

    ala?: Ala;
}
