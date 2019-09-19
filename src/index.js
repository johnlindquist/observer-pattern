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
const oneUnsubscribe = subject.subscribe(oneObserver)
const twoUnsubscribe = subject.subscribe(twoObserver)

subject.next({ message: "Hello" })
oneUnsubscribe()
subject.next({ message: "Goodbye" })
