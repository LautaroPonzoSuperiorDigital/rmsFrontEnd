import { useEffect, useRef, useState } from 'react'
import AdminChatRoom from './AdminChatRoom/AdminChatRoom'
import Nav from '../../../components/nav'
import AdminChatRoomMessages from './AdminChatRoomMessages'
import ChatSendMessage from './ChatSendMessage'
import { socket } from '../../../components/socketManajer/socket'
import { api } from '../../../services/api'
import TicketsInfomartion from './TicketsInformation/TicketsInfomartion'
import AdminChatRoomNavBar from './AdminChatRoomNavBar'
import TicketsNavBar from './TicketsNavBar'
import Footer from '../../../components/public/Footer'

const chatRoomStyle = {
  width: '33%',

  overflowY: 'auto',
  maxHeight: '100vh',
}
const chatContaienrStyle = {
  borderLeft: '1px solid #00000026',
  borderRight: '1px solid #00000026',
  height: '100%',

  overflowY: 'auto',
  width: '33%',
}

const AdminChatRoomMessagesStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '0px 10px',
  height: '64vh',
  maxHeight: '64vh',
}

const TicketsInfomartionStyle = {
  display: 'flex',
  maxHeight: '100vh',
  padding: '20px 20px',
  width: '33%',
}

const Chats = () => {
  const chatContainerRef = useRef(null)
  const [messages, setMessages] = useState([]) ///this state recieve all message from server
  const [filterMessages, setFilterMessages] = useState([]) // this state filter message by chat room id
  const [targetChatRoomId, setTargetChatRoomId] = useState(null)
  const [chatRooms, setChatRooms] = useState([])
  const [ticketActiveRooms, setTicketActiveRooms] = useState(chatRooms)
  const [key, setKey] = useState(false)

  const scrollToLastMessage = () => {
    if (chatContainerRef.current) {
      const lastMessageElement = chatContainerRef.current.lastElementChild
      if (lastMessageElement) {
        lastMessageElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
  // Scroll to the last message when messages update
  useEffect(() => {
    scrollToLastMessage()
  }, [filterMessages])
  // recieve all incoming messages from server
  useEffect(() => {
    socket.on('event_message', (data) => {
      console.log('Received message:', data)
      // Update the state of the incoming messages variable
      setMessages((prevMessages) => [...prevMessages, data])
    })
  }, [socket])
  //filter by chat room id
  useEffect(() => {
    const filterMessage = messages.filter(
      (message) => message.roomChatId === targetChatRoomId,
    )
    setFilterMessages(filterMessage)
  }, [targetChatRoomId, messages])
  //  get all chat rooms
  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const { data } = await api.get('/chat/chat-rooms')
        if (data.length > 0) {
          setChatRooms(data)
          const chatRoomsMessage = data.map((chatRoom) => chatRoom.Chats)

          setTicketActiveRooms(data)
          setMessages(chatRoomsMessage.flat())
        } else {
          console.log('adminListings its empty')
          setChatRooms([])
        }
      } catch (err) {
        console.log(err)
      }
    }
    getChatRooms()
    setKey(false)
  }, [targetChatRoomId, key])

  return (
    <div
      className="vh-100 d-flex flex-column w-100 "
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Nav />
      <div className=" flex-grow-1 d-flex p-2  justify-content-center">
        <div style={chatRoomStyle} className="flex-grow-1">
          <div>
            <AdminChatRoomNavBar
              chatRooms={chatRooms}
              setTicketActiveRooms={setTicketActiveRooms}
            />
          </div>
          {chatRooms.map((chatRoom) => {
            return (
              <AdminChatRoom
                key={chatRoom.listingId}
                chatRoom={chatRoom}
                filterMessages={filterMessages}
                setTargetChatRoomId={setTargetChatRoomId}
                socket={socket}
                setFilterMessages={setFilterMessages}
                messages={messages}
              />
            )
          })}
        </div>
        <div style={chatContaienrStyle} className="flex-grow-1">
          <div>
            {targetChatRoomId && (
              <TicketsNavBar
                targetChatRoomId={targetChatRoomId}
                chatRooms={chatRooms}
              />
            )}
            <div style={AdminChatRoomMessagesStyle}>
              <ul
                ref={chatContainerRef}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'auto',
                  flexGrow: '1',
                  padding: '0px 10px',
                }}
              >
                {filterMessages.map((message) => (
                  <li key={message.id} className="d-flex flex-column">
                    <AdminChatRoomMessages
                      message={message}
                      targetChatRoomId={targetChatRoomId}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {targetChatRoomId && (
                <ChatSendMessage
                  socket={socket}
                  chatRoomId={targetChatRoomId}
                />
              )}
            </div>
          </div>
        </div>
        <div style={TicketsInfomartionStyle}>
          {targetChatRoomId && (
            <TicketsInfomartion
              chatRoomId={targetChatRoomId}
              chatRooms={chatRooms}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Chats
