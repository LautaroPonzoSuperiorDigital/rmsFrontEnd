import { ChatLink, ContactUsContainer } from "./styles"

export default function ContactUs() {
  return (
    <ContactUsContainer>
      <ChatLink to="/create-repair-ticket">
        create a repair ticket
      </ChatLink>

      <ChatLink to="/create-complaint-ticket">
        create a complaint ticket
      </ChatLink>

      <ChatLink to="/chat">
        chat with the manager
      </ChatLink>
    </ContactUsContainer>
  )
}