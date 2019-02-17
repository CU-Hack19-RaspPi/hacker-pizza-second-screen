let socket = io('http://' + window.document.location.host)
let textArea = document.getElementById("textDiv")

socket.on('userAttr', data => {
  let attrData = JSON.parse(data)
  console.log(attrData)

  textArea.innerHTML = attrData.data;
})
