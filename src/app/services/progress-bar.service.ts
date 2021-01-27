import { Injectable } from '@angular/core';
import { interval, NEVER, Observable, Subject } from 'rxjs';
import { Counter } from '../helpers/counter';

import {map, scan, startWith, switchMap} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private counterSubject:Subject<Counter>=new Subject();

  constructor() { }


  initInterval(duration:number):Observable<Counter>{
    return this.counterSubject.pipe(
      startWith({pause:false,counterValue:0}),
      scan((acc,val)=>({...acc,...val})),
      switchMap((state)=>state.pause  ? NEVER : interval(duration).pipe(map(()=>{
        state.counterValue+=1;
        return state;
      })))
    );
  }

  pauseCounter(){
    this.counterSubject.next({pause:true});
  }
  resumeCounter(){
    this.counterSubject.next({pause:false});
  }

}
