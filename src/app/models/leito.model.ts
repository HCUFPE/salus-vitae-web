import { Prontuario } from './prontuario.model';
import { Ala } from './ala.model';

export interface Leito {
    leito?: string;
    atendimento?: number;
    prontuario?: number;

    ala?: Ala;
    pacienteInternado?: Prontuario;
}
