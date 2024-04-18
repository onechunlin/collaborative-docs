import CustomTooltip from '@/components/CustomTooltip';
import cx from 'classnames';
import { CSSProperties, FC, ReactNode, useEffect, useRef } from 'react';
import { Editor, Range } from 'slate';
import { useSlate } from 'slate-react';
import { CustomEditor } from '../../utils/command';
import IconFont from '../IconFont';
import Portal from '../Portal';
import ColorSelect from './ColorSelect';
import FontSize from './FontSize';
import './index.less';

const toolbarGap = 4;

export interface ActionProps {
  icon: string;
  onClick: () => void;
  active?: boolean;
  tips?: ReactNode;
  hotKey?: ReactNode;
  style?: CSSProperties;
}
/**
 * 具体操作按钮
 * @param props
 * @returns
 */
const Action: FC<ActionProps> = (props) => {
  const { icon, tips, active, hotKey, style, onClick } = props;
  const showTooltip = tips || hotKey;
  const actionNode = (
    <span
      className={cx('action', {
        active,
      })}
      onClick={onClick}
      style={style}
    >
      <IconFont type={icon} />
    </span>
  );
  return showTooltip ? (
    <CustomTooltip title="sadasd" tips={tips} hotKey={hotKey}>
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
  const ref = useRef<HTMLDivElement>(null);

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

    if (!domSelection?.toString()) {
      return;
    }
    const domRange = domSelection.getRangeAt(0);

    const rect = domRange.getBoundingClientRect();
    // 更改工具栏位置
    el.style.opacity = '1';
    const top = Math.max(
      rect.top + window.scrollY - el.offsetHeight - toolbarGap,
      12,
    );
    el.style.top = `${top}px`;
    const left = Math.max(
      rect.left + window.scrollX - el.offsetWidth / 2 + rect.width / 2,
      12,
    );
    el.style.left = `${left}px`;
  });

  return (
    <Portal>
      <div
        className="hovering-toolbar"
        ref={ref}
        // 防止点击工具栏时触发编辑器的失焦操作
        onMouseDown={(e) => {
          if (e.target instanceof HTMLInputElement) {
            return;
          }
          e.preventDefault();
        }}
      >
        <FontSize
          value={CustomEditor.getFontSize(editor)}
          onChange={(fontSize) => {
            CustomEditor.toggleFontSize(editor, fontSize);
          }}
        />
        <Action
          icon="icon-01jiacu"
          active={CustomEditor.isBoldMarkActive(editor)}
          onClick={(): void => {
            CustomEditor.toggleBoldMark(editor);
          }}
        />
        <Action
          icon="icon-02xieti"
          active={CustomEditor.isItalicMarkActive(editor)}
          onClick={(): void => {
            CustomEditor.toggleItalicMark(editor);
          }}
        />
        <Action
          icon="icon-03xiahuaxian"
          active={CustomEditor.isUnderlineMarkActive(editor)}
          onClick={(): void => {
            CustomEditor.toggleUnderlineMark(editor);
          }}
        />
        <Action
          icon="icon-04shanchuxian"
          active={CustomEditor.isLineThroughMarkActive(editor)}
          onClick={(): void => {
            CustomEditor.toggleLineThroughMark(editor);
          }}
        />
        <ColorSelect
          cacheKey="font-color"
          icon={<IconFont type="icon-24zitiyanse" />}
          onChange={(color) => {
            CustomEditor.toggleFontColor(editor, color);
          }}
        />
        <ColorSelect
          cacheKey="bg-color"
          icon={<IconFont type="icon-19beijingyanse" />}
          onChange={(color) => {
            CustomEditor.toggleBgColor(editor, color);
          }}
        />
        <Action
          icon="icon-code"
          active={CustomEditor.isInlineCodeMarkActive(editor)}
          style={{
            fontSize: 18,
          }}
          onClick={(): void => {
            CustomEditor.toggleInlineCodeMark(editor);
          }}
        />
        <Action
          icon="icon-07lianjie"
          active={CustomEditor.isLinkActive(editor)}
          onClick={(): void => {
            const active = CustomEditor.isLinkActive(editor);
            active
              ? CustomEditor.unsetLink(editor)
              : CustomEditor.setLink(editor, '');
          }}
        />
        <Action
          icon="icon-06shangbiao"
          active={CustomEditor.isScriptMarkActive(editor, 'super')}
          onClick={(): void => {
            CustomEditor.toggleSuperScriptMark(editor);
          }}
        />
        <Action
          icon="icon-05xiabiao"
          active={CustomEditor.isScriptMarkActive(editor, 'sub')}
          onClick={(): void => {
            CustomEditor.toggleSubScriptMark(editor);
          }}
        />
        <Action
          icon="icon-09zuoduiqi"
          active={CustomEditor.isParagraphTextAlignActive(editor, 'left')}
          onClick={(): void => {
            CustomEditor.toggleParagraphTextAlign(editor, 'left');
          }}
        />
        <Action
          icon="icon-11juzhongduiqi"
          active={CustomEditor.isParagraphTextAlignActive(editor, 'center')}
          onClick={(): void => {
            CustomEditor.toggleParagraphTextAlign(editor, 'center');
          }}
        />
        <Action
          icon="icon-10youduiqi"
          active={CustomEditor.isParagraphTextAlignActive(editor, 'right')}
          onClick={(): void => {
            CustomEditor.toggleParagraphTextAlign(editor, 'right');
          }}
        />
        <Action
          icon="icon-12liangduanduiqi"
          active={CustomEditor.isParagraphTextAlignActive(editor, 'justify')}
          onClick={(): void => {
            CustomEditor.toggleParagraphTextAlign(editor, 'justify');
          }}
        />
        <Action
          icon="icon-fengexian"
          onClick={(): void => {
            CustomEditor.addDivider(editor);
          }}
        />
      </div>
    </Portal>
  );
};

export default HoveringToolbar;
