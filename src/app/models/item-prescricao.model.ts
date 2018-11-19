
// Dados do medicamento
export interface ItemPrescricao {
    ordemItem: number;
    tipoItem: string;
    codigoItem: string;
    descricaoItem: string;
    observacaoItem?: string;
    frequencia?: number;
    administracao: string;
    aceitaDevolucao: string;
    dataInicioItem: string;
    emUso: string;
    codigoTipoItem: number;
    gotejamento?: string;
}
