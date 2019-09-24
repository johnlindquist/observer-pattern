import { fromEvent, pipe } from "rxjs"
import { switchMap, pluck } from "rxjs/operators"
import { ajax } from "rxjs/ajax"

const button = document.querySelector("#button")

const click$ = fromEvent(button, "click")

const switchToLuke = pipe(
  switchMap(event => ajax("https://starwars.egghead.training/people/1")),
  pluck("response")
)

switchToLuke(click$).subscribe(console.log)
