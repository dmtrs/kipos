import { ReactNode, useState } from 'react';
import { Button, Space, Input, InputProps, Tag, Typography } from 'antd'
import { ImportOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import doiRegex from 'doi-regex';

const { Text } = Typography;

type BasePromptStatus = 'error' | 'warning' | '';

interface BasePromptState {
  loading: boolean;
  value: string;
  status: BasePromptStatus;
  disabled: boolean;
  log: string;
};

interface PromptAddon {
  name: string;
  placeholder: string;
  enterButton?: ReactNode;
  onChange: (e: string) => BasePromptState;
};

export interface PromptProps {
  state?: BasePromptState
  onPrompt?: (e: { addon: string, value: string }) => void;
};

interface BasePromptProps {
  addon: PromptAddon;
  state: BasePromptState;
  onPrompt?: (e: { addon: string, value: string }) => void;
};

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
    <Space direction="vertical" align="center">
      <Input
        prefix={prefix}
        disabled={state.loading}
        status={state?.status}
        placeholder={placeholder}
        onChange={onChangeCallback}
        onPressEnter={onSearchCallback}
        suffix={<Button
          onClick={onSearchCallback}
          disabled={state.disabled}
          loading={state.loading}
          icon={enterButton}
          type={"primary"}
          ghost={state.disabled || state.loading}
        />}
      />
    </Space>
  );
}
function Prompt({ onPrompt, state }: PromptProps) {
  return <BasePrompt
    state={state??{
      loading: false,
      disabled: false,
      value: '',
      status: '',
      log: '',
    }}
    onPrompt={onPrompt}
    addon={{
    name:'doi',
      placeholder: 'eg. 10.48550/arXiv.2305.09667',
      enterButton: <ImportOutlined />,
      onChange: (doi: string): BasePromptState => {
        let log = '';
        let disabled = true;
        let status:BasePromptStatus = '';
        if (doi && doiRegex({ exact: true }).test(doi)) {
          status = '' as const;
          disabled = false;
          log = 'Submit prompt';
        } else if (doi && doiRegex().test(doi)) {
          status = 'warning' as const;
          log = 'Value contain valid doi but invalid format, example 10.48550/arXiv.2305.09667.';
        } else if (doi) {
          status = 'error' as const;
          log = 'Value does not contain valid doi, example 10.48550/arXiv.2305.09667.';
        }
        return {
          loading: false,
          status,
          value: doi,
          disabled,
          log
        }
      },
    }}
  />
}
export default Prompt;
