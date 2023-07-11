import { Component } from 'solid-js';

interface ImageComponentProps {
  src: string;
}

const ImageComponent: Component<ImageComponentProps> = ({ src }) => {
  const token = localStorage.getItem('token');
  return <img class=" h-32 w-auto" src={`${src}?token=${token}`}></img>;
};

export default ImageComponent;
