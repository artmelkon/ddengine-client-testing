import { render, screen } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';

describe('TestRenderer initial test', () =>
{
  it('should confirm is jest in the body', () =>
  {
    // TestRenderer.create(
    //   <MockedProvider>
    //     <App />
    //   </MockedProvider>
    // );
    render(<App />);
    const textHeading = screen.getByText(/jest/i);
    expect(textHeading).toBeInTheDocument();
  })
})
