import CustomTooltip from '@/components/CustomTooltip';
import { FC, ReactNode, useEffect, useRef } from 'react';
import { Editor, Range } from 'slate';
import { useSlate } from 'slate-react';
import cx from 'classnames';
import { CustomEditor } from '../../utils/command';
import IconFont from '../IconFont';
import Portal from '../Portal';
import FontSize from './FontSize';
import ColorSelect from './ColorSelect';
import './index.less';

const toolbarGap = 4;

export interface ActionProps {
  icon: string;
  onClick: () => void;
  active: boolean;
  tips?: ReactNode;
  hotKey?: ReactNode;
}
/**
 * 具体操作按钮
 * @param props
 * @returns
 */
const Action: FC<ActionProps> = (props) => {
  const { icon, tips, active, hotKey, onClick } = props;
  const showTooltip = tips || hotKey;
  const actionNode = (
    <span
      className={cx('action', {
        active,
      })}
      onClick={onClick}>
      <IconFont type={icon} />
    </span>
  );
  return showTooltip ? (
    <CustomTooltip tips={tips} hotKey={hotKey}>
      {actionNode}
    </CustomTooltip>
  ) : (
    actionNode
  );
};

/**
 * 工具栏
 * @returns
 */
const HoveringToolbar: FC = () => {
  const editor = useSlate();
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    // 处理工具栏的隐藏操作
    if (
      !selection ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style');
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection) {
      return;
    }
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    // 更改工具栏位置
    el.style.opacity = '1';
    el.style.top = `${
      rect.top + window.pageYOffset - el.offsetHeight - toolbarGap
    }px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return (
    <Portal>
      <div
        className='hovering-toolbar'
        ref={ref}
        // 防止点击工具栏时触发编辑器的失焦操作
        onMouseDown={(e) => {
          e.preventDefault();
        }}>
        <FontSize
          value={CustomEditor.getFontSize(editor)}
          onChange={(fontSize) => {
            CustomEditor.toggleFontSize(editor, fontSize);
          }}
        />
        <Action
          icon='icon-01jiacu'
          active={CustomEditor.isBoldMarkActive(editor)}
          onClick={(): void => {
            CustomEditor.toggleBoldMark(editor);
          }}
        />
        <Action
          icon='icon-02xieti'
          active={CustomEditor.isItalicMarkActive(editor)}
          onClick={(): void => {
            CustomEditor.toggleItalicMark(editor);
          }}
        />
        <Action
          icon='icon-03xiahuaxian'
          active={CustomEditor.isUnderlineMarkActive(editor)}
          onClick={(): void => {
            CustomEditor.toggleUnderlineMark(editor);
          }}
        />
        <Action
          icon='icon-04shanchuxian'
          active={CustomEditor.isLineThroughMarkActive(editor)}
          onClick={(): void => {
            CustomEditor.toggleLineThroughMark(editor);
          }}
        />
        <ColorSelect
          cacheKey='font-color'
          icon={<IconFont type='icon-24zitiyanse' />}
          onChange={(color) => {
            CustomEditor.toggleFontColor(editor, color);
          }}
        />
        <ColorSelect
          cacheKey='bg-color'
          icon={<IconFont type='icon-19beijingyanse' />}
          onChange={(color) => {
            CustomEditor.toggleBgColor(editor, color);
          }}
        />
        <Action
          icon='icon-06shangbiao'
          active={CustomEditor.isScriptMarkActive(editor, 'super')}
          onClick={(): void => {
            CustomEditor.toggleSuperScriptMark(editor);
          }}
        />
        <Action
          icon='icon-05xiabiao'
          active={CustomEditor.isScriptMarkActive(editor, 'sub')}
          onClick={(): void => {
            CustomEditor.toggleSubScriptMark(editor);
          }}
        />
        <Action
          icon='icon-09zuoduiqi'
          active={CustomEditor.isParagraphTextAlignActive(editor, 'left')}
          onClick={(): void => {
            CustomEditor.toggleParagraphTextAlign(editor, 'left');
          }}
        />
        <Action
          icon='icon-11juzhongduiqi'
          active={CustomEditor.isParagraphTextAlignActive(editor, 'center')}
          onClick={(): void => {
            CustomEditor.toggleParagraphTextAlign(editor, 'center');
          }}
        />
        <Action
          icon='icon-10youduiqi'
          active={CustomEditor.isParagraphTextAlignActive(editor, 'right')}
          onClick={(): void => {
            CustomEditor.toggleParagraphTextAlign(editor, 'right');
          }}
        />
        <Action
          icon='icon-12liangduanduiqi'
          active={CustomEditor.isParagraphTextAlignActive(editor, 'justify')}
          onClick={(): void => {
            CustomEditor.toggleParagraphTextAlign(editor, 'justify');
          }}
        />
      </div>
    </Portal>
  );
};

export default HoveringToolbar;
