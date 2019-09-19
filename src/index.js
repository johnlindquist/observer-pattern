const observer = {
  next(value) {
    console.log(`new value received`, value)
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
subject.subscribe(observer)

subject.next({ message: "Hello" })
subject.next({ message: "Goodbye" })
