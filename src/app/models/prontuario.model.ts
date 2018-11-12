import { Prescricao } from './prescricao.model';
import { Leito } from './leito.model';

export interface Prontuario {
    prontuario: number;
    nomeDoPaciente: string;
    dataNascimento: Date;
    nomeMae: string;
    sexo: string;
    prescricao: Prescricao;
    leito: Leito;
}
