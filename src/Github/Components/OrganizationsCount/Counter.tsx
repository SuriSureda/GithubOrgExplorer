import { useEffect, useRef } from 'react';
import { animated, useSpring } from 'react-spring';

import './index.css';

type Props = {
  count: number;
};

export const Counter: React.FC<Props> = ({ count }) => {
  const fromNumber = useRef(0);

  const { number } = useSpring({
    from: { number: fromNumber.current },
    number: count,
    delay: 200,
  });

  useEffect(() => {
    if (count) {
      fromNumber.current = count;
    }
  }, [count]);

  return <animated.span id='org-counter'>{number.to((n) => n.toFixed(0))}</animated.span>;
};
