const images = require.context('D:/Document/SD/stable-diffusion-webui/outputs/txt2img-images/', true);
const imageList = images.keys().map(image => images(image));

function ImageGallery() {
  return (
    <div>
      {imageList.map((image, index) => (
        <img key={index} src={image} alt={`${index}`} />
      ))}
    </div>
  );
}

export default ImageGallery;