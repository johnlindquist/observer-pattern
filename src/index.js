const observer = {
  notify(value) {
    //notify is named `next` in RxJS
    console.log(`new value received`, value)
  }
}

const createObservable = observer => {
  observer.notify({ message: "hello" })
}

const observable = createObservable(observer)
