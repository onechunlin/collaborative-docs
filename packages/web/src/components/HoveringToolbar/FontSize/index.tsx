import { FC, useState } from 'react';
import { Menu, Popover } from 'antd';
import cx from 'classnames';
import './index.less';
import { CaretDownOutlined } from '@ant-design/icons';
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
    <Popover
      open={visible}
      onOpenChange={setVisible}
      trigger='click'
      getPopupContainer={(node) => node}
      content={() => (
        <Menu
          className='font-size-select-popup'
          onClick={data => {
            const { key } = data
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
        <CaretDownOutlined />
      </div>
    </Popover>
  );
};

export default FontSize;
