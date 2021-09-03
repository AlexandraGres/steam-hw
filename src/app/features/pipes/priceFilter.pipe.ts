import { Pipe, PipeTransform } from "@angular/core";
import { Game } from "../models";

@Pipe({
  name: 'priceFilter'
})

export class priceFilter implements PipeTransform {
  transform(items: Game[], price: string): Game[] {  
    if(!price) {
      return items
    }
    return items.filter(item => {
      return +item.price <= +price
    }) 
  }
}

