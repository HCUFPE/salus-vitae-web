import { Paciente } from './paciente.model';
import { Usuario } from './usuario.model';
import { Medicamento } from './medicamento.model';

export interface Aprazamento {
    _id: string;
    paciente: Paciente;
    horario: Date;
    enfermeira: Usuario;
    medicamento: Medicamento;
    isConsumido: boolean;
    intervalo: string;
    isCancelado: string;
    justificativa?: string;
}

