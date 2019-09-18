const observer = {
  //Renamed `notify` to `next` to match RxJS
  next(value) {
    console.log(`new value received`, value)
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

const observable = createObservable(subscribe)

const unsubscribe = observable.subscribe(observer)
//unsubscribe
