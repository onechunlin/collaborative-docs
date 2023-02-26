import { Tooltip, TooltipProps } from '@arco-design/web-react';
import { FC, PropsWithChildren, ReactNode } from 'react';
import './index.less';

export interface CustomTooltipProps extends TooltipProps {
  tips: ReactNode;
  hotKey?: ReactNode;
}

const CustomTooltip: FC<PropsWithChildren<CustomTooltipProps>> = (props) => {
  const { tips, hotKey, children, ...restProps } = props;
  return (
    <Tooltip
      position="bottom"
      mini
      {...restProps}
      content={
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
