import { Observable } from "rxjs"

//## Creation Operators

const creationOperatorTemplate = config => {
  const source = new Observable(observer => {
    //Use observer to next, complete, error
    return () => {
      //unsubscribe logic
    }
  })

  return source
}

//of
const of = value => {
  const source = new Observable(observer => {
    observer.next(value)
    observer.complete()
  })

  return source
}

of("hello").subscribe(console.log)

//fromEvent
const fromEvent = (target, eventType) => {
  const source = new Observable(observer => {
    const next = observer.next.bind(observer)
    target.addEventListener(eventType, next)

    return () => {
      target.removeEventListener(eventType, next)
    }
  })

  return source
}

//interval
const interval = delay => {
  const source = new Observable(observer => {
    const next = observer.next.bind(observer)

    let i = 0
    const callback = () => {
      next(i++)
    }
    const id = setInterval(callback, delay)

    return () => {
      console.log("clear")
      clearInterval(id)
    }
  })

  return source
}

const click = fromEvent(document, "click")

//merge
const merge = (...observables) => {
  const source = new Observable(observer => {
    const next = observer.next.bind(observer)
    const complete = observer.complete.bind(observer)
    const error = observer.error.bind(observer)

    let active = observables.length

    const subscriptions = observables.map(observable => {
      const newObserver = {
        next,
        error,
        complete: () => {
          active--
          if (active === 0) {
            complete()
          }
        }
      }

      const subscription = observable.subscribe(newObserver)

      return subscription
    })

    return () => {
      subscriptions.forEach(subscription => {
        subscription.unsubscribe()
      })
    }
  })

  return source
}

// merge(of("merge"), interval(1000)).subscribe(console.log)

//copy/paste this as a starter for new operators
const operatorTemplate = config => source => {
  const newSource = new Observable(observer => {
    //Use `config` here to do whatever you need
    const newObserver = {
      next: value => {
        observer.next(value)
      }
    }
    source.subscribe(newObserver)
  })

  return newSource
}

//mapTo
const mapTo = value => source => {
  const newSource = new Observable(observer => {
    const newObserver = {
      next: () => {
        observer.next(value)
      }
    }
    source.subscribe(newObserver)
  })

  return newSource
}

// click.pipe(mapTo("hello")).subscribe(console.log)

//map
const map = fn => source => {
  const newSource = new Observable(observer => {
    const newOperator = {
      next: value => {
        const mappedValue = fn(value)
        observer.next(mappedValue)
      }
    }
    source.subscribe(newOperator)
  })

  return newSource
}

// click.pipe(map(event => event.target)).subscribe(console.log)

//filter
const filter = fn => source => {
  const newSource = new Observable(observer => {
    const newOperator = {
      next: value => {
        if (fn(value)) {
          observer.next(value)
        }
      }
    }
    source.subscribe(newOperator)
  })

  return newSource
}

// click.pipe(filter(event => event.x > 200)).subscribe(console.log)

const combineLatest = (...observables) => {
  return new Observable(observer => {
    const waiting = Symbol("waiting")
    const values = Array.from({ length: observables.length }).fill(waiting)

    const subscriptions = observables.map((observable, i) => {
      const subscription = observable.subscribe(value => {
        values[i] = value
        if (values.every(value => value !== waiting)) {
          observer.next(values)
        }
      })

      return subscription
    })

    return () => {
      subscriptions.forEach(subscription => {
        subscription.unsubscribe()
      })
    }
  })
}

combineLatest(click, interval(500)).subscribe(console.log)
