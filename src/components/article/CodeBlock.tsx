import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github, darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type ICodeBlockProps = {
  language: string,
  value: string,
};

const CodeBlock = ({ language, value }: ICodeBlockProps) => {
  const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = darkMode ? darcula : github;
  return (
    <SyntaxHighlighter language={language} style={theme}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
