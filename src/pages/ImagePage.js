import React from 'react';
//import image from 'D:/Document/SD/stable-diffusion-webui/outputs/txt2img-images/images'
// function importAll(r) {
// 	let images = {};
//   r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
// 	return images
// }

// const images = importAll(require.context('D:/Document/SD/stable-diffusion-webui/outputs/txt2img-images/', false, /\.(png|jpe?g|svg)$/));

// const ImageGallery = ({ number, suit }) => {
//   const combo = (number) ? `${number}${suit}` : 'red_back';

//   return (
// 		<img src={images[`${combo}.png`].default} alt={combo} height={150} width={150}/>
//   );
// }

// <img src={images} />

// export default ImageGallery

const images = require.context('D:/Document/SD/stable-diffusion-webui/outputs/txt2img-images/', true);
const imageList = images.keys().map(image => images(image));

function ImageGallery() {
  return (
    <div>
      {imageList.map((image, index) => (
        <img key={index} src={image} alt={`image-${index}`} />
      ))}
    </div>
  );
}

export default ImageGallery;