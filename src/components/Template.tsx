import { Component, JSX } from 'solid-js';

interface TemplateProps {
  children: JSX.Element;
}
const Template: Component<TemplateProps> = (props) => {
  return <div class="m-12">{props.children}</div>;
};

export default Template;
