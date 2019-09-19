const next = value => {
  console.log(value)
}

const observable = {
  subscribe: next => {
    next("hello")
  }
}

observable.subscribe(next)
