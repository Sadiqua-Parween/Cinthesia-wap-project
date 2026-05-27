import { useState } from 'react'
import PostCard from '../../components/PostCard/PostCard'
import './Community.css'

const defaultPosts = [
  { id: 1, author: 'Sneha R.', initial: 'S', time: '2h ago', category: 'Acne', title: 'How do I get rid of hormonal acne?', description: 'I keep getting breakouts around my jawline. Nothing seems to work. Please help! 😢', likes: 24, comments: 12, replies: 12, replyAvatars: ['S','M','A'] },
  { id: 2, author: 'Mehak S.', initial: 'M', time: '5h ago', category: 'Dryness', title: 'Best moisturizer for dry & flaky skin?', description: 'My skin gets super dry in winters. Need recommendations!', likes: 18, comments: 9, replies: 8, replyAvatars: ['A','R','P'] },
  { id: 3, author: 'Ananya P.', initial: 'A', time: '1d ago', category: 'Routine Help', title: 'How can I build a simple skincare routine?', description: "I'm a beginner and totally confused. Please help!", likes: 16, comments: 7, replies: 6, replyAvatars: ['S','M','R'] },
  { id: 4, author: 'Riya T.', initial: 'R', time: '1d ago', category: 'Sensitive Skin', title: 'My skin reacts to almost everything!', description: 'I have sensitive skin and most products irritate me. What ingredients should I avoid?', likes: 21, comments: 11, replies: 9, replyAvatars: ['P','S','A'] },
  { id: 5, author: 'Pooja M.', initial: 'P', time: '2d ago', category: 'Anti-Aging', title: 'At what age should I start anti-aging?', description: "I'm 23 and want to start early. What should I add to my routine?", likes: 13, comments: 6, replies: 5, replyAvatars: ['M','S','R'] },
]

function Community() {
  const [activeFilter, setActiveFilter] = useState('All Posts')
  const [activeSort, setActiveSort] = useState('Latest')
  const [posts, setPosts] = useState(defaultPosts)
  const [question, setQuestion] = useState('')
  const [category, setCategory] = useState('Routine Help')
  const [feedback, setFeedback] = useState('')
  const filters = ['All Posts', 'Acne', 'Dryness', 'Sensitive Skin', 'Anti-Aging', 'Routine Help']

  function handleSubmit(e) {
    e.preventDefault()
    const trimmedQuestion = question.trim()

    if (!trimmedQuestion) {
      setFeedback('Write a question before posting.')
      return
    }

    const newPost = {
      id: Date.now(),
      author: 'You',
      initial: 'Y',
      time: 'Just now',
      category,
      title: trimmedQuestion,
      description: 'Waiting for the community to reply.',
      likes: 0,
      comments: 0,
      replies: 0,
      replyAvatars: ['Y'],
      categoryColor: 'linear-gradient(135deg,#7C3AED,#EC4899)',
    }

    setPosts((currentPosts) => [newPost, ...currentPosts])
    setQuestion('')
    setActiveSort('Latest')
    setActiveFilter('All Posts')
    setFeedback('Posted! It will stay here until you refresh the page.')
  }

  const visiblePosts = [...posts]
    .filter((post) => activeFilter === 'All Posts' || post.category === activeFilter)
    .filter((post) => activeSort !== 'Unanswered' || post.comments === 0)
    .sort((a, b) => {
      if (activeSort === 'Popular') return b.likes + b.comments - (a.likes + a.comments)
      return b.id - a.id
    })

  return (
    <div className="community">
      <section className="comm-hero">
        <div className="comm-hero__inner container">
          <div className="comm-hero__content">
            <h1 className="comm-hero__heading">Real people.<br/>Real conversations.<br/><em>Let's glow together.</em> ✨</h1>
            <p className="comm-hero__subtext">Ask questions, share experiences, help others & get support.</p>
            <form className="comm-hero__form" onSubmit={handleSubmit}>
              <div className="comm-hero__input-wrap">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  className="comm-hero__input"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value)
                    setFeedback('')
                  }}
                />
                <select
                  className="comm-hero__select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label="Question category"
                >
                  {filters.filter((filter) => filter !== 'All Posts').map((filter) => (
                    <option key={filter} value={filter}>{filter}</option>
                  ))}
                </select>
                <button className="btn btn-pink" type="submit">Ask a Question</button>
              </div>
              {feedback && <p className="comm-hero__feedback">{feedback}</p>}
            </form>
          </div>
          <div className="comm-hero__visual">
            <img src="/images/skincare-routine.png" alt="Community" className="comm-hero__image"/>
          </div>
        </div>
      </section>

      <section className="comm-filters">
        <div className="container">
          <div className="comm-filters__tags">
            {filters.map(f => (
              <button key={f} className={`tag ${activeFilter === f ? 'tag-active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="comm-main section">
        <div className="comm-main__inner container">
          <div className="comm-main__feed">
            <div className="comm-main__sort-bar">
              <div className="comm-main__sorts">
                {['Latest','Popular','Unanswered'].map(s => (
                  <button key={s} className={`comm-main__sort ${activeSort === s ? 'comm-main__sort--active' : ''}`} onClick={() => setActiveSort(s)}>{s}</button>
                ))}
              </div>
              <button className="comm-main__filter-btn">Filter ⚙</button>
            </div>
            <div className="comm-main__posts">
              {visiblePosts.length > 0 ? (
                visiblePosts.map((post) => <PostCard key={post.id} {...post}/>)
              ) : (
                <div className="comm-main__empty">
                  No posts match this view yet.
                </div>
              )}
            </div>
            <button className="comm-main__load-more btn btn-secondary">Load more posts ↓</button>
          </div>

          <aside className="comm-sidebar">
            <div className="comm-sidebar__card card">
              <h3 className="comm-sidebar__title">🔥 Trending Topics</h3>
              <ol className="comm-sidebar__topics">
                {['Glass Skin','Dark Spots','Skin Barrier','Sunscreen','Retinol'].map((t,i) => (
                  <li key={i} className="comm-sidebar__topic"><span className="comm-sidebar__topic-num">{i+1}</span>{t}</li>
                ))}
              </ol>
              <a href="#" className="link-arrow">See all topics →</a>
            </div>
            <div className="comm-sidebar__card card">
              <h3 className="comm-sidebar__title">✦ Ask Our Experts</h3>
              <div className="comm-sidebar__expert">
                <div className="avatar avatar-lg" style={{background:'linear-gradient(135deg,#EC4899,#A78BFA)'}}>DA</div>
                <div><strong>Dr. Aishwarya Mehta</strong><p>Dermatologist · 8+ years</p></div>
              </div>
              <p className="comm-sidebar__expert-desc">Have a skin concern? Get advice from our expert community.</p>
              <a href="#" className="link-arrow">Ask an Expert →</a>
            </div>
            <div className="comm-sidebar__card card">
              <h3 className="comm-sidebar__title">Most Helpful Members</h3>
              <div className="comm-sidebar__members">
                {[{name:'Mehak S.',pts:'12K',i:'M',c:'hsl(320,55%,65%)'},{name:'Sneha R.',pts:'980',i:'S',c:'hsl(260,55%,65%)'},{name:'Ananya P.',pts:'870',i:'A',c:'hsl(200,55%,65%)'}].map((m,i) => (
                  <div key={i} className="comm-sidebar__member">
                    <div className="avatar avatar-sm" style={{background:m.c}}>{m.i}</div>
                    <div><strong>{m.name}</strong><p>{m.pts} points</p></div>
                    <button className="comm-sidebar__follow">+</button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="comm-bottom">
        <div className="comm-bottom__inner container">
          <p className="comm-bottom__text">Be kind. Be real. Be you. ✦</p>
          <p className="comm-bottom__subtext">This is a safe space for everyone. Let's support & grow together.</p>
          <button className="btn btn-secondary">Community Guidelines →</button>
        </div>
      </section>
    </div>
  )
}

export default Community
