import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import EditableText, { EditableTextProps } from '../editableText';

let mockOnSave = jest.fn(() => { });

let defaultTestProps: EditableTextProps = {
  text: '',
  isChangeEventRequired: false,
  onSave: mockOnSave
}

describe('Editable Text Component', () => {

  it('renders correctly.', () => {
    const wrapper = shallow(<EditableText {...defaultTestProps} />);
    const component = wrapper.children().dive();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('updates text appropriately.', () => {
    let testTextProps = defaultTestProps;
    testTextProps['text'] = 'Test Text';

    const wrapper = shallow(<EditableText {...defaultTestProps} />);
    const component = wrapper.children().dive();
    expect(toJson(component)).toMatchSnapshot();
  });
});