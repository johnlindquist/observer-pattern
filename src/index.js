const subject = {
  state: {
    message: "Hello"
  },
  observers: [],
  update(value) {
    this.state = value
    this.observers.forEach(observer => {
      observer.notify()
    })
  }
}

const createObserver = subject => {
  const observer = {
    subject,
    notify() {
      console.log("State updated to", this.subject.state)
    }
  }

  subject.observers.push(observer)
  return observer
}

const observer1 = createObserver(subject)
const observer2 = createObserver(subject)

subject.update({ message: "Goodbye" })
