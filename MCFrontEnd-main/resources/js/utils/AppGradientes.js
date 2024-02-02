export const generateGradiant = (deg = 45, color1, color2) => {
    return `linear-gradient(${deg}deg, ${color1} 30%, ${color2} 90%)`;
}
