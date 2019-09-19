const oneObserver = {
  next(value) {
    console.log(`one`, value)
  }
}

const twoObserver = {
  next(value) {
    console.log(`two`, value)
  }
}

const createObservable = subscribe => {
  return {
    subscribe
  }
}

const subscribe = observer => {
  document.addEventListener("click", observer.next)

  const unsubscribe = () => {
    document.removeEventListener("click", observer.next)
  }

  return unsubscribe
}

const createSubject = () => {
  let observers = []

  return {
    subscribe: observer => {
      observers.push(observer)

      const unsubscribe = () => {
        const index = observers.indexOf(observer)
        observers.splice(index, 1)
      }

      return unsubscribe
    },
    next: value => {
      observers.forEach(observer => {
        observer.next(value)
      })
    }
  }
}

const subject = createSubject()
const observable = createObservable(subscribe)

subject.subscribe(oneObserver)
subject.subscribe(twoObserver)
observable.subscribe(subject)
