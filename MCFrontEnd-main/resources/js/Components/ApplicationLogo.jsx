import LogoMC from '@/../assets/images/logo-mc.svg';
export default function ApplicationLogo({ className }) {
    return (
        <img
            src={LogoMC}
            alt="Logo MC"
            className={className}
        />
    );
}
