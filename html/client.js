let socket = io('https://' + window.document.location.host, {secure: true})
let textArea = document.getElementById("textDiv")

socket.on('userAttr', data => {
  let attrData = JSON.parse(data)
  console.log(attrData)

  textArea.innerHTML = attrData.data;
})
