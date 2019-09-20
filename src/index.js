import { fromEvent } from "rxjs"

const operator = observable => {
  const newObservable = {
    //1. Create a new Observable
    subscribe: next => {
      observable.subscribe(value => {
        //2. Subscribe to the original
        next("hi") //3. Pass a different value to `next`
      })
    }
  }

  return newObservable
}

const click = fromEvent(document, "click").pipe(operator)

click.subscribe(value => {
  console.log(value)
})
