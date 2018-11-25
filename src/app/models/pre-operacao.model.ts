import { ItemPrescricao } from './item-prescricao.model';
import { Atendimento } from './atendimento.model';
import { Prontuario } from './prontuario.model';

export interface PreOperacao {
  _id?: string;
  status: boolean;
  cdProntuario: number;
  cdAtendimento: number;
  cdPrescricao: number;
  dtPreOpAprazamento: Date;
  horarioInicial: Date;
  intervalo: number;
  cdItem: string;
  cdTpItem: number;
  ordemItem: number;
  quantidade: number;
  nmMedicamento: string;
  nmPaciente: string;
  nmUsuario: string; 

  prontuario?: Prontuario;
  atendimento?: Atendimento;
  itemPrescricao?: ItemPrescricao;
}
