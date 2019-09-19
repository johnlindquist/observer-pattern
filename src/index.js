const observer = {
  next(value) {
    console.log(`new value received`, value)
  }
}

const createSubject = subscribe => {
  let intervalObserver
  const internalSubscribe = observer => {
    intervalObserver = observer
    subscribe(observer)
  }

  return {
    subscribe: internalSubscribe,
    next: value => {
      intervalObserver.next(value)
    }
  }
}

const subscribe = observer => {
  document.addEventListener("click", observer.next)

  const unsubscribe = () => {
    document.removeEventListener("click", observer.next)
  }

  return unsubscribe
}

const subject = createSubject(subscribe)
subject.subscribe(observer)

subject.next({ message: "Hello" })
