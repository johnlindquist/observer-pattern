const next = value => {
  console.log(value)
}

const observable = {
  subscribe: next => {
    next("hello")
  },
  pipe(...operators) {
    return operators.reduce((observable, fn) => {
      return fn(observable)
    }, this)
  }
}

const operator = observable => {
  return observable
}

observable
  .pipe(
    operator,
    operator,
    operator
  )
  .subscribe(next)
