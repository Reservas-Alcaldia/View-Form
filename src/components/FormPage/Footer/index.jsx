import LogoCity from '../../../assets/logo_alcaldia.svg'
import LogoGov from '../../../assets/Logo_gov.svg'
import CoImg from '../../../assets/co.svg'

const Footer = () => {
    
    return (
        
        <div className="footer">
            <div className="city-logo">
                <img src= {LogoCity} alt="Alcaldía de Medellín" />
                <span className="city">Alcaldía de Medellín</span>
            </div>
                <div className="city-logo">
                <img src= {CoImg} alt="Alcaldía de Medellín" />
            </div>
            <div className="logo">
                <img src= {LogoGov} alt="Gobierno de Colombia" />
            </div>
            <div className="city-logo">
                <a href="https://www.gov.co/">
                <span className="GovText">Conoce a Gov.Co Aqui</span>
                </a>
            </div>
        </div>
    )
}

export default Footer