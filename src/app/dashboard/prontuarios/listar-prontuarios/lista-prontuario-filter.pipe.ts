import { PipeTransform, Pipe } from '@angular/core';

import { Leito } from 'src/app/models/leito.model';

@Pipe({
    name: 'myFilter'
})

export class ListaProntuariosPipe implements PipeTransform {

    transform(values: Leito[], filtro: any) {
        if (!values || !filtro) {
            return values;
        }

        return values.filter(data => data.pacienteInternado !== undefined &&
        (data.pacienteInternado.nomeDoPaciente.toLowerCase().indexOf(filtro.toLowerCase()) !== -1
        || data.pacienteInternado.nomeMae.toLowerCase().indexOf(filtro.toLowerCase()) !== -1
        || data.pacienteInternado.prontuario.toString().indexOf(filtro) !== -1));
    }

}
