
export interface Operacao {
    cdPreOperacaoAprazamento: string;
    isConsumido: boolean;
    dtOperacao: Date;
    justificativa?: string;
    deviceUuid: string;
    deviceSerial: string;
    deviceManufacturer: string;
    deviceModel: string;
    devicePlatform: string;
    deviceVersion: string;
    nmUsuario: string;
}