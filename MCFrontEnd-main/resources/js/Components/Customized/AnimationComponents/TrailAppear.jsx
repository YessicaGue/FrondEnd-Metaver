import React from 'react';
import { useTrail, animated, easings } from '@react-spring/web';
import { useEffect } from 'react';

const TrailAppear = (props) => {
    const { children } = props;
    const items = React.Children.toArray(children);
    const trail = useTrail(items.length, {
        from: { y: 100, opacity: 0 },
        to: { y: 0, opacity: 1 },
        delay: 300,
        config: {
            mass: 1,
            friction: 26,
            tension: 220,
        },
    });

    return (
        trail.map(({ ...style }, index) => (
            <animated.div className={props.className ?? ''} key={ index } style={{ ...style }}>
                <animated.div className={props.className ?? ''}>{ items[index] }</animated.div>
            </animated.div>
        ))
    );
};

export default TrailAppear;