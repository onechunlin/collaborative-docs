import React from 'react';
import './index.less';

interface Caret {
  color: string;
  isForward: boolean;
  name: string;
}

const Caret: React.FC<Caret> = (props) => {
  const { color, isForward, name } = props;
  const customStyles = {
    background: color,
    left: isForward ? '0%' : '100%',
  };

  return (
    <>
      <span className='caret' contentEditable={false} style={customStyles}>
        <span style={{ position: 'relative' }}>
          <span className='cursor' contentEditable={false} style={customStyles}>
            {name}
          </span>
        </span>
      </span>
    </>
  );
};

export default Caret;
