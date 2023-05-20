import { useState } from 'react';
import { Button, Input, InputProps, Tag } from 'antd'
import { debounce } from 'lodash';
import { BasePromptProps, BasePromptState, PromptProps } from './types.d';

import addons from './addons';

function BasePrompt({ addon, onPrompt, ...props }: BasePromptProps) {
  const { name, placeholder, enterButton, onChange } = addon;
  const [state, setState] = useState<BasePromptState>(props.state);

  const onChangeCallback: InputProps['onChange'] = debounce((e) => {
    setState(onChange(e.target.value));
  }, 400);

  const onSearchCallback = (e: any) => {
    let { status, value } = onChange(state.value);
    if (status==='' && value) {
      setState({
        loading: true,
        value,
        status,
        disabled: false,
        log: 'Loading...',
      });
      if (onPrompt) onPrompt({ addon: addon.name, value });
    }
  };
  const prefix = (<Tag>{ name }</Tag>);
  return (
		<>
      <Input
				size={props.size}
        prefix={prefix}
        disabled={state.loading}
        status={state?.status}
        placeholder={placeholder}
        onChange={onChangeCallback}
        onPressEnter={onSearchCallback}
        suffix={<Button
					size={props.size}
          onClick={onSearchCallback}
          disabled={state.disabled}
          loading={state.loading}
          icon={enterButton}
          type={"primary"}
          ghost={state.disabled || state.loading}
        />}
      />
    </>
  );
}
function Prompt({ onPrompt, state, size }: PromptProps) {
  return <BasePrompt
    state={state??{
      loading: false,
      disabled: true,
      value: '',
      status: '',
      log: '',
    }}
    onPrompt={onPrompt}
    addon={addons[0]}
		size={size}
  />
}
export default Prompt;
