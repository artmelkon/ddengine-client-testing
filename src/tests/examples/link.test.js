'use strict';

import Link from './Link';
import renderer from 'react-test-renderer';

test('Link renders correctly', () =>
{
  const tree = renderer
    .create(<Link page='https://www.facebook.com'>Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot()
});

it('renders as an anchor when no page is set', () =>
{
  const tree = renderer.create(<Link>Facebook</Link>).toJSON();
  expect(tree).toMatchSnapshot();
})
