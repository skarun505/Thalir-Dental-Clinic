import React from 'react';
import { img } from '../lib/getImagePath';

const images = [
  'IMG_3128.JPG',
  'IMG_5653.jpg',
  'IMG_5676.jpeg',
  'IMG_5817.jpeg',
  'IMG_5935.jpeg',
  'IMG_6180.jpeg',
  'IMG_6410.jpeg',
  'IMG_7211.jpg',
  'IMG_7603.JPG.jpeg',
  'IMG_7993.JPG.jpeg',
  'IMG_8013.JPG.jpeg',
  'IMG_8075.jpg'
];

export default function ClinicScroll() {
  return (
    <div className="clinic-scroll-wrapper" style={{ padding: '2rem 0' }}>
      <div className="infinity-scroll-container">
        <div className="infinity-scroll-track">
          {images.map((image, index) => (
            <div className="scroll-image-card" key={`img1-${index}`}>
              <img src={img(`/images/clinic/${image}`)} alt={`Clinic patient ${index + 1}`} loading="lazy" />
            </div>
          ))}
          {/* Duplicate for seamless infinite scrolling */}
          {images.map((image, index) => (
            <div className="scroll-image-card" key={`img2-${index}`}>
              <img src={img(`/images/clinic/${image}`)} alt={`Clinic patient ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
