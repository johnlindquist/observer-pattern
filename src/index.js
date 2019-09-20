import { fromEvent } from "rxjs"

const operator = observable => {
  observable.subscribe(value => {
    console.log("hi")
  })

  return observable
}

const click = fromEvent(document, "click").pipe(operator)

click.subscribe(value => {
  console.log(value)
})
