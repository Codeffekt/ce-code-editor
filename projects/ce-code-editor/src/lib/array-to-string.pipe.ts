import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "arrayToString"
})
export class StringArrayToStringPipe implements PipeTransform {
    transform(input: string[], sep = ","): string {
        return input.join(sep);
    }
}