import { MouseEventHandler, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSpring, animated } from 'react-spring';

import './index.css';

export type ModalProps = {
  showModal: boolean;
  onClose: () => void;
  closeOnClickOutside?: boolean;
};

type Props = ModalProps & {
  children: ReactNode;
};

export const Modal: React.FC<Props> = ({ showModal, onClose, closeOnClickOutside = true, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    width: showModal ? '100%' : '0%',
    height: showModal ? '100%' : '0%',
    overflow: showModal ? 'visible' : 'hidden',
    display: showModal ? 'flex' : '',
  });

  const handleClose = () => {
    onClose();
  };

  const handleClickOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (overlayRef.current !== e.target) return;
    onClose();
  };

  return createPortal(
    <animated.div style={animation} className='modal-overlay' ref={overlayRef} onClick={closeOnClickOutside ? handleClickOverlay : undefined}>
      <div className='modal-wrapper'>
        <div className='modal-header'>
          <span className='modal-close-icon' onClick={handleClose}>
            ❌
          </span>
        </div>
        <div className='modal-content'>{children}</div>
      </div>
    </animated.div>,
    document.body
  );
};
