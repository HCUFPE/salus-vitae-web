import { ItemPrescricao } from './item-prescricao.model';
import { Atendimento } from './atendimento.model';
import { Prontuario } from './prontuario.model';

export interface PreOperacao {
    _id: string;
    status: string;
    cdProntuario: number;
    cdAtendimento: number;
    cdPrescricao: number;
    dtPreOpAprazamento: Date;
    horarioInicial: Date;
    intervalo: number;
    cdItem: number;
    cdTpItem: number;
    ordemItem: number;
    quantidade: number;

    prontuario?: Prontuario;
    atendimento?: Atendimento;
    itemPrescricao?: ItemPrescricao;
}
