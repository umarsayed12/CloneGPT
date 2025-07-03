// src/components/FormattedResponse.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  content: string;
};

const FormattedResponse: React.FC<Props> = ({ content }) => {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match?.[1] || "javascript"}
                PreTag="div"
                className="rounded-xl my-4"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default FormattedResponse;
