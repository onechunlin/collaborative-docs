import CustomTooltip from '@/components/CustomTooltip';
import { Button } from '@arco-design/web-react';
import { FC } from 'react';
import { ReactComponent as CmdIcon } from '@/assets/cmd.svg';

const Toolbar: FC = () => {
  return (
    <>
      <CustomTooltip
        tips="加粗"
        hotKey={
          <>
            <CmdIcon className="cmd-icon" />B
          </>
        }
      >
        <Button className="ql-bold"></Button>
      </CustomTooltip>
      <CustomTooltip
        tips="斜体"
        hotKey={
          <>
            <CmdIcon className="cmd-icon" />I
          </>
        }
      >
        <Button className="ql-italic"></Button>
      </CustomTooltip>
      <CustomTooltip
        tips="下划线"
        hotKey={
          <>
            <CmdIcon className="cmd-icon" />U
          </>
        }
      >
        <Button className="ql-underline"></Button>
      </CustomTooltip>
      <CustomTooltip tips="删除线">
        <Button className="ql-strike"></Button>
      </CustomTooltip>
    </>
  );
};

export default Toolbar;
