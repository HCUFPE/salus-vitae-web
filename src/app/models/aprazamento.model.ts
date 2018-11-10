import { Usuario } from './usuario.model';
import { Medicamentos } from './medicamentos.model';

export interface Aprazamento {
    _id: string;
    horario: Date;
    enfermeira: Usuario;
    isConsumido: boolean;
    intervalo: string;
    isCancelado: boolean;
    justificativa?: string;
}
