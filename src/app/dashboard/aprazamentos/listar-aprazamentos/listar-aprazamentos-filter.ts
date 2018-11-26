import { PipeTransform, Pipe } from "@angular/core";
import { PreOperacao } from '../../../models/pre-operacao.model';

@Pipe({
    name: 'myOperacao'
})

export class ListaPreOperacaoPipe implements PipeTransform {
    
    transform(values: PreOperacao[], filtros: string) {
        if (!values || !filtros) {
            return values;
        }
        
        return values.filter(data => new Date(data.dtPreOpAprazamento).toDateString()===filtros);
    }

} 