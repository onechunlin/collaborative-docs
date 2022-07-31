import CustomTooltip from '@/components/CustomTooltip';
import { Button } from '@arco-design/web-react';
import { FC } from 'react';
import { ReactComponent as CmdIcon } from '@/assets/cmd.svg';

const Toolbar: FC = () => {
  return (
    <>
      <CustomTooltip tips="字体大小">
        <select className="ql-size">
          <option value="small"></option>
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
      </CustomTooltip>

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

      <CustomTooltip tips="字体颜色">
        <select className="ql-color"></select>
      </CustomTooltip>

      <CustomTooltip tips="背景颜色">
        <select className="ql-background"></select>
      </CustomTooltip>

      <CustomTooltip tips="代码块">
        <Button className="ql-code"></Button>
      </CustomTooltip>

      <CustomTooltip tips="链接">
        <Button className="ql-link"></Button>
      </CustomTooltip>

      <CustomTooltip tips="文本对齐">
        <select className="ql-align"></select>
      </CustomTooltip>

      <CustomTooltip tips="图片">
        <Button className="ql-image"></Button>
      </CustomTooltip>

      <CustomTooltip tips="清除样式">
        <Button className="ql-clean"></Button>
      </CustomTooltip>
    </>
  );
};

export default Toolbar;
