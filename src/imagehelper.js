const images = require.context('D:/Document/SD/stable-diffusion-webui/outputs/txt2img-images/', true);
const imageList = images.keys().map(image => images(image));

function ImageGallery() {
  return (
    <div>
      <h1>This is the image page!</h1>
      {imageList.map((image, index) => (
        <img key={index} src={image} alt={`image-${index}`} />
      ))}
    </div>
  );
}

export default ImageGallery;