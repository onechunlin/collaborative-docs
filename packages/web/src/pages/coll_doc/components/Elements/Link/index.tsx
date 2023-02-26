import { Form, Input, Popover, Trigger } from '@arco-design/web-react';
import { useUpdateEffect } from 'ahooks';
import { FC, useState } from 'react';
import { RenderElementProps, useSlate } from 'slate-react';
import { LinkElement } from '../../../typings';
import { CustomEditor } from '../../../utils/command';
import IconFont from '../../IconFont';
import './index.less';

const { Item: FormItem } = Form;

/**
 * 链接节点
 * @param props
 * @returns
 */
const Link: FC<RenderElementProps> = (props) => {
  const { attributes, children, element } = props;
  const linkElement = element as LinkElement;
  const editor = useSlate();
  const [opVisible, setOpVisible] = useState<boolean>();
  const [infoVisible, setInfoVisible] = useState<boolean>(!linkElement.url);
  const [link, setLink] = useState<string>(linkElement.url);

  useUpdateEffect(() => {
    if (!infoVisible) {
      // 每次关闭时检查是否有值来决定是设置链接还是取消链接
      link
        ? CustomEditor.setLink(editor, link, linkElement)
        : CustomEditor.unsetLink(editor, linkElement);
    }
  }, [infoVisible, link]);
  return (
    <>
      <Trigger
        popupVisible={opVisible}
        onVisibleChange={setOpVisible}
        popupAlign={{ bottom: 4 }}
        popup={() => (
          <div className='link-op-container'>
            <span
              className='op'
              onClick={() => {
                setOpVisible(false);
                setInfoVisible(true);
              }}>
              <IconFont type='icon-edit' />
            </span>
            <span
              className='op'
              onClick={() => {
                setInfoVisible(false);
                setLink('');
              }}>
              <IconFont type='icon-08jiechulianjie' />
            </span>
          </div>
        )}
        position='bottom'>
        <Popover
          unmountOnExit
          popupVisible={infoVisible}
          triggerProps={{
            onClickOutside: () => {
              setInfoVisible(false);
            },
          }}
          content={
            <div className='link-info-edit'>
              <FormItem
                style={{ marginBottom: 8 }}
                label='链接'
                layout='horizontal'>
                <Input value={link} onChange={setLink} placeholder='链接地址' />
              </FormItem>
            </div>
          }>
          <a
            {...attributes}
            href={linkElement.url}
            target='_blank'
            title={linkElement.url}
            // 这里需要用 onClick 来进行链接的打开，Slate 官方例子也打不开新的链接
            onClick={() => {
              window.open(linkElement.url);
              setTimeout(() => {
                setInfoVisible(false);
                setOpVisible(false);
              });
            }}
            rel='noreferrer'>
            {children}
          </a>
        </Popover>
      </Trigger>
    </>
  );
};

export default Link;
