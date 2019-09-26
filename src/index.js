const source1 = callback => {
  document.addEventListener("click", callback)
}

const source2 = callback => {
  setTimeout(callback, 1000)
}

const mergeMap = customize => source1 => callback =>
  source1(event => {
    const custom = customize(event)
    custom(callback)
  })

const mergeSource2 = mergeMap(event => source2)

const newSource = mergeSource2(source1)

newSource(() => {
  console.log("timeout")
})
