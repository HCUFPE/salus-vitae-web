export interface Paciente {

  id: string;
  nome: string;
  nomeSocial?: string;
  sexo: string;
  dataNascimento: Date;
  numeroRg: string;
  numeroCpf: string;
  nomeMae: string;
  nomePai: string;
  alergias: Object[];

}
