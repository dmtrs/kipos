import { ImportOutlined } from '@ant-design/icons';
import doiRegex from 'doi-regex';

import { BasePromptState, BasePromptStatus } from "../types.d";

const addon = {
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
		};
	},
};

export default addon;