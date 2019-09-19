const next = value => {
  console.log(value)
}

const observable = {
  subscribe: next => {
    next("hello")
  },
  pipe(operator) {
    return operator(this)
  }
}

const operator = observable => {
  return observable
}

observable.pipe(operator).subscribe(next)
