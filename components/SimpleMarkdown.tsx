import React from 'react';

interface SimpleMarkdownProps {
    content: string;
}

// Simple markdown renderer component
export const SimpleMarkdown: React.FC<SimpleMarkdownProps> = ({ content }) => {
    const renderMarkdown = (text: string): React.ReactNode[] => {
        const lines = text.split('\n');
        const elements: React.ReactNode[] = [];
        let listItems: string[] = [];

        const flushList = (index: number) => {
            if (listItems.length > 0) {
                elements.push(
                    <ul key={`list-${index}`} className="list-disc ml-6 mb-4">
                        {listItems.map((item, i) => (
                            <li key={i} className="mb-2">{item}</li>
                        ))}
                    </ul>
                );
                listItems = [];
            }
        };

        lines.forEach((line, index) => {
            // Headers
            if (line.startsWith('# ')) {
                flushList(index);
                elements.push(<h1 key={index} className="text-4xl font-bold mb-6 mt-8">{line.substring(2)}</h1>);
            } else if (line.startsWith('## ')) {
                flushList(index);
                elements.push(<h2 key={index} className="text-3xl font-bold mb-4 mt-6">{line.substring(3)}</h2>);
            } else if (line.startsWith('### ')) {
                flushList(index);
                elements.push(<h3 key={index} className="text-2xl font-bold mb-3 mt-5">{line.substring(4)}</h3>);
            } else if (line.startsWith('#### ')) {
                flushList(index);
                elements.push(<h4 key={index} className="text-xl font-bold mb-2 mt-4">{line.substring(5)}</h4>);
            }
            // Lists
            else if (line.match(/^[\-\*]\s/)) {
                listItems.push(line.substring(2));
            }
            // Empty line
            else if (line.trim() === '') {
                flushList(index);
            }
            // Regular paragraph
            else if (line.trim()) {
                if (listItems.length > 0) {
                    // Continue the last list item
                    listItems[listItems.length - 1] += ' ' + line.trim();
                } else {
                    flushList(index);
                    elements.push(<p key={index} className="mb-4 leading-relaxed">{line}</p>);
                }
            }
        });

        flushList(lines.length);
        return elements;
    };

    return <div>{renderMarkdown(content)}</div>;
};
