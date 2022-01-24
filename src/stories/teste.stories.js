import teste from './teste.vue'
import './teste.css'
export default {
  title: 'Components/teste',
  component: teste
}

const Template = (args, { argTypes }) => ({
  components: { teste },
  props: Object.keys(argTypes),
  template: '<teste />',
  argTypes: { onClick: { action: 'dispatchFunction' } }
})

export const Primary = Template.bind({})
Primary.args = {
  Primary: true
}

export const Secondary = Template.bind({})
Secondary.args = {
  Primary: false
}
export const Red = Template.bind({})
Red.args = {}
