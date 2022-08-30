import { Trigger } from '@arco-design/web-react';
import { FC, ReactElement, useEffect, useState } from 'react';
import cx from 'classnames';
import { SketchPicker } from 'react-color';
import IconFont from '../../IconFont';
import './index.less';

export interface ColorSelectProps {
  cacheKey: string;
  icon: ReactElement;
  value?: string;
  onChange: (color: string) => void;
}

const ColorSelect: FC<ColorSelectProps> = (props) => {
  const { icon, cacheKey, onChange } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [recentColor, setRecentColor] = useState<string | undefined>(
    localStorage.getItem(cacheKey)?.toString(),
  );

  useEffect(() => {
    if (recentColor) {
      localStorage.setItem(cacheKey, recentColor);
    }
  }, [recentColor]);
  return (
    <div
      className={cx('color-select', {
        active: visible,
      })}>
      <div
        className='color-set'
        onClick={() => {
          if (recentColor) {
            onChange(recentColor);
          }
        }}>
        <span className='icon'>{icon}</span>
        <span
          className='color-preview'
          style={{
            backgroundColor: recentColor,
          }}></span>
      </div>
      <Trigger
        popupVisible={visible}
        onVisibleChange={setVisible}
        trigger='click'
        getPopupContainer={(node) => node}
        popup={() => (
          <SketchPicker
            color={recentColor}
            onChange={(color) => {
              setRecentColor(color.hex);
              onChange(color.hex);
            }}
          />
        )}>
        <div className='caret-down'>
          <IconFont type='icon-caretdown' />
        </div>
      </Trigger>
    </div>
  );
};

export default ColorSelect;
