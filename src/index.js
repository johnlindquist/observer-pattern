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
  let intervalObserver

  return {
    subscribe: observer => {
      intervalObserver = observer
    },
    next: value => {
      intervalObserver.next(value)
    }
  }
}

const subject = createSubject()
subject.subscribe(oneObserver)
subject.subscribe(twoObserver)

subject.next({ message: "Hello" })
subject.next({ message: "Goodbye" })
