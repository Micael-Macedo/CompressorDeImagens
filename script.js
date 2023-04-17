ratio = document.getElementById("ratio")
width = document.querySelector("#width")
height = document.querySelector("#height")
file = document.querySelector("#file")
quality = document.getElementById("quality")
ImageWitdh = 0
ImageHeight = 0
imageSrc = ""
fileName = ""
file.addEventListener("change", (e) => {
    let userFile = e.target.files[0]
    fileName = userFile.name;
    fileName = fileName.split(".")
    fileName = fileName[0]
    let fileReader = new FileReader()
    fileReader.onload = () =>{
        src = fileReader.result
        let image = document.createElement("img")
        image.src = src
        imageSrc = src
        image.id = "fileImage"
        image.onload = () => {
            console.log(image)
            width.value = image.width
            ImageWidth = image.width
            height.value = image.height
            ImageHeight = image.height
            $(".drop-content").empty()
            $(".drop-content").append(image)
        }
        
    }
    fileReader.readAsDataURL(userFile);
})
ratio.addEventListener("change", verificarRatio)
quality.addEventListener("change", verificarQuality)
width.addEventListener("change", changeHeight)

function verificarRatio() {
    if(this.checked === true){
        $("#height").prop("disabled", true) 
        changeHeight()  
    }else{
        $("#height").prop("disabled", false)   
    }
}
function changeHeight(){
    let InputWidth = parseFloat(width.value)
    console.log(InputWidth)
    if(ratio.checked === true){
        height.value = (InputWidth * ImageHeight) / ImageWidth 
    }
}

function verificarQuality() {
    return quality.checked;
}

function returnOriginalSize() {
    width.value = ImageWidth
    height.value = ImageHeight
}
function baixarImagem() {
    let image = document.createElement("img")
    image.src = imageSrc
    let checkQuality = 0

    if(quality.checked === true){
        checkQuality = 1
    }else{
        checkQuality = 0.7
    }
    console.log(checkQuality)
    let canvas = document.createElement("canvas");
    canvas.width = parseFloat(width.value)
    canvas.height = parseFloat(height.value)
    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height)

    let new_image = document.createElement("img")
    let new_image_url = context.canvas.toDataURL("image/jpeg", checkQuality)
    new_image.src = new_image_url
    
    let linkFile = document.createElement("a");
    linkFile.href = new_image_url
    linkFile.target = "_blank"
    linkFile.download = `${fileName}${canvas.width }x${canvas.height}.png`
    linkFile.click();



}