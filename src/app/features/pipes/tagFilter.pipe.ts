import { Pipe, PipeTransform } from "@angular/core";
import { Game } from "../models";

@Pipe({
  name: 'tagFilter'
})

export class tagFilter implements PipeTransform {
  transform(items: Game[], tag: string): Game[] {  
    if(!tag) {
      return items
    }
    return items.filter(item => {
      return item.tag.includes(tag)
    }) 
  }
}

