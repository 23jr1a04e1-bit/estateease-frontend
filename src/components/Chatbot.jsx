import { useState } from 'react'

// Placeholder chatbot widget for future AI integration.
// It echoes a canned response today; swap `getReply` for a real API call later.
export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I am the EstateEase assistant. How can I help you find a property today?' },
  ])
  const [input, setInput] = useState('')

  function send(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    const reply = getReply(text)
    setMessages((m) => [...m, { from: 'user', text }, { from: 'bot', text: reply }])
    setInput('')
  }

  return (
    <>
      <button
        className={`chat-fab ${open ? 'hidden' : ''}`}
        aria-label="Open chat assistant"
        onClick={() => setOpen(true)}
      >
        <span className="chat-fab-icon">?</span>
        <span className="chat-fab-label">Ask EstateEase</span>
      </button>

      {open && (
        <div className="chat-panel">
          <div className="chat-head">
            <div>
              <strong>EstateEase Assistant</strong>
              <div className="muted" style={{ fontSize: '0.75rem' }}>AI integration coming soon</div>
            </div>
            <button className="chat-close" aria-label="Close chat" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>{m.text}</div>
            ))}
          </div>
          <form className="chat-input" onSubmit={send}>
            <input
              className="input"
              placeholder="Type a message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  )
}

function getReply(text) {
  const t = text.toLowerCase()
  if (t.includes('buy')) return 'You can browse homes for sale on the Buy page. Try filtering by city or price.'
  if (t.includes('rent')) return 'Check the Rent page for rental listings. Filter by location and budget to narrow results.'
  if (t.includes('sell') || t.includes('list')) return 'Use the Sell page to list your property. Fill in the details and submit to publish it.'
  if (t.includes('price') || t.includes('budget')) return 'Prices are shown in Indian rupees (₹). Use the price filter to stay within your budget.'
  if (t.includes('hi') || t.includes('hello')) return 'Hello! How can I help — buying, renting, or listing a property?'
  return 'Thanks for your message! This assistant is a placeholder for now. Full AI support is coming soon.'
}
