import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from './CodeBlock';

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock
};

const LiveCodeEditor = props => {
  return (
    <MDXProvider components={components}>
      <div {...props} />
    </MDXProvider>
  );
};

export default LiveCodeEditor;
