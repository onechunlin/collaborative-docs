import { FC, useState } from 'react';
import { Menu, Popover } from 'antd';
import cx from 'classnames';
import './index.less';
import { DEFAULT_FONT_SIZE } from '@/constants';
import IconFont from '@/components/IconFont';

const { Item: MenuItem } = Menu;

export interface FontSizeProps {
  value?: number;
  onChange: (fontSize: number) => void;
}

const fontSizeOptions: number[] = [12, 14, 16, 18, 22, 24, 28, 32, 40, 48];

const FontSize: FC<FontSizeProps> = (props) => {
  const { value = DEFAULT_FONT_SIZE, onChange } = props;
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Popover
      open={visible}
      onOpenChange={setVisible}
      trigger='click'
      getPopupContainer={(node) => node}
      arrow={false}
      content={() => (
        <ul
          className='font-size-select-popup'
        >
          {fontSizeOptions.map((option) => (
            <li
              key={String(option)}
              className='font-size-option'
              onClick={() => {
                onChange(Number(option));
                setVisible(false);
              }}>
              {option}px
            </li>
          ))}
        </ul>
      )}>
      <div
        className={cx('font-size-select', {
          active: visible,
        })}>
        <span>{value}px</span>
        <IconFont type='icon-caretdown' />
      </div>
    </Popover>
  );
};

export default FontSize;
