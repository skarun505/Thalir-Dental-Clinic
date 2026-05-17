import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

export default function RichEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = window.prompt('Enter Image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="rich-editor-container" style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
            <div className="rich-editor-toolbar" style={{ display: 'flex', gap: '8px', padding: '12px', background: '#F7FAFC', borderBottom: '1px solid #E2E8F0', flexWrap: 'wrap' }}>
                <button 
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`editor-btn ${editor.isActive('bold') ? 'active' : ''}`}
                    title="Bold"
                >
                    <i className="fas fa-bold"></i>
                </button>
                <button 
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`editor-btn ${editor.isActive('italic') ? 'active' : ''}`}
                    title="Italic"
                >
                    <i className="fas fa-italic"></i>
                </button>
                <div style={{ width: '1px', background: '#E2E8F0', margin: '0 4px' }}></div>
                <button 
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`editor-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
                    title="Heading 2"
                >
                    <i className="fas fa-heading"></i>2
                </button>
                <button 
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`editor-btn ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`}
                    title="Heading 3"
                >
                    <i className="fas fa-heading"></i>3
                </button>
                <div style={{ width: '1px', background: '#E2E8F0', margin: '0 4px' }}></div>
                <button 
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`editor-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
                    title="Bullet List"
                >
                    <i className="fas fa-list-ul"></i>
                </button>
                <button 
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`editor-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
                    title="Ordered List"
                >
                    <i className="fas fa-list-ol"></i>
                </button>
                <div style={{ width: '1px', background: '#E2E8F0', margin: '0 4px' }}></div>
                <button 
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`editor-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
                    title="Quote"
                >
                    <i className="fas fa-quote-right"></i>
                </button>
                <button 
                    type="button"
                    onClick={addImage}
                    className="editor-btn"
                    title="Insert Image"
                >
                    <i className="fas fa-image"></i>
                </button>
            </div>
            
            <div className="rich-editor-content" style={{ padding: '20px', minHeight: '300px', background: 'white' }}>
                <EditorContent editor={editor} />
            </div>

            <style>{`
                .editor-btn {
                    padding: 8px 12px;
                    background: transparent;
                    border: none;
                    border-radius: 6px;
                    color: #4A5568;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .editor-btn:hover {
                    background: #E2E8F0;
                }
                .editor-btn.active {
                    background: #E2E8F0;
                    color: #6C63FF;
                }
                .ProseMirror {
                    outline: none;
                    min-height: 260px;
                }
                .ProseMirror p {
                    margin-bottom: 1em;
                    line-height: 1.6;
                }
                .ProseMirror h2, .ProseMirror h3 {
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                }
                .ProseMirror img {
                    max-width: 100%;
                    border-radius: 8px;
                    margin: 1.5em 0;
                }
                .ProseMirror ul, .ProseMirror ol {
                    padding-left: 24px;
                    margin-bottom: 1em;
                }
                .ProseMirror blockquote {
                    border-left: 4px solid #6C63FF;
                    padding-left: 16px;
                    color: #718096;
                    font-style: italic;
                    margin: 1.5em 0;
                }
            `}</style>
        </div>
    );
}
