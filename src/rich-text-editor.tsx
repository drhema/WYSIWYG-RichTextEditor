import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Link,
  Image,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Check,
  Code,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  FileCode
} from 'lucide-react';

interface RichTextEditorProps {
  initialValue?: string;
  onChange?: (content: { html: string; markdown: string }) => void;
  className?: string;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = '',
  onChange,
  className = '',
  placeholder = 'Start typing...'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isMarkdownMode, setIsMarkdownMode] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.contentEditable = !isMarkdownMode;
    }
  }, [isMarkdownMode]);

  const execCommand = (command: string, value: string | null = null) => {
    if (!isMarkdownMode) {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      updateContent();
    }
  };

  const handleHeading = (level: number) => {
    if (isMarkdownMode) {
      const prefix = '#'.repeat(level) + ' ';
      insertMarkdown(prefix);
    } else {
      execCommand('formatBlock', `h${level}`);
    }
  };

  const handleQuote = () => {
    if (isMarkdownMode) {
      insertMarkdown('> ');
    } else {
      execCommand('formatBlock', 'blockquote');
    }
  };

  const handleLink = () => {
    if (!showLinkInput) {
      setShowLinkInput(true);
      return;
    }
    
    if (linkUrl) {
      if (isMarkdownMode) {
        const selection = window.getSelection()?.toString() || 'link text';
        insertMarkdown(`[${selection}](${linkUrl})`);
      } else {
        execCommand('createLink', linkUrl);
      }
      setShowLinkInput(false);
      setLinkUrl('');
    }
  };

  const handleImage = () => {
    if (!showImageInput) {
      setShowImageInput(true);
      return;
    }
    
    if (imageUrl) {
      if (isMarkdownMode) {
        insertMarkdown(`![${imageAlt}](${imageUrl})`);
      } else {
        execCommand('insertImage', imageUrl);
      }
      setShowImageInput(false);
      setImageUrl('');
      setImageAlt('');
    }
  };

  const insertMarkdown = (markdown: string) => {
    const textarea = editorRef.current as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const newText = text.substring(0, start) + markdown + text.substring(end);
    setMarkdownContent(newText);
    updateContent();
  };

  const handleBold = () => {
    if (isMarkdownMode) {
      insertMarkdown('**bold text**');
    } else {
      execCommand('bold');
    }
  };

  const handleItalic = () => {
    if (isMarkdownMode) {
      insertMarkdown('*italic text*');
    } else {
      execCommand('italic');
    }
  };

  const handleList = (ordered: boolean) => {
    if (isMarkdownMode) {
      const prefix = ordered ? '1. ' : '- ';
      insertMarkdown(prefix);
    } else {
      execCommand(ordered ? 'insertOrderedList' : 'insertUnorderedList');
    }
  };

  const toggleMode = () => {
    setIsMarkdownMode(!isMarkdownMode);
    if (!isMarkdownMode) {
      // Convert HTML to Markdown
      const html = editorRef.current?.innerHTML || '';
      // Use a markdown conversion library here
      setMarkdownContent(html); // This is simplified, use proper HTML->MD conversion
    } else {
      // Convert Markdown to HTML
      // Use a markdown conversion library here
      if (editorRef.current) {
        editorRef.current.innerHTML = markdownContent; // This is simplified, use proper MD->HTML conversion
      }
    }
  };

  const updateContent = () => {
    if (onChange) {
      const html = editorRef.current?.innerHTML || '';
      onChange({
        html,
        markdown: markdownContent
      });
    }
  };

  return (
    <Card className={`w-full max-w-4xl p-4 ${className}`}>
      <div className="mb-4 flex flex-wrap gap-2 border-b pb-2">
        <Button
          onClick={handleBold}
          className="p-2"
          title="Bold"
        >
          <Bold size={16} />
        </Button>
        <Button
          onClick={handleItalic}
          className="p-2"
          title="Italic"
        >
          <Italic size={16} />
        </Button>
        <Button
          onClick={() => handleHeading(1)}
          className="p-2"
          title="Heading 1"
        >
          <Heading1 size={16} />
        </Button>
        <Button
          onClick={() => handleHeading(2)}
          className="p-2"
          title="Heading 2"
        >
          <Heading2 size={16} />
        </Button>
        <Button
          onClick={() => handleHeading(3)}
          className="p-2"
          title="Heading 3"
        >
          <Heading3 size={16} />
        </Button>
        <Button
          onClick={handleLink}
          className="p-2"
          title="Insert Link"
        >
          <Link size={16} />
        </Button>
        <Button
          onClick={handleImage}
          className="p-2"
          title="Insert Image"
        >
          <Image size={16} />
        </Button>
        <Button
          onClick={handleQuote}
          className="p-2"
          title="Quote"
        >
          <Quote size={16} />
        </Button>
        <Button
          onClick={() => handleList(false)}
          className="p-2"
          title="Bullet List"
        >
          <List size={16} />
        </Button>
        <Button
          onClick={() => handleList(true)}
          className="p-2"
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </Button>
        <Button
          onClick={() => execCommand('justifyLeft')}
          className="p-2"
          title="Align Left"
        >
          <AlignLeft size={16} />
        </Button>
        <Button
          onClick={() => execCommand('justifyCenter')}
          className="p-2"
          title="Align Center"
        >
          <AlignCenter size={16} />
        </Button>
        <Button
          onClick={() => execCommand('justifyRight')}
          className="p-2"
          title="Align Right"
        >
          <AlignRight size={16} />
        </Button>
        <Button
          onClick={toggleMode}
          className="p-2"
          title="Toggle Markdown Mode"
        >
          <FileCode size={16} />
        </Button>
      </div>

      {showLinkInput && (
        <div className="mb-4 flex gap-2">
          <Input
            type="url"
            placeholder="Enter URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleLink}>
            <Check size={16} className="mr-2" />
            Insert
          </Button>
          <Button 
            onClick={() => setShowLinkInput(false)} 
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      )}

      {showImageInput && (
        <div className="mb-4 flex gap-2">
          <Input
            type="text"
            placeholder="Alt text"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            className="flex-1"
          />
          <Input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleImage}>
            <Check size={16} className="mr-2" />
            Insert
          </Button>
          <Button 
            onClick={() => setShowImageInput(false)} 
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      )}

      {isMarkdownMode ? (
        <textarea
          ref={editorRef as any}
          value={markdownContent}
          onChange={(e) => {
            setMarkdownContent(e.target.value);
            updateContent();
          }}
          className="min-h-48 w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          placeholder={placeholder}
        />
      ) : (
        <div
          ref={editorRef}
          className="min-h-48 w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 prose prose-sm overflow-auto"
          onInput={updateContent}
          dangerouslySetInnerHTML={{ __html: initialValue }}
          placeholder={placeholder}
        />
      )}
    </Card>
  );
};

export default RichTextEditor;
