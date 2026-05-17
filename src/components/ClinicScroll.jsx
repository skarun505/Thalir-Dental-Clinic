import React from 'react';
import { img } from '../lib/getImagePath';

const images = [
  '1.svg',
  '2.svg',
  '3.svg',
  '4.svg',
  '4b.svg',
  '6.svg',
  '7b.svg',
  '8.svg',
  '8b.svg',
  '9.svg',
  '10.svg',
  '11.svg',
];

export default function ClinicScroll() {
  return (
    <div className="clinic-scroll-wrapper" style={{ padding: '2rem 0' }}>
      <div className="infinity-scroll-container">
        <div className="infinity-scroll-track">
          {images.map((image, index) => (
            <div className="scroll-image-card" key={`img1-${index}`}>
              <img src={img(`/images-optimized/no-cavity/${image}`)} alt={`Clinic patient ${index + 1}`} loading="lazy" />
            </div>
          ))}
          {/* Duplicate for seamless infinite scrolling */}
          {images.map((image, index) => (
            <div className="scroll-image-card" key={`img2-${index}`}>
              <img src={img(`/images-optimized/no-cavity/${image}`)} alt={`Clinic patient ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
