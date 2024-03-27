export function onChangeNumber(
  callback: (event: React.ChangeEvent<HTMLInputElement>) => void,
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    // Remove non-numeric characters using regular expression
    value = value.replace(/\D/g, '')

    const modifiedEvent = Object.assign({}, e, {
      target: Object.assign({}, e.target, {
        value: value,
      }),
    })

    // Call the callback function with the filtered value
    callback(modifiedEvent)
  }
}
