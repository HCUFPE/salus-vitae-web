import { PipeTransform, Pipe } from "@angular/core";
import { Prontuario } from '../../../models/prontuario.model';

@Pipe({
    name: 'myFilter'
})

export class ListaProntuariosPipe implements PipeTransform {
    
    transform(values: Prontuario[], filtro: any) {
        if (!values || !filtro) {
            return values;
        }
        
        return values.filter(data => data.nomeDoPaciente.toLowerCase().indexOf(filtro.toLowerCase()) !== -1 
        || data.nomeMae.toLowerCase().indexOf(filtro.toLowerCase()) !== -1 
        || data.prontuario.toString().indexOf(filtro)!==-1);
    }

} 