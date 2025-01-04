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
  Check
} from 'lucide-react';

const RichTextEditor = () => {
  const editorRef = useRef(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  
  useEffect(() => {
    // Enable content editing when component mounts
    if (editorRef.current) {
      editorRef.current.contentEditable = true;
    }
  }, []);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleHeading = (level) => {
    execCommand('formatBlock', `h${level}`);
  };

  const handleQuote = () => {
    execCommand('formatBlock', 'blockquote');
  };

  const handleLink = () => {
    if (!showLinkInput) {
      setShowLinkInput(true);
      return;
    }
    
    if (linkUrl) {
      execCommand('createLink', linkUrl);
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
      execCommand('insertImage', imageUrl);
      setShowImageInput(false);
      setImageUrl('');
      setImageAlt('');
    }
  };

  return (
    <Card className="w-full max-w-4xl p-4">
      <div className="mb-4 flex flex-wrap gap-2 border-b pb-2">
        <Button
          onClick={() => execCommand('bold')}
          className="p-2"
          title="Bold"
        >
          <Bold size={16} />
        </Button>
        <Button
          onClick={() => execCommand('italic')}
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

      <div
        ref={editorRef}
        className="min-h-48 w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 prose prose-sm overflow-auto"
        style={{ minHeight: '200px' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            execCommand('insertParagraph');
            e.preventDefault();
          }
        }}
      >
        <p>Start typing...</p>
      </div>
    </Card>
  );
};

export default RichTextEditor;