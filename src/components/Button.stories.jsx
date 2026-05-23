import Button from './Button';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: { control: { type: 'select', options: ['primary', 'secondary'] } },
        disabled: { control: 'boolean' },
    },
};

const Template = (args) => <Button {...args}>Грати</Button>;

export const Primary = Template.bind({});
Primary.args = { variant: 'primary', disabled: false };

export const Secondary = Template.bind({});
Secondary.args = { variant: 'secondary', disabled: false };

export const Disabled = Template.bind({});
Disabled.args = { variant: 'primary', disabled: true };