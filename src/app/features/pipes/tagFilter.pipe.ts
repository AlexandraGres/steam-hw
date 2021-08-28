import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'tagFilter'
})

export class tagFilter implements PipeTransform {
  transform(items: any[], tag: string): any[] {  
    if(!tag) {
      return items
    }
    return items.filter(item => {
      return item.tag.includes(tag)
    }) 
  }
}

