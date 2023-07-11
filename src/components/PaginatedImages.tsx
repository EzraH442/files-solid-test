import { Component, createSignal } from 'solid-js';

import {
  HiSolidChevronDoubleLeft,
  HiSolidChevronDoubleRight,
  HiSolidChevronLeft,
  HiSolidChevronRight,
} from 'solid-icons/hi';
import ImageComponent from './Image';

interface IFile {
  name: string;
  id: string;
}

interface IPaginatedImagesProps {
  files: IFile[];
}

const PaginatedImages: Component<IPaginatedImagesProps> = ({ files }) => {
  const max = Math.trunc(files.length / 100);
  const [page, setPage] = createSignal(0);

  const setStart = () => {
    setPage(0);
  };

  const setEnd = () => {
    setPage(max);
  };

  const inc = () => {
    if (page() + 1 <= max) {
      setPage(page() + 1);
    }
  };

  const dec = () => {
    if (page() - 1 >= 0) {
      setPage(page() - 1);
    }
  };

  return (
    <div>
      <div class="flex">
        <HiSolidChevronDoubleLeft size={24} onclick={setStart} />
        <HiSolidChevronLeft size={24} onclick={() => dec()} />
        <p>{`Page ${page() + 1} of ${max + 1}`}</p>
        <HiSolidChevronRight size={24} onclick={() => inc()} />
        <HiSolidChevronDoubleRight size={24} onclick={setEnd} />
      </div>
      <div class="flex flex-wrap">
        {files
          .filter(
            (f, i) =>
              Math.trunc(i / 100) < page() + 1 &&
              Math.trunc(i / 100) > page() - 1,
          )
          .map((file, i) => (
            <div class="p-1">
              <ImageComponent
                src={`https://static.ezrahuang.com/file/ezrah442-testing/${file.name}`}
              />
            </div>
          ))}
      </div>
      <div class="flex">
        <HiSolidChevronDoubleLeft size={24} onclick={setStart} />
        <HiSolidChevronLeft size={24} onclick={() => dec()} />
        <p>{`Page ${page() + 1} of ${max + 1}`}</p>
        <HiSolidChevronRight size={24} onclick={() => inc()} />
        <HiSolidChevronDoubleRight size={24} onclick={setEnd} />
      </div>
    </div>
  );
};

export default PaginatedImages;
