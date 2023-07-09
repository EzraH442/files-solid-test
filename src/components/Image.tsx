import { Component } from 'solid-js';

interface ImageComponentProps {
  src: string;
}

const ImageComponent: Component<ImageComponentProps> = ({ src }) => {
  const token = localStorage.getItem('token');
  return <img src={`${src}?token=${token}`}></img>;
};

export default ImageComponent;
