import LogoGov from '../../../assets/Logo_gov.svg'
import LogoCity from '../../../assets/logo_alcaldia.svg'

const Header = () => {
    
    return (
        
        <div className="header">
            <div className="logo">
            <img src= {LogoGov} alt="Gobierno de Colombia" />
            </div>
            <div className="city-logo">
            <img src= {LogoCity} alt="Alcaldía de Medellín" />
            <span className="city">Alcaldía de Medellín</span>
            </div>
        </div>
    )
}

export default Header