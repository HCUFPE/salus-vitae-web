import { Usuario } from './usuario.model';
import { Medicamento } from './medicamento.model';

export interface Prescricao {
    _id: string;
    dataPrescricao: Date;
    medicoId: Usuario;
    medicamentos: any[];
}
