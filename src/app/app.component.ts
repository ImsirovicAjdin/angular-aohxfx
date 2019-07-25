import { Component } from '@angular/core';
import { Observable, range } from 'rxjs'; // (1)
import { map, filter } from 'rxjs/operators'; // (2)

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  source$: Observable<any> = range(0,10); // (3)
  // ^^(4)
  constructor() {
    this.source$.pipe( // (5)
      map(x => x *3),
      filter(x => x % 2 === 0)
    ).subscribe(x => console.log(x)); // (6)
  }

}
/*
(1) RxJS has two primary packages we use to import functionality. Observable and the observable creation methods, such as range, can be found in the rxjs package. 
(2) We import the operators from rxjs/operators. 
(3) We use the range creation method to create an observable stream of numbers from 0 to 9. 

(4) By convention, we add a dollar suffix to the variables that hold an observable. This makes it easier to quickly distinguish the observables in our code, and we declare its type as an observable stream of numbers using the generic argument.

(5)  We use the pipe method to pipe this observable stream through several operators, map and filter. We only include two operators here, but we can define any number of operators, separated by commas. This map operator takes each number emitted into the observable stream, 0 through 9, and multiplies it by 3, which results in an observable with 0, 3, 6, 9, and so on. As each number is emitted by the map operator, this filter operator filters the result to only the even numbers in the sequence. That is, those that when divided by 2 have a remainder of 0. 

(6) Here we subscribe to the resulting observable to start receiving emitted values. The observable source does not emit any values until it has a subscriber. So, subscribing is key. What do you think will be logged to the console? Let's see how we got that result. The source emits 0, the 0 is multiplied by 3, resulting in 0. The 0 is divided by 2 with the remainder of 0, so it is included in the final result. The source then emits 1. The 1 is multiplied by 3, resulting in 3. The 3 is divided by 2, with a remainder of 1, so it is not included in the final result, and so on. Notice that each item in the sequence is processed through the pipeable operators as it is emitted. 

You may have worked with asynchronous data in JavaScript previously using promises. Observables are different from promises in several ways. A promise returns a single future value. An observable emits multiple asynchronous values over time. A promise is not lazy. By the time you have a promise, it's on its way to being resolved. An observable is lazy by default. Observables will not emit values until they are subscribed to. A promise is not cancelable, it is resolved or rejected, and only once. An observable can be canceled by unsubscribing, plus an observable supports map, filter, reduce, and similar operators. In this module, we'll do HTTP using observables.
*/