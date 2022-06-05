import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Highlight, { defaultProps } from 'prism-react-renderer';
import githubTheme from 'prism-react-renderer/themes/github';
import * as Ramda from 'ramda';
import * as Lodash from 'lodash-es';
import prettier from 'prettier';
import babelParser from 'prettier/parser-babel';

const CodeBlock = ({ children, className, live, render, noInline = false }) => {
  const language = className.replace(/language-/, '');
  console.log(language);

  const transform = obj => {
    const values = Object.entries(obj).reduce((acc, [k, v]) => {
      let value;

      switch (typeof v) {
        case 'boolean':
        case 'number':
          value = `{${v}}`;
          break;
        case 'string':
          value = `"${v}"`;
          break;
        case 'object':
          value = `{${JSON.stringify(v)}}`;
          // value = Array.isArray(v) ? `{${JSON.stringify(v)}}` : `{${JSON.stringify(v)}}`;
          break;
      }

      acc.push(`${k}=${value}`);

      return acc;
    }, []);

    return values;
    // return values.sort().join(' ');
  };

  if (live) {
    // const importMatches = children.match(/import.*/g) || [];
    // children.replace(/import.*/g, '').trim()
    // mdx
    // pragma and pragmaFrag cannot be set when runtime is automatic
    const match = children.match(/Menu[^/>]*/);
    let result = '';

    if (match) {
      const values = match[0].match(/[A-Za-z0-9]*=[^ ]*/g);
      const valuesToKeep = [];

      values.forEach(value => {
        const key = value.split('=')[0];

        if (!myPropsObj[key]) {
          valuesToKeep.push(value);
        }
      });

      const isHandlerPropKey = propKey => {
        if (propKey.substr(0, 2) === 'on') {
          return true;
        }

        if (propKey[2] && propKey[2] === propKey[2].toUpperCase()) {
          return true;
        }

        return false;
      };

      result = [...transform(myPropsObj), ...valuesToKeep]
        .sort((a, b) => {
          const aIsHandler = isHandlerPropKey(a);
          const bIsHandler = isHandlerPropKey(b);

          if ((!aIsHandler && a > b) || (aIsHandler && bIsHandler && a > b)) {
            return 1;
          }

          if ((!aIsHandler && a < b) || (aIsHandler && bIsHandler && a < b)) {
            return -1;
          }

          return 0;
        })
        .join(' ');
    }

    const codeToUse = prettier
      .format(children.replace(/Menu[^/>]*/, `Menu ${result}`), {
        parser: 'babel',
        plugins: [babelParser]
      })
      .trim();

    return (
      <LiveProvider code={codeToUse} noInline={noInline} scope={{ Ramda, Lodash }} theme={githubTheme}>
        <div
          spellCheck={false}
          style={{
            fontFamily: 'monospace',
            backgroundColor: 'rgb(246, 248, 250)',
            padding: 10
          }}
        >
          <LiveEditor />
        </div>
        <div style={{ border: '1px solid #00008040', padding: 10 }}>
          <LivePreview />
          <LiveError />
        </div>
      </LiveProvider>
    );
  }

  if (render) {
    return (
      <LiveProvider code={children}>
        <LivePreview />
      </LiveProvider>
    );
  }

  return (
    <Highlight {...defaultProps} code={children.trim()} language={language} theme={githubTheme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: 10, whiteSpace: 'pre-wrap' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
