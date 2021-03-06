import TestRenderer from 'react-test-renderer';

function Link(props)
{
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="http://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
