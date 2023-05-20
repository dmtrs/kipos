import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import Prompt from './Prompt';
import { Layout  } from 'antd';
const { Content } = Layout;

const meta = {
  title: 'Components/Prompt',
  component: Prompt,
  decorators: [
    (Story) => (<Layout><Content><Story /></Content></Layout>)
  ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Prompt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};