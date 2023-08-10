import { ChatLink, ContactUsContainer } from "./styles"

export default function ContactUs() {
  return (
    <ContactUsContainer>
      <ChatLink to="/create-repair-ticket">
        create a repair ticket
      </ChatLink>

      <ChatLink>
        create a complaint ticket
      </ChatLink>

      <ChatLink>
        chat with the manager
      </ChatLink>
    </ContactUsContainer>
  )
}