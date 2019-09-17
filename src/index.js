const subject = {
  state: {
    message: "Hello"
  },
  observers: []
}

const createObserver = subject => {
  const observer = {
    subject
  }

  subject.observers.push(observer)

  return observer
}

const observer1 = createObserver(subject)
const observer2 = createObserver(subject)

console.log(subject.observers)
