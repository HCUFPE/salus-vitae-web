import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { Medicamento } from '../../../models/medicamento.model';

@Component({
  selector: 'app-modal-aprazar',
  templateUrl: './modal-aprazar.component.html',
  styleUrls: ['./modal-aprazar.component.css']
})
export class ModalAprazarComponent implements OnInit, OnDestroy {

  //Regex Time
  //public timePattern =  {'0': { pattern: new RegExp('\[0-9\]')}};
  @Input() aprazamento: Date;
  @Input() medicamento: Medicamento;
  @Output() hideModal: EventEmitter<void> = new EventEmitter();
  @ViewChild('btnClose') btnClose: ElementRef;
  // aprazamentoForm: FormGroup;
  // timePattern = {'2': { pattern: /[0-2]/ }, '1': { pattern: /[0-1]/ }, '4': { pattern: /[0-4]/ },
  //  '5': { pattern: /[0-5]/ }, '9': { pattern: /[0-9]/ } };
  // mask = '29:59';

  constructor() { }

  ngOnInit() {
    // this.aprazamentoForm = this.formBuilder.group({
    //   hora: this.formBuilder.control('', [Validators.required, Validators.pattern(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)])
    // });

    // this.aprazamentoForm.get('hora').valueChanges.subscribe((value: string) => {
    //   if (value.charAt(0) === '2') {
    //     this.mask = '24:59';
    //   } else {
    //     this.mask = '29:59';
    //   }
    // });
  }

  getNomeRemedio() {
    if (this.medicamento) {
      let nome: string = this.medicamento.nome;

      if (this.medicamento.dosagem) {
        nome += ` - ${this.medicamento.dosagem}`;
      }

      return nome;
    }
                              
    return 'Não identificado';
  }

  close() {
    this.hideModal.emit();
  }

  confirmar() {
    let hr:string = (document.getElementById("aprazamento") as HTMLInputElement).value.trim();
    let regex = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
    
    if(hr.length==0 || hr.length==undefined){
        alert("Horário inicial campo obrigatório!");
    }else if(regex.test(hr)===false){
      alert("Horário Inválido");
    }else if (confirm('Você tem certeza sobre o aprazamento?\n\n'+"Horário Aprazado: "+hr)) {
      this.btnClose.nativeElement.click();
    }

  }

  ngOnDestroy() {
    this.btnClose.nativeElement.click();
  }

}
