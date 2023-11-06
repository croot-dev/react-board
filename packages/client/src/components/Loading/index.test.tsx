import { render, screen } from '@testing-library/react';
import LoadingComponent from './index';
import 'isomorphic-fetch';

window.alert = jest.fn();

describe('password confirm component', () => {
  it('render', () => {
    render(<LoadingComponent />);
    const image = screen.getByAltText('loading');
    expect(image).toBeInTheDocument();
  });
});
