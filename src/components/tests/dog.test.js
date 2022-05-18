import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GET_DOG_QUERY, Dog } from '../dog';

const mocks = [];

it('readers without err', () =>
{
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>
  );

  const tree = component.toJSON();
  expect(tree.children).toContain('Loading...');
})
