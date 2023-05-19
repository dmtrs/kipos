import { ReactNode, useState } from 'react';
import { Button, Input, InputProps, Tag,   } from 'antd'
import { ImportOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import doiRegex from 'doi-regex';

type BasePromptStatus = 'error' | 'warning' | '';

interface PromptAddon {
	name: string;
	placeholder: string;
	enterButton?: ReactNode;
	onChange: (e: string) => BasePromptState;
};

export interface PromptProps {
	onPrompt?: (e: any) => void;
}

interface BasePromptProps {
	addon: PromptAddon;
	onPrompt?: (e: any) => void;
};

interface BasePromptState {
	loading: boolean;
	value: string;
	status: BasePromptStatus;
	disabled: boolean;
};

function BasePrompt({ addon, onPrompt  }: BasePromptProps) {
    const { name, placeholder, enterButton, onChange } = addon;

    const [state, setState] = useState<BasePromptState>(onChange(''));

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
            });
						if (onPrompt) onPrompt({ addon: addon.name, promot: value });
        }
    };
    const prefix = (<Tag>{ name }</Tag>);
    return (
        <Input
            prefix={prefix}
            size={"large"}
            disabled={state.loading}
            status={state?.status}
            placeholder={placeholder}
            onChange={onChangeCallback}
            onPressEnter={onSearchCallback}
            suffix={<Button
                onClick={onSearchCallback}
                size={"middle"}
                disabled={state.disabled}
                loading={state.loading}
                icon={enterButton}
                type={"primary"}
                ghost={state.disabled || state.loading}
            />}
        />
    );
}
function Prompt({ onPrompt }: PromptProps) {
    return <BasePrompt
			onPrompt={onPrompt}
      addon={{
          name:'doi',
          placeholder: 'eg. 10.48550/arXiv.2305.09667',
          enterButton: <ImportOutlined />,
          onChange: (doi: string): BasePromptState => {
              let disabled = true;
              let status:BasePromptStatus = '';
              if (doi && doiRegex({ exact: true }).test(doi)) {
                  status = '' as const;
                  disabled = false;
              } else if (doi && doiRegex().test(doi)) {
                  status = 'warning' as const;
              } else if (doi) {
                  status = 'error' as const;
              }
              return {
                  loading: false,
                  status,
                  value: doi,
                  disabled,
              }
          }
      }}
    />
}
export default Prompt;