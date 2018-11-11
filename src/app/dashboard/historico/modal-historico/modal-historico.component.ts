import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Consumo } from '../../../models/consumo.model';
import { HistoricoService } from '../historico.service';

@Component({
  selector: 'app-modal-historico',
  templateUrl: './modal-historico.component.html',
  styleUrls: ['./modal-historico.component.css']
})
export class ModalHistoricoComponent implements OnInit {
  historico:Consumo;
  @Output() hideModal: EventEmitter<Consumo> = new EventEmitter();
  @ViewChild('btnClose') btnClose: ElementRef;
  constructor(private historicoService:HistoricoService) { }

  ngOnInit() {
  }

  close() {
    this.hideModal.emit(this.historico);
  }

  ngOnDestroy() {
    this.btnClose.nativeElement.click();
  }

}
