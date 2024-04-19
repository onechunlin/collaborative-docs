import { Popover } from 'antd';
import { FC, ReactElement, useEffect, useState } from 'react';
import cx from 'classnames';
import { SketchPicker } from 'react-color';
import IconFont from '../../IconFont';
import './index.less';

export interface ColorSelectProps {
  cacheKey: string;
  icon: ReactElement;
  value?: string;
  onChange: (color?: string) => void;
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
      <Popover
        open={visible}
        onOpenChange={setVisible}
        trigger='click'
        getPopupContainer={(node) => node}
        content={() => (
          <div className='color-container'>
            <div
              className='clear-color'
              onClick={() => {
                onChange(undefined);
                setVisible(false);
              }}>
              <IconFont type='icon-clear' />
              清除颜色
            </div>
            <SketchPicker
              color={recentColor}
              onChange={(color) => {
                setRecentColor(color.hex);
                onChange(color.hex);
              }}
            />
          </div>
        )}>
        <div className='caret-down'>
          <IconFont type='icon-caretdown' />
        </div>
      </Popover>
    </div>
  );
};

export default ColorSelect;
