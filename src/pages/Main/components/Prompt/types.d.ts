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

export interface BasePromptProps {
  addon: PromptAddon;
  state: BasePromptState;
  onPrompt?: (e: { addon: string, value: string }) => void;
};
