const subject = {
  state: {
    message: "Hello"
  }
}

const createObserver = subject => {
  const observer = {
    subject
  }
  return observer
}

const observer = createObserver(subject)

console.log(observer.subject.state)
