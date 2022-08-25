import { isCollapsed, isElementEmpty, useEditorState } from '@udecode/plate';
import { cva, VariantProps } from 'class-variance-authority';
import { FC } from 'react';
import { useFocused } from 'slate-react';
import { EditorRenderElementProps } from '../../utils/EditorComponentProps';

const styles = cva(['font-extrabold', 'dark:text-white', 'text-black'], {
  variants: {
    variant: {
      h1: [
        'text-4xl',
        'border-b-2',
        'dark:border-zinc-800',
        'border-zinc-100',
        'pb-3',
        'mb-3',
      ],
      h2: ['text-3xl', 'pt-3'],
      h3: ['text-2xl', 'pt-2'],
      h4: ['text-xl', 'pt-1'],
      h5: ['text-lg', 'opacity-90'],
      h6: ['text-base', 'opacity-70'],
    },
    placeholder: {
      untitled: [
        "before:content-['Untitled']",
        'before:block',
        'before:cursor-text',
        'before:absolute',
        'before:opacity-25',
      ],
    },
  },
  defaultVariants: {
    variant: 'h1',
  },
});

type HeadingProps = VariantProps<typeof styles> & EditorRenderElementProps;

export const Heading: FC<HeadingProps> = ({
  attributes,
  children,
  element,
  variant,
}) => {
  const Component = variant || 'h1';

  const focused = useFocused();
  const editor = useEditorState();

  const isEmptyBlock = element && isElementEmpty(editor, element);

  const placeholderEnabled =
    Component === 'h1' &&
    isEmptyBlock &&
    isCollapsed(editor.selection) &&
    focused;

  return (
    <Component
      {...attributes}
      className={styles({
        variant,
        placeholder: placeholderEnabled ? 'untitled' : undefined,
      })}
    >
      {children}
    </Component>
  );
};
