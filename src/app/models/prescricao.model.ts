import { Prontuario } from './prontuario.model';
import { Medicamentos } from './medicamentos.model';

export interface Prescricao {
    prescricao: number;
    dataPrescricao: Date;
    tipoPrescricao: string;
    statusPrescricao: string;
    codigoProfissional: number;
    medicamentos: Medicamentos[];
    prontuario: Prontuario;
}
