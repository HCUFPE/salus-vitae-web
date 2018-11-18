import { ItemPrescricao } from './../../../models/item-prescricao.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Prontuario } from '../../../models/prontuario.model';
import { ProntuariosService } from '../prontuarios.service';
import { Prescricao } from '../../../models/prescricao.model';
import { MedicamentosService } from '../medicamentos.service';
import { Medicamento } from '../../../models/medicamento.model';
import { Aprazamento } from 'src/app/models/aprazamento.model';
import { stringify } from 'querystring';

@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.css']
})
export class ProntuarioComponent implements OnInit {
  dados : boolean = false;
  prontuario: Prontuario;
  prescricao: Prescricao;
  aprazamentos: Aprazamento[];
  filtro: string;
  modalMedicamento: Medicamento;
  codigosItem: string[];

  constructor(private route: ActivatedRoute, private prontuarioService: ProntuariosService,
    private medicamentoService: MedicamentosService) { }

  ngOnInit() {
    this.prontuarioService.prontuariosById(this.route.snapshot.params['id'])
    .subscribe((prontuario: Prontuario) => {
      this.prontuario = prontuario;
      this.prescricao = this.getUltimaPrescricao();
      this.prescricao.Itens.forEach(ItemPrescricao => {
        this.codigosItem.push(ItemPrescricao.codigoItem);
      });
      this.medicamentoService.itensById(this.codigosItem)
      .subscribe((itemPrescricao: ItemPrescricao) => {
        const index = this.prescricao.Itens.indexOf(itemPrescricao);
        this.prescricao.Itens[index] = itemPrescricao;
      });
    });

    this.aprazamentos = [];
  }

  getUltimaPrescricao() {
    if (!this.prontuario || !this.prontuario.prescricoes) {
      return null;
    }

    return this.prontuario.prescricoes.sort((a: Prescricao, b: Prescricao) => {
      if (a.dataPrescricao > b.dataPrescricao) {
        return -1;
      }

      if (a.dataPrescricao < b.dataPrescricao) {
        return 1;
      }

      return 0;
    })[0];
  }

  isAprazado(medicamento: Medicamento) {
    return this.aprazamentos.filter(a => a.medicamento._id === medicamento._id).length > 0;
  }

  getMedicamentos() {
    const prescricao: Prescricao = this.getUltimaPrescricao();

    if (!prescricao || !prescricao.Itens) {
      return [];
    }

    return prescricao.medicamentos;
  }

  showModal(medicamento: Medicamento) {
    this.modalMedicamento = medicamento;
  }

  dismissModal(aprazamento) {
    this.aprazamentos.push(aprazamento);

    this.modalMedicamento = undefined;
  }

  escApra(apr2){
    this.dados=false;
  }

  escDet(apr1){
    this.dados=true;
  }

}
