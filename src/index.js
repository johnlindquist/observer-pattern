import { fromEvent } from "rxjs"

fromEvent(document, "click")
  .pipe()
  .subscribe(value => {
    console.log(value)
  })
