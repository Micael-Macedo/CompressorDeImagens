let ratio = document.getElementById("ratio").checked
let width = document.querySelector("#width").value
let height = document.querySelector("#height")
let file = document.querySelector("#file")
let quality = document.getElementById("quality").checked

file.addEventListener("change", (e) => {
    let userFile = e.target.files[0]
    let fileReader = new FileReader()
    fileReader.onload = () =>{
        let src = fileReader.result;
        canvasImage(src)
    }
    fileReader.readAsDataURL(userFile);
})


function canvasImage(source) {
    let image = document.createElement("img")
    image.src = source
    image.onload = (event) =>{
        
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height)

    }

    console.log(ratio)
    console.log(quality)
    
    canvas.width = width.nodeValue()

    context.drawImage(source, 0, 0, canvas.width, canvas.height)
}