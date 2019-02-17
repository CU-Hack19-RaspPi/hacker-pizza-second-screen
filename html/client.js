let socket = io('https://' + window.document.location.host, {secure: true})

socket.on('userAttr', data => {
  let attrData = JSON.parse(data)
  console.log(attrData)
})
