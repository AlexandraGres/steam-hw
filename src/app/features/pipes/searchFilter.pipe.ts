import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'searchFilter'
})

export class searchFilter implements PipeTransform {
  transform(items: any[], search: string): any[] {
    if(!search.trim()) {
      return items
    }

    return items.filter(item => {
      if(!item.name) {
        return item.username.toLowerCase().includes(search.toLowerCase())
      }
      return item.name.toLowerCase().includes(search.toLowerCase())
    }) 
  }
}

