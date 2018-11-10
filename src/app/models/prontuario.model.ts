import { Prescricao } from './prescricao.model';

export interface Prontuario {
    prontuario: number;
    nomeDoPaciente: string;
    dataNascimento: Date;
    nomeMae: string;
    sexo: Date;
    prescricao: Prescricao;
}
