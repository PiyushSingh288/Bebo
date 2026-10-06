import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Check, Gift, Heart, Image as ImageIcon, Moon, Quote, Sparkles, Sun, X } from 'lucide-react';

const LOVE_CONFIG = {
  girlfriendName: 'My Love',
  myName: 'PIYUSH',
  nickname: 'my beautiful girl',
  anniversaryDate: 'A date worth remembering',
  heroMessage: 'Every love story is beautiful, but somehow, ours became my favorite.',
};

const images = [
  '/images/WhatsApp_Image_2026-10-05_at_15.51.14_(1).jpeg',
  '/images/WhatsApp_Image_2026-10-05_at_15.51.14_(2).jpeg',
  '/images/WhatsApp_Image_2026-10-05_at_15.51.14.jpeg',
  '/images/WhatsApp_Image_2026-10-05_at_15.51.15.jpeg',
  '/images/WhatsApp_Image_2026-10-05_at_15.51.37.jpeg',
];

const notes = [
  'Your smile makes ordinary days feel golden.', 'I would choose you in every universe.', 'You are my favorite notification.',
  'Thank you for making life feel softer.', 'I love the way your heart cares so deeply.', 'You are the calm in my favorite chaos.',
  'Every little thing about you feels like home.', 'I hope you always know how loved you are.', 'Your laugh is one of my favorite sounds.',
  'With you, even silence feels beautiful.', 'I am so lucky to know your heart.', 'You make the world feel more beautiful.',
  'I love our tiny, unforgettable moments.', 'You are my favorite person to talk to.', 'Always you. No matter what.',
  'You make me want to be a better person.', 'Your kindness is quietly extraordinary.', 'I am grateful for you every single day.',
  'You are the sweetest part of my life.', 'My heart feels safest with you.', 'I love your beautiful, brilliant mind.',
  'You turn moments into memories.', 'I love the way you care about the little things.', 'You are my once-in-a-lifetime kind of person.',
  'I will keep choosing us.', 'You make my world glow a little brighter.', 'You are loved beyond words.',
  'I adore the person you are becoming.', 'There is no one else I would rather do life with.', 'You are my favorite place to be.',
];

const compliments = [
  'You make my world a little softer.', 'Your smile is still one of my favorite sights.', 'You are one of the best things that ever happened to me.',
  'I would find you in every lifetime.', 'Life feels better with you in it.', 'You make my heart feel understood.',
  'You are breathtakingly, wonderfully you.', 'I love how you make even small moments matter.', 'You are my favorite kind of magic.',
  'I hope today reminds you how special you are.', 'You are the person my heart looks for first.', 'I am endlessly proud of you.',
  'You make being in love feel easy.', 'You are more precious to me than you know.', 'Your presence is my favorite comfort.',
  'I still get a little amazed that I get to love you.', 'You are my best thought of every day.', 'You are beautiful in every possible way.',
  'My favorite future has you in it.', 'You bring so much light wherever you go.', 'You are the sweetest chapter of my life.',
  'I love you more than yesterday and less than tomorrow.', 'You are my person, always.', 'You make my heart do the happiest little dance.',
  'I choose you, again and again.',
];

const memories = [
  { chapter: 'The Beginning', title: 'I did not know it at the time...', text: 'But this would become one of the moments I would want to remember forever.', image: images[0], caption: 'A face I could look at forever.' },
  { chapter: 'That Smile', title: 'Somehow, you make a place feel warmer.', text: 'I swear, sometimes I still wonder how one person can change the whole feeling of a room just by smiling.', image: images[1], caption: 'My favorite kind of beautiful.' },
  { chapter: 'The Little Things', title: 'The smallest moments became the ones I kept.', text: 'Not every beautiful memory announces itself. Some simply stay, quietly becoming part of your heart.', image: images[2], caption: 'A moment I will always keep.' },
  { chapter: 'Us', title: 'Maybe that is what I love most.', text: 'Not the big moments. Just us, being us, and making an ordinary day feel like somewhere I want to stay.', image: images[3], caption: 'You make anywhere feel like home.' },
  { chapter: 'Still Writing', title: 'I do not want this album to end.', text: 'Because I do not want our story to end either. There are still so many little chapters left for us.', image: images[4], caption: 'My favorite person. Always.' },
];

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('love-theme') === 'midnight');
  const [opened, setOpened] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [jarNote, setJarNote] = useState('Tap the jar for a little reason...');
  const [usedNotes, setUsedNotes] = useState<number[]>([]);
  const [compliment, setCompliment] = useState('Tell me when you need a little extra love.');
  const [complimentIndex, setComplimentIndex] = useState(-1);
  const [questionAnswer, setQuestionAnswer] = useState('');
  const [questionClicks, setQuestionClicks] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [reasonCount, setReasonCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('love-theme', dark ? 'midnight' : 'romantic');
  }, [dark]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setReasonCount((count) => Math.min(count + 1, 999)), 28);
    return () => window.clearInterval(id);
  }, []);

  const pickNote = () => {
    const available = notes.map((_, index) => index).filter((index) => !usedNotes.includes(index));
    const next = available[Math.floor(Math.random() * available.length)];
    setJarNote(notes[next]);
    setUsedNotes(available.length === 1 ? [] : [...usedNotes, next]);
  };

  const nextCompliment = () => {
    const next = (complimentIndex + 1) % compliments.length;
    setComplimentIndex(next);
    setCompliment(compliments[next]);
  };

  const selectAnswer = (answer: string) => {
    setQuestionAnswer(answer);
    setQuestionClicks((clicks) => clicks + 1);
  };

  const activeMemory = lightbox === null ? null : memories[lightbox];
  const floatingHearts = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);

  const handleChapterTilt = (event: React.MouseEvent<HTMLButtonElement>) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -4;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
    card.style.setProperty('--tilt-x', `${rotateX}deg`);
    card.style.setProperty('--tilt-y', `${rotateY}deg`);
  };

  const resetChapterTilt = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <main className={dark ? 'app midnight' : 'app'}>
      <div className="progress" />
      <div className="ambient-hearts" aria-hidden="true">{floatingHearts.map((heart) => <span key={heart} style={{ '--i': heart } as React.CSSProperties}>♥</span>)}</div>
      <button className="theme-toggle" aria-label="Toggle romantic theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={17} /> : <Moon size={17} />}<span>{dark ? 'Daylight love' : 'Midnight love'}</span></button>

      <section className="hero" id="home">
        <div className="hero-glow" /><div className="stars" aria-hidden="true">✦　·　✧　　·　✦　·　✧　·</div>
        <div className="hero-content reveal">
          <p className="eyebrow">A little universe made for you</p>
          <div className="hero-portrait"><img src={images[0]} alt={`${LOVE_CONFIG.girlfriendName} smiling`} /><span>♡</span></div>
          <p className="script">Made with all my heart...</p>
          <h1>For the girl who<br /><em>means the world</em> to me.</h1>
          <p className="hero-subtitle">{LOVE_CONFIG.heroMessage}</p>
          <button className="primary-button" onClick={() => { setOpened(true); document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' }); }}>{opened ? 'My heart is open ♥' : 'Open my heart'} <Heart size={16} fill="currentColor" /></button>
          <p className="scroll-hint"><ArrowDown size={15} /> scroll gently</p>
        </div>
        <div className="hero-side-note">for {LOVE_CONFIG.nickname}<br /><span>with love, always</span></div>
      </section>

      <section className="intro section reveal" id="story">
        <div className="section-kicker">01 · the beginning</div>
        <div className="intro-grid"><div><h2>Somehow, in a world this big,<br /><em>I found you.</em></h2></div><div className="intro-copy"><Quote size={26} /><p>And since then, ordinary days have felt a little more magical. This is a tiny collection of all the reasons my heart keeps choosing you.</p><div className="signature">— {LOVE_CONFIG.myName}</div></div></div>
      </section>

      <section className="gallery-section section reveal" id="memories"><div className="section-kicker">02 · little pieces of us</div><div className="novel-heading"><div><h2>Some memories are photographs.<br /><em>Some are feelings.</em></h2><p>And some are little moments that somehow stay with you forever.</p></div><ImageIcon size={30} /></div><div className="chapter-stack">{memories.map((memory, index) => <article className="memory-chapter" key={memory.image}><div className="chapter-copy"><span className="chapter-number">Chapter {String(index + 1).padStart(2, '0')}</span><h3>{memory.chapter}</h3><p>{memory.title}</p><span className="chapter-line">{memory.text}</span></div><button className={`chapter-photo chapter-photo-${index + 1}`} onClick={() => setLightbox(index)} onMouseMove={handleChapterTilt} onMouseLeave={resetChapterTilt} aria-label={`Open ${memory.chapter} memory`}><span className="memory-label">Memory #{String(index + 1).padStart(2, '0')}</span><img src={memory.image} alt={memory.caption} /><span className="photo-caption">{memory.caption}</span><span className="photo-shine" /></button></article>)}</div><div className="chapter-finale"><span>Chapter ∞</span><p>I do not want this album to end.<br /><em>Because I do not want our story to end either. ♥</em></p></div></section>

      <section className="reasons-section section reveal"><div className="section-kicker">03 · things i love about you</div><h2 className="center-heading">The things I keep<br /><em>noticing.</em></h2><p className="reasons-intro">Not the perfect, postcard version of love. The real parts. The small things you do without thinking that make being with you feel easy.</p><div className="reason-grid">{[['01','The way you check in','Even a quick “have you eaten?” tells me I am on your mind.'],['02','Your unplanned smile','The one that appears when you forget anyone is looking. It is my favorite.'],['03','Your laugh','Especially when something catches you off guard and you try not to laugh at it.'],['04','How you remember','You notice the small details I mention once, then somehow remember them later.'],['05','The space you make','With you, I never feel like I have to be anyone other than myself.'],['06','The person you are','Kind, thoughtful, and completely yourself. That is the part I love most.']].map(([number,title,text]) => <div className="reason-card" key={title}><span className="reason-symbol">{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

      <section className="letter-section section reveal"><div className="letter-copy"><div className="section-kicker">04 · from my heart</div><h2>I wrote something<br /><em>for you.</em></h2><p>Some feelings are too big for a text message. Open this when you are ready.</p></div><button className={`envelope ${letterOpen ? 'open' : ''}`} onClick={() => setLetterOpen(!letterOpen)} aria-label="Open love letter"><div className="envelope-back" /><div className="letter-paper"><span>Dear {LOVE_CONFIG.nickname},</span><p>I do not know if words will ever be enough to explain what you mean to me. You make ordinary moments feel special, and I am grateful for every laugh, every conversation, every little memory we create.</p><p>Whatever the future brings, I want more of the small things with you. Thank you for being you.</p><strong>I love you. ♥</strong></div><div className="envelope-flap" /><div className="wax-seal">♥</div></button></section>

      <section className="jar-section section reveal"><div className="section-kicker">05 · a jar full of little reasons</div><h2 className="center-heading">For every time you forget,<br /><em>let me remind you.</em></h2><div className="jar-wrap"><div className="jar-note">{jarNote}</div><button className="jar" onClick={pickNote} aria-label="Reveal a reason I love you"><div className="jar-lid" /><div className="jar-glass">{Array.from({ length: 13 }, (_, index) => <span key={index} style={{ '--n': index } as React.CSSProperties}>♥</span>)}<div className="jar-label">tap for<br /><strong>a reason</strong></div></div></button></div></section>

      <section className="counter-section section reveal"><div className="counter-number">{reasonCount === 999 ? '∞' : reasonCount}</div><div><div className="section-kicker">06 · reasons i love you</div><h2>I stopped counting.<br /><em>There are too many.</em></h2><p>Reason #1: your smile.<br />Reason #2: your heart.<br />Reason #∞: simply, you.</p></div></section>

      <section className="universe-section section reveal"><div className="moon">☾</div><div className="constellation">✦　 ·　 ✧<br />　♥　 ·<br />✧　 ·　 ✦</div><div className="section-kicker">07 · our little universe</div><h2>In a world full of people...<br /><em>somehow, I found you.</em></h2><p>And I would choose you again.</p></section>

      <section className="movie-section section reveal"><div className="movie-poster"><div className="poster-top">a film by fate</div><div className="poster-title">Our<br /><em>Story</em></div><div className="poster-line" /><p>ROMANCE · FOREVER</p><div className="poster-bottom">starring<br /><strong>you & me</strong></div></div><div className="movie-copy"><div className="section-kicker">08 · if we were a movie</div><h2>The kind of story<br /><em>worth replaying.</em></h2><p><b>Genre:</b> Romance<br /><b>Starring:</b> You & Me<br /><b>Status:</b> Still writing it...<br /><b>Ending:</b> Hopefully never.</p><button className="outline-button" onClick={() => document.getElementById('final')?.scrollIntoView({ behavior: 'smooth' })}>Continue our story <ArrowRight size={16} /></button></div></section>

      <section className="playful-section section reveal"><div className="section-kicker">09 · be honest</div><h2>Do you know how much<br /><em>I love you?</em></h2><div className="answer-buttons"><button onClick={() => selectAnswer('yes')}>Yes, obviously <Heart size={15} fill="currentColor" /></button><button onClick={() => selectAnswer('maybe')}>Maybe more than I think <Sparkles size={15} /></button></div>{questionAnswer && <p className="answer">{questionAnswer === 'yes' ? 'Good. Because I plan on reminding you every day. ♥' : 'You have no idea. But I promise to keep showing you. ✨'}</p>}{questionClicks > 2 && <span className="secret-answer"><Check size={14} /> You found the secret: very, very much.</span>}</section>

      <section className="compliment-section section reveal"><div className="compliment-card"><Sparkles size={22} /><div className="section-kicker">10 · just because</div><h2>{compliment}</h2><button className="primary-button" onClick={nextCompliment}>Tell me something sweet <Heart size={15} /></button><small>{Math.max(0, complimentIndex + 1)} / {compliments.length} little reminders</small></div></section>

      <section className="final-section section reveal" id="final"><div className="final-glow" /><div className="section-kicker">11 · one more thing</div><h2>If I had to choose you<br /><em>all over again...</em></h2><div className="final-choice">I WOULD.</div><p>In this life.<br />In every version of it.<br />In every universe.</p><h3>I would still choose you. <Heart size={24} fill="currentColor" /></h3><div className="final-sparkles">✦　✧　♥　✧　✦</div></section>

      <footer className="footer"><Gift size={22} /><h2>Thank you for being you.</h2><p>Whatever happens tomorrow, whatever adventures life takes us on, I hope we always remember the little moments that brought us here.</p><strong>I love you. ♥</strong><small>— {LOVE_CONFIG.myName}</small></footer>

      {lightbox !== null && activeMemory && <div className="lightbox" role="dialog" aria-modal="true"><button className="close-lightbox" onClick={() => setLightbox(null)} aria-label="Close photo"><X /></button><button className="lightbox-arrow left" onClick={() => setLightbox((lightbox + memories.length - 1) % memories.length)} aria-label="Previous photo"><ArrowLeft /></button><img src={activeMemory.image} alt={activeMemory.caption} /><button className="lightbox-arrow right" onClick={() => setLightbox((lightbox + 1) % memories.length)} aria-label="Next photo"><ArrowRight /></button><p>{activeMemory.caption}</p></div>}
    </main>
  );
}

export default App;
