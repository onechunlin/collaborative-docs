import { Tooltip } from 'antd';
import { FC, PropsWithChildren, ReactNode } from 'react';
import './index.less';
import { TooltipPropsWithTitle } from 'antd/es/tooltip';

export interface CustomTooltipProps extends TooltipPropsWithTitle {
  tips: ReactNode;
  hotKey?: ReactNode;
}

const CustomTooltip: FC<PropsWithChildren<CustomTooltipProps>> = (props) => {
  const { tips, hotKey, children, ...restProps } = props;
  return (
    <Tooltip
      {...restProps}
      title={
        <>
          <div className="tips">{tips}</div>
          <div className="hot-key">{hotKey}</div>
        </>
      }
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
