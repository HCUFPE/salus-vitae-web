import { ItemPrescricao } from './item-prescricao.model';
import { Atendimento } from './atendimento.model';
import { Prontuario } from './prontuario.model';

export interface PreOperacao {
    _id: string;
    status: string;
    cdProntuario: number;
    cdAtendimento: number;
    codigoPrescricao: number;
    dtPreOpAprazamento: Date;
    horarioInicial: Date;
    intervalo: number;
    codigoItem: string;
    codigoTipoItem: number;
    ordemItem: number;
    quantidade: number;

    prontuario?: Prontuario;
    atendimento?: Atendimento;
    itemPrescricao?: ItemPrescricao;
}
