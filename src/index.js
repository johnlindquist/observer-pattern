const observer = {
  notify(value) {
    console.log(`new value received`, value)
  }
}

const createObservable = subscribe => {
  return {
    subscribe
  }
}

const subscribe = observer => {
  document.addEventListener("click", observer.notify)

  const unsubscribe = () => {
    document.removeEventListener("click", observer.notify)
  }

  return unsubscribe
}

const observable = createObservable(subscribe)

const unsubscribe = observable.subscribe(observer)
//unsubscribe
