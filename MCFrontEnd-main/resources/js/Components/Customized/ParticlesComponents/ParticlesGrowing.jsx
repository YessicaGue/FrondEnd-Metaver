import React, { useCallback } from 'react';

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesGrowing = () => {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(container => {
    }, []);

    return (
        <Particles
          className='z-[0]'
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              detectRetina: true,
              fpsLimit: 30,
              particles: {
                color: {
                  value: '#ffffff',
                },
                move: {
                  angle: {
                    offset: 0,
                    value: 90
                  },
                  center: {
                    x: 50,
                    y: 50,
                    mode: 'percent',
                    radius: 0
                  },
                  enable: true,
                  size: false,
                  speed: 2,
                },
                number: {
                  limit: 50,
                  value: 0
                },
                opacity: {
                  value: 0.5,
                },
                reduceDuplicates: false,
                shadow: {
                  blur: 0,
                  color: {
                    value: '#000'
                  },
                  enable: false,
                  offset: {
                    x: 0,
                    y: 0
                  }
                },
                shape: {
                  options: {},
                  type: 'circle'
                },
                size: {
                  random: {
                    enable: false,
                    minimumValue: 1
                  },
                  value: {
                    min: 0.1,
                    max: 5
                  },
                  animation: {
                    count: 0,
                    enable: true,
                    speed: 5,
                    decay: 0,
                    sync: true,
                    startValue: 'min',
                    minimumValue: 0.1
                  }
                },
              },
              pauseOnBlur: true,
              pauseOnOutsideViewport: true,
              smooth: true,
              style: {},
              zLayers: 10,
              emitters: {
                autoPlay: true,
                fill: true,
                life: {
                  wait: true
                },
                rate: {
                  quantity: 1,
                  delay: 0.1
                },
                shape: 'square',
                startCount: 0,
                size: {
                  mode: 'percent',
                  height: 0,
                  width: 100
                },
                direction: 'top',
                particles: {},
                position: {
                  x: 50,
                  y: 100
                }
              }
            }}
        />
    );
};

export default ParticlesGrowing;