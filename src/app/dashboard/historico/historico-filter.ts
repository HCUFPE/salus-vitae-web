import { PipeTransform, Pipe } from "@angular/core";
import { Operacao } from "../../models/operacao.model";

@Pipe({
    name: 'myOperacao'
})

export class ListaHistoricoPipe implements PipeTransform {
    
    transform(values: Operacao[], filtros: string) {
        if (!values || !filtros) {
            return values;
        }
        
        return values.filter(data => new Date(data.dtOperacao).toDateString()===filtros);
    }

} 