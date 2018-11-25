import { Paciente } from './paciente.model';
import { Prescricao } from './prescricao.model';

export interface Prontuario {
    prontuario: number;
    _id: string;
    idPaciente: Paciente;
    ala: string;
    dataAdmissao: Date;
    pesoAdmissao: string;
    dataAlta: Date;

    leito: string|number;
    nomeDoPaciente: string;
    dataNascimento: string;
    nomeMae: string;
    sexo: string;
    prescricoes: Prescricao[];

}
