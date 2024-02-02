import React, { useCallback } from 'react';

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesConfetti = () => {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(container => {
    }, []);

    return (
        <Particles
          className='z-0'
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                fullScreen: {
                  enable: true
                },
                particles: {
                  number: {
                    value: 200
                  },
                  color: {
                    value: ["#ff8300"]
                  },
                  shape: {
                    type: ["circle", "square", "triangle"]
                  },
                  opacity: {
                    value: {
                      max: 1,
                      min: 0
                    },
                    animation: {
                      enable: true,
                      speed: 1,
                      startValue: "max",
                      destroy: "min"
                    }
                  },
                  size: {
                    value: { min: 3, max: 7 }
                  },
                  life: {
                    duration: {
                      sync: true,
                      value: 5
                    },
                    count: 1
                  },
                  move: {
                    enable: true,
                    gravity: {
                      enable: true,
                      acceleration: 20
                    },
                    speed: {
                      min: 25,
                      max: 50
                    },
                    drift: {
                      min: -2,
                      max: 2
                    },
                    decay: 0.05,
                    direction: "none",
                    outModes: {
                      default: "destroy",
                      top: "none"
                    }
                  },
                  rotate: {
                    value: {
                      min: 0,
                      max: 360
                    },
                    direction: "random",
                    move: true,
                    animation: {
                      enable: true,
                      speed: 60
                    }
                  },
                  tilt: {
                    direction: "random",
                    enable: true,
                    move: true,
                    value: {
                      min: 0,
                      max: 360
                    },
                    animation: {
                      enable: true,
                      speed: 60
                    }
                  },
                  roll: {
                    darken: {
                      enable: true,
                      value: 25
                    },
                    enable: true,
                    speed: {
                      min: 15,
                      max: 25
                    }
                  },
                  wobble: {
                    distance: 30,
                    enable: true,
                    move: true,
                    speed: {
                      min: -15,
                      max: 15
                    }
                  }
                },
                interactivity: {
                  detectsOn: "canvas",
                  events: {
                    resize: true
                  }
                },
                detectRetina: true,
              }}
        />
    );
};

export default ParticlesConfetti;