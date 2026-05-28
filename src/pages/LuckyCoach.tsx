import React, { useState } from 'react';
import { motion } from 'framer-motion';

const COACH_QA = [
  { id: 1, tags: ['slice', 'driver'], question: "I keep slicing the ball.", answer: "A slice means the clubface is open at impact. Check your grip—both thumbs should point down the right side of the shaft. Actionable tip: Feel like you're swinging inside-out." },
  { id: 2, tags: ['grip', 'fundamentals'], question: "How should I grip the club?", answer: "Hold the club in your fingers, not your palm. For right-handers, the V formed by your right thumb and index finger should point to your right shoulder." },
  { id: 3, tags: ['rules', 'water'], question: "My ball went in the water.", answer: "Take a one-stroke penalty. You can replay from the original spot or use a lateral drop (2 club lengths from entry, no closer to hole)." },
];

const LuckyCoach = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([{ role: 'ace', text: "Welcome to the Club. I'm Coach Ace. How's your game looking today?" }]);

  const handleSearch = (q: string) => {
    const term = q.toLowerCase();
    const match = COACH_QA.find(qa => qa.question.toLowerCase().includes(term) || qa.tags.some(t => t.includes(term)));
    const reply = match ? match.answer : "I'm still learning that one. Try asking about your slice, grip, or rules.";
    setMessages([...messages, { role: 'user', text: q }, { role: 'ace', text: reply }]);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="flex items-center gap-3 mb-8 border-b border-green-900 pb-4">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-black text-black">ACE</div>
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Lucky Coach</h1>
          <p className="text-green-500 text-xs font-bold uppercase">Pro Division · Clover Club</p>
        </div>
      </div>

      <div className="space-y-4 mb-8 h-96 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-green-600 font-bold' : 'bg-zinc-900 border border-green-900/50'}`}>
              <p className="text-sm">{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {['Fix my slice', 'Basic rules', 'Grip basics', 'Club selection'].map(btn => (
          <button key={btn} onClick={() => handleSearch(btn)} className="bg-zinc-900 border border-green-900 text-[10px] uppercase font-black p-3 rounded-lg hover:bg-green-900 transition-colors">
            {btn}
          </button>
        ))}
      </div>

      <div className="relative">
        <input 
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Ask Coach Ace..."
          className="w-full bg-zinc-900 border border-green-900 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-green-500"
          onKeyPress={e => e.key === 'Enter' && handleSearch(query)}
        />
      </div>
    </div>
  );
};

export default LuckyCoach;