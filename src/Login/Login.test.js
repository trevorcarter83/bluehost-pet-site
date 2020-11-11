import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import TextField from '@material-ui/core/TextField';

it("renders without crashing", () => {
    shallow(<Login />);
  });

  it("renders a form", () => {
    const wrapper = shallow(<Login />);
    const form = 'form';
    expect(wrapper.find(form).exists()).toEqual(true);
  });

  it("renders a text field", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.containsMatchingElement(<TextField />)).toEqual(true);
  });