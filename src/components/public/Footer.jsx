import { FooterContainer, HrefStyle } from './styles'
import Pdf from './../../assets/img/Privacy Policy for Certify My Rent (1).pdf'

const Footer = () => {
  return (
    <FooterContainer>
      <div>Certify My Rent LLC</div>
      <div>Eddie Sapien</div>
      <div>(805) 710-8800</div>
      <div>eddiesapien@yahoo.com</div>
      <div className="text-center">
        10620 West Front Road, Atascadero ,CA, 93422, United States
      </div>
      <HrefStyle href={Pdf} download>
        Privacy Policy
      </HrefStyle>
    </FooterContainer>
  )
}

export default Footer
