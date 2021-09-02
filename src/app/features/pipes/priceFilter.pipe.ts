import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'priceFilter'
})

export class priceFilter implements PipeTransform {
  transform(items: any[], price: string): any[] {  
    if(!price) {
      return items
    }
    return items.filter(item => {
      return +item.price <= +price
    }) 
  }
}

