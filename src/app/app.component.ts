import { Component } from '@angular/core';
import { Observable, range } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  source$: Observable<any> = range(0,10);

  constructor() {
    this.source$.pipe(
      map(x => x *3),
      filter(x => x % 2 === 0)
    ).subscribe(x => console.log(x));
  }

}