import { FC, useState } from 'react';
import { Menu, Trigger } from '@arco-design/web-react';
import cx from 'classnames';
import './index.less';
import { IconCaretDown } from '@arco-design/web-react/icon';
import { DEFAULT_FONT_SIZE } from '@/constants';

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
    <Trigger
      popupVisible={visible}
      onVisibleChange={setVisible}
      trigger='click'
      getPopupContainer={(node) => node}
      popup={() => (
        <Menu
          className='font-size-select-popup'
          onClickMenuItem={(key: string): void => {
            onChange(Number(key));
            setVisible(false);
          }}>
          {fontSizeOptions.map((option) => (
            <MenuItem key={String(option)}>{option}px</MenuItem>
          ))}
        </Menu>
      )}>
      <div
        className={cx('font-size-select', {
          active: visible,
        })}>
        <span>{value}px</span>
        <IconCaretDown />
      </div>
    </Trigger>
  );
};

export default FontSize;
