import { Usuario } from './usuario.model';
import { Prontuario } from './prontuario.model';
import { Aprazamento } from 'src/app/models/aprazamento.model';

export interface Consumo {
    prontuario: Prontuario;
    aprazamento: Aprazamento;
    horario: Date;
    usuario: Usuario;
    device_uuid: string;
    device_serial: string;
    device_manufacturer: string;
    device_model: string;
    device_platform: string;
    device_version: string;
}
