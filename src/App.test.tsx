import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import ButtonComponent from './components/atoms/button/button';

describe('Test on ButtonComponent', () => {

  test('onClick function', () => {

    const testOnClick = jest.fn();

    render(<ButtonComponent filterFunction={testOnClick} active={true} label={'Test Button'} />);

    const button = screen.getByText('Test Button');

    fireEvent.click(button);

    expect(testOnClick).toHaveBeenCalled();

  });

});
