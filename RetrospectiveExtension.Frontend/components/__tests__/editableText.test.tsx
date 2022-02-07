import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import EditableText, { EditableTextProps } from '../editableText';

let testText = '';
const mockOnSave = jest.fn(() => { });

const defaultTestProps: EditableTextProps = {
  text: testText,
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
    testText = 'Test Text';

    const wrapper = shallow(<EditableText {...defaultTestProps} />);
    const component = wrapper.children().dive();
    expect(toJson(component)).toMatchSnapshot();
  });
});