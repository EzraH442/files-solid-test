import { Component, Show, For } from 'solid-js';
import { createFormGroup, IFormControl, createFormControl } from 'solid-forms';
import HCaptcha from 'solid-hcaptcha';
import { makeLoginRequest } from '../lib/requests';

import type { HCaptchaFunctions } from 'solid-hcaptcha';

interface TextInputProps {
  label: string;
  control: IFormControl<string>;
  name?: string;
  type?: string;
}

const TextInput: Component<TextInputProps> = (props) => {
  return (
    <div
      classList={{
        'is-invalid': !!props.control.errors,
        'is-touched': props.control.isTouched,
        'is-required': props.control.isRequired,
        'is-disabled': props.control.isDisabled,
      }}
    >
      <label for={props.name}>{props.label}</label>
      <input
        name={props.name}
        type={props.type ?? 'text'}
        value={props.control.value}
        oninput={(e) => {
          props.control.setValue(e.currentTarget.value);
        }}
        onblur={() => props.control.markTouched(true)}
        required={props.control.isRequired}
        disabled={props.control.isDisabled}
      />

      <Show when={props.control.isTouched && !props.control.isValid}>
        <For each={Object.values(props.control.errors!)}>
          {(item, index) => {
            return <small>{item as string}</small>;
          }}
        </For>
      </Show>
    </div>
  );
};

interface FormProps {
  onSucess: (token: string) => void;
}

const Form: Component<FormProps> = (props) => {
  let hcaptcha: HCaptchaFunctions | undefined;

  const group = createFormGroup({
    email: createFormControl(''),
    password: createFormControl(''),
  });

  const onSubmit = async () => {
    if (group.isSubmitted) return;

    if (!hcaptcha) {
      return;
    }

    const hcResponse = await hcaptcha.execute();

    group.markSubmitted(true);

    const { email, password } = group.value;

    if (!email || !password || !hcResponse) return;

    const formData = { email, password, captcha: hcResponse.response };

    const loginResponse = await makeLoginRequest(new URLSearchParams(formData));

    if (loginResponse.success) {
      props.onSucess(loginResponse.token!);
    }
  };

  return (
    <div>
      <TextInput name="email" control={group.controls.email} label="Email:" />
      <TextInput
        name="password"
        control={group.controls.password}
        label="Password:"
        type="password"
      />

      <div hidden>
        <HCaptcha
          sitekey={import.meta.env.VITE_hcaptchaSitekey}
          onLoad={(h) => {
            hcaptcha = h;
          }}
        />
      </div>
      <button onclick={onSubmit}>Submit</button>
    </div>
  );
};

export default Form;
