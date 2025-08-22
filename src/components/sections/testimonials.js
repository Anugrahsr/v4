import React from 'react';
import styled, { keyframes } from 'styled-components';

const marqueeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }

  .topmate-stats {
    width: 100%;
    text-align: center;
    margin-top: 40px;
    padding: 30px 20px;
    background-color: var(--navy-shadow);
    border-radius: var(--border-radius);
    border: 1px solid var(--lightest-navy);
    
    p {
      font-size: var(--fz-lg);
      color: var(--lightest-slate);
      margin: 0;
      font-weight: 500;
      line-height: 1.4;
      
      @media (max-width: 768px) {
        font-size: var(--fz-md);
      }
    }
  }

`;

const StyledTestimonialsSection = styled.section`
  padding: 100px 0;
  max-width: 100%;
  background-color: var(--navy);
  color: var(--slate);
  overflow: hidden;

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .marquee-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    margin-bottom: 50px;
  }

  .marquee-content {
    display: flex;
    width: max-content;
    animation: ${marqueeAnimation} 30s linear infinite;
    
    &:hover {
      animation-play-state: paused;
    }
  }

  .section-title {
    width: 100%;
    font-size: var(--fz-heading);
    color: var(--lightest-slate);
    margin-bottom: 60px;
    position: relative;
    
    &:before {
      counter-increment: section;
      content: '0' counter(section) '.';
      margin-right: 10px;
      font-family: var(--font-mono);
      font-weight: 400;
      font-size: var(--fz-xl);
      color: var(--green);
    }

    &:after {
      content: '';
      display: block;
      width: 80px;
      height: 4px;
      background-color: var(--green);
      margin-top: 10px;
    }
  }

  .testimonial-group {
    display: flex;
    gap: 20px;
    padding: 0 10px;
    min-width: calc(280px * 3 + 40px);
    
    @media (max-width: 768px) {
      min-width: calc(280px * 1 + 20px);
    }
  }

  .testimonial-card {
    background-color: var(--light-navy);
    border-radius: 8px;
    padding: 25px;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    border: 1px solid transparent;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 280px;
    flex-shrink: 0;
    
    &:hover {
      transform: translateY(-7px);
      border-color: var(--green);
      background-color: rgba(100, 255, 218, 0.05);
      box-shadow: 0 20px 30px -15px rgba(2, 12, 27, 0.7),
                  0 0 0 1px rgba(100, 255, 218, 0.1),
                  0 0 20px rgba(100, 255, 218, 0.1);
      z-index: 2;
      
      .testimonial-name {
        color: var(--green);
      }
      
      .rating-fill {
        background: linear-gradient(to right, var(--green), #64ffda);
        box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
      }
      
      .testimonial-avatar {
        background-color: var(--green);
        box-shadow: 0 0 15px rgba(100, 255, 218, 0.4);
        transform: scale(1.05);
      }
    }
  }

  .testimonial-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    z-index: 0;
    border-radius: 4px;
    overflow: hidden;
    
    svg {
      width: 100%;
      height: 100%;
    }
  }

  .testimonial-content {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .testimonial-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .testimonial-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--green);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    
    span {
      color: var(--navy);
      font-weight: 600;
      font-size: var(--fz-lg);
    }
  }

  .testimonial-name {
    font-size: var(--fz-lg);
    color: var(--lightest-slate);
    transition: var(--transition);
  }

  .rating-bar {
    height: 8px;
    width: 100%;
    background-color: var(--light-slate);
    border-radius: 4px;
    margin: 15px 0;
    position: relative;
    overflow: hidden;
  }
  
  .rating-fill {
    height: 100%;
    background: linear-gradient(to right, var(--green), #64ffda);
    border-radius: 4px;
    transition: var(--transition);
  }
  
  .testimonial-rating {
    display: flex;
    align-items: center;
    margin: 10px 0;
    font-family: var(--font-mono);
    color: var(--lightest-slate);
    font-size: var(--fz-sm);
  }

  .testimonial-text {
    color: var(--slate);
    font-size: var(--fz-md);
    line-height: 1.5;
    margin-bottom: 20px;
    flex: 1;
  }


`;

const NetworkSVG = () => (
  <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
    <g fill="var(--lightest-slate)" fillOpacity="0.5">
      {/* Network nodes */}
      <circle cx="150" cy="150" r="5" />
      <circle cx="350" cy="100" r="5" />
      <circle cx="550" cy="200" r="5" />
      <circle cx="200" cy="300" r="5" />
      <circle cx="400" cy="350" r="5" />
      <circle cx="600" cy="400" r="5" />
      <circle cx="250" cy="450" r="5" />
      <circle cx="450" cy="500" r="5" />
      <circle cx="650" cy="150" r="5" />
      <circle cx="100" cy="400" r="5" />
      
      {/* Network lines */}
      <line x1="150" y1="150" x2="350" y2="100" stroke="var(--lightest-slate)" strokeOpacity="0.2" />
      <line x1="350" y1="100" x2="550" y2="200" stroke="var(--lightest-slate)" strokeOpacity="0.2" />
      <line x1="550" y1="200" x2="200" y2="300" stroke="var(--lightest-slate)" strokeOpacity="0.2" />
      <line x1="200" y1="300" x2="400" y2="350" stroke="var(--lightest-slate)" strokeOpacity="0.2" />
      <line x1="400" y1="350" x2="600" y2="400" stroke="var(--lightest-slate)" strokeOpacity="0.2" />
      <line x1="600" y1="400" x2="250" y2="450" stroke="var(--lightest-slate)" strokeOpacity="0.2" />
      <line x1="250" y1="450" x2="450" y2="500" stroke="var(--lightest-slate)" strokeOpacity="0.2" />
      <line x1="450" y1="500" x2="650" y2="150" stroke="var(--lightest-slate)" strokeOpacity="0.2" />
      <line x1="650" y1="150" x2="100" y2="400" stroke="var(--lightest-slate)" strokeOpacity="0.2" />
      <line x1="100" y1="400" x2="150" y2="150" stroke="var(--lightest-slate)" strokeOpacity="0.2" />
    </g>
  </svg>
);

const RatingBar = ({ rating }) => (
  <div className="rating-bar">
    <div className="rating-fill" style={{ width: `${(rating / 5) * 100}%` }}></div>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Mohammed Irshadh',
      text: 'Anugrah is experienced and skillful to make us understand our standpoint and providing a clear roadmap...',
      stars: 5,
    },
    {
      name: 'Harshavardhan Reddy Sivadi',
      text: 'Anuragh has answered all my questions. He has given more information than asked and very helpful. He has in-depth knowledge in cybersecurity and is up to date',
      stars: 5,
    },
    {
      name: 'Sumit Siddharth (CEO The SecOps Group)',
      text: 'Anugrah joined SecOps in the early days of the business and we soon identified him as someone who can be groomed to take on multiple roles and juggle many hats. I was pleasantly surprised to see him work up the ladder and take on various responsibilities- including his role in shaping our LLM exam. I am sure he will achieve bigger things in life and I hope we get a chance to work again in future. Thank You Anugrah for your time at SecOps.🙏🏾🚀',
      stars: 5,
    },
    {
      name: 'Yashodhar Poojari',
      text: 'I recently had the pleasure of participating in a 1:1 mentorship session, and it was an incredibly positive experience. Anugrah was exceptionally friendly and approachable, making it easy to discuss my questions and concerns. Every question I had was addressed clearly and thoroughly, providing me with the insights and guidance I needed. The session was not only informative but also very supportive, leaving me feeling more confident and well-prepared. I highly recommend this mentorship to anyone seeking knowledgeable and personable guidance.',
      stars: 5,
    },
    {
      name: 'selvapriya p',
      text: 'Informative and very useful! Got insights that would surely help me upgrade my career. Thanks Anugrah.',
      stars: 5,
    },
    {
      name: 'pramod kumar pradhan',
      text: 'It was really amazing to know some insights from the industry expert about the industry. And got some clarity that what I should focus on.',
      stars: 5,
    },
    {
      name: 'George Kuoribo',
      text: 'The session was very helpful, all questions were answered and the atmosphere was nice. Anugrah might not know it yet but he would make a good mentor.',
      stars: 5,
    },
    {
      name: 'Arjun',
      text: 'It was great talking with Anugrah sir, cleared all my doubts and guided with a clear roadmap. Thank you, looking forward for more interactions in the future.',
      stars: 5,
    },
  ];

  return (
    <StyledTestimonialsSection id="testimonials">
      <div className="inner">
        <h2 className="section-title">Testimonials and Feedback</h2>
        
        <div className="marquee-container">
          <div className="marquee-content">
            {/* Duplicate testimonials for seamless looping */}
            {[0, 1].map(groupIndex => (
              <div className="testimonial-group" key={`group-${groupIndex}`}>
                {testimonials.map((testimonial, index) => (
                  <div className="testimonial-card" key={`${groupIndex}-${index}`}>
                    <div className="testimonial-background">
                      <NetworkSVG />
                    </div>
                    <div className="testimonial-content">
                      <div className="testimonial-header">
                        <div className="testimonial-avatar">
                          <span>{testimonial.name.charAt(0)}</span>
                        </div>
                        <div className="testimonial-name">{testimonial.name}</div>
                      </div>
                      <div className="testimonial-rating">
                        Rating: {testimonial.stars}/5
                        <RatingBar rating={testimonial.stars} />
                      </div>
                      <p className="testimonial-text">{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="topmate-stats">
          <p>On Topmate, I have guided and helped more than 250+ people, being in the top 1% on the platform with a rating of 4.9⭐</p>
        </div>
        
      </div>
    </StyledTestimonialsSection>
  );
};

export default Testimonials;