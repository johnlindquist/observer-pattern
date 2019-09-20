import { fromEvent, of } from "rxjs"

const hi = of("hi")

const click = fromEvent(document, "click")

click
  .pipe(observable => {
    return hi
  })
  .subscribe(value => {
    console.log(value)
  })
