export interface Paciente {

  id: string;
  nome: string;
  dataNascimento: Date;
  dataAdmissao: Date;
  tipoPerfil: string;
  numeroRg: string;
  numeroCpf: string;
  nomeMae: string;
  nomePai: string;
  sexo: string;
  pesoAdmissao: string;
  alergias: Object;

}
