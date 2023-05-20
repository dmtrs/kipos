import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import Main from './Main';
import { ApolloProvider } from '@apollo/client';
import { client } from '../../apollo';

const meta = {
  title: 'Pages/Main',
  component: Main,
	args: {
		size: 'large'
	},
  decorators: [
    (Story) => (<ApolloProvider client={client}><Story /></ApolloProvider>)
  ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};