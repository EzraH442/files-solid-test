import { Component } from 'solid-js';
import { isImage, isVideo } from '../lib/util';
interface ImageComponentProps {
  src: string;
  className: string;
}

const MediaComponent: Component<ImageComponentProps> = ({ src, className }) => {
  const token = localStorage.getItem('token');
  const alt = `Could not display file: ${src}`;

  const getComponent = () => {
    if (isImage(src))
      return <img class={className} src={`${src}?token=${token}`} alt={alt} />;
    else if (isVideo(src))
      return <video class={className} src={`${src}?token=${token}`} />;

    return <img alt={alt} src="" />;
  };

  return <>{getComponent()}</>;
};

export default MediaComponent;
