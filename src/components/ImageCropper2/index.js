import React, { useCallback, useEffect, useState } from 'react';
import './index.scss';
import {
  RotateLeftIcon,
  RotateRightIcon,
  TickSquareButton,
  TrashSquareButton,
  ZoomInIcon,
  ZoomOutIcon,
} from '../../assets/svgs';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './utils';
import { gcd } from '../../utils/helper';

const ZOOM_STEP = 0.1;
const ROTATION_STEP = 10;


export const ImageCropper2 = ({
  src,
  onCancel,
  isPreviewMode2,
  onSave,
  setLoading2,
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(9);

  const resetCropper = useCallback(() => {
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
    setCroppedAreaPixels(null);
  }, []);

  useEffect(() => {
    setRotation(rotation + ROTATION_STEP);
    setRotation((rotation) => rotation - ROTATION_STEP);
    setTimeout(() => {
      setImageSrc(src);
    }, 500);
  }, [src]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      return await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onImageLoad = useCallback((value) => {
    document.documentElement.style.setProperty('--width', `${value.width}px`);
    let ratio = gcd(value.width, value.height);
    setWidth(value.width / ratio);
    setHeight(value.height / ratio);
  }, []);

  

  return (
    <div className={'image__cropper'}>
      <div className={'action-toolbar'}>
        <div
          onClick={() => {
            onCancel();
            resetCropper();
          }}
        >
          <TrashSquareButton />
        </div>
        {!isPreviewMode2 && (
          <div
            onClick={async () => {
              setLoading2(true);
              let url = await showCroppedImage();
              setLoading2(false);
              onSave(url);
              setImageSrc(url);
              resetCropper();
            }}
          >
            <TickSquareButton />
          </div>
        )}
      </div>
      <div className={'crop-container'}>
        <Cropper
          onMediaLoaded={!isPreviewMode2 ? onImageLoad : ''}
          image={imageSrc}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          classes={{
            containerClassName: isPreviewMode2 ? 'no-scroll-zoom' : '',
            cropAreaClassName: isPreviewMode2 ? 'hidden' : '',
            mediaClassName: isPreviewMode2 ? 'no-edit' : '',
          }}
          aspect={width/height}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      {!isPreviewMode2 && (
        <div className={'action-toolbar bottom'}>
          <div
            onClick={() => {
              setZoom(zoom - ZOOM_STEP);
            }}
          >
            <ZoomOutIcon />
          </div>
          <div
            onClick={() => {
              setZoom(zoom + ZOOM_STEP);
            }}
          >
            <ZoomInIcon />
          </div>
          <div
            onClick={() => {
              setRotation(rotation - ROTATION_STEP);
            }}
          >
            <RotateLeftIcon />
          </div>
          <div onClick={() => setRotation(rotation + ROTATION_STEP)}>
            <RotateRightIcon />
          </div>
        </div>
      )}
    </div>
  );
};
ImageCropper2.propTypes = {
  onCancel: () => {},
  onSave: () => {},
  src: '',
};
