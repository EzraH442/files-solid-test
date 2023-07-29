import { Component } from 'solid-js';
import MediaComponent from './Image';

interface IMediaPopupProps {
  open: boolean;
  onClose: VoidFunction;
  src?: string;
}

const MediaPopup: Component<IMediaPopupProps> = ({ open, onClose, src }) => {
  return (
    <div
      class={`${
        !open || !src ? 'hidden' : ''
      } overflow-scroll fixed top-0 left-0 right-0 z-50 w-full p-4 md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      {src && <MediaComponent src={src} className="h-full w-auto" />}

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default MediaPopup;
