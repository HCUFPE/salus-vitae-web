import { Paciente } from './paciente.model';
import { Prescricao } from './prescricao.model';

export interface Prontuario {
    _id: string;
    idPaciente: Paciente;
    ala: string;
    dataAdmissao: Date;
    pesoAdmissao: string;
    dataAlta: Date;
    leito: string;
    prescricoes: Prescricao[];

// Novos atributos
    prontuario: number;
    nomeDoPaciente: string;
    dataNascimento: string;
    nomeMae: string;
    sexo: string;
}
