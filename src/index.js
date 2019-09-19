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

const createSubject = () => {
  let observers = []

  return {
    subscribe: observer => {
      observers.push(observer)
    },
    next: value => {
      observers.forEach(observer => {
        observer.next(value)
      })
    }
  }
}

const subject = createSubject()
subject.subscribe(oneObserver)
subject.subscribe(twoObserver)

subject.next({ message: "Hello" })
subject.next({ message: "Goodbye" })
