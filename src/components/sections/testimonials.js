import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledTestimonialsSection = styled.section`
  padding: 100px 0;
  max-width: 100%;
  background-color: var(--navy);
  color: var(--slate);

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .testimonial-carousel {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto 50px auto;
    overflow: hidden;
  }

  .testimonial-slider {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }

  .testimonial-slide {
    min-width: 100%;
    display: flex;
    justify-content: center;
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 30px;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--lightest-navy);
    cursor: pointer;
    transition: var(--transition);
    
    &.active {
      background-color: var(--green);
    }
    
    &:hover {
      background-color: var(--slate);
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

  .testimonial-card {
    background: transparent;
    text-align: center;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      padding: 30px 15px;
    }
  }

  .testimonial-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6b6b, #ffa726);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px auto;
    
    @media (max-width: 768px) {
      width: 70px;
      height: 70px;
      margin-bottom: 16px;
    }
    
    span {
      color: white;
      font-weight: 600;
      font-size: var(--fz-xl);
      
      @media (max-width: 768px) {
        font-size: var(--fz-lg);
      }
    }
  }

  .testimonial-name {
    font-size: var(--fz-xl);
    color: var(--lightest-slate);
    font-weight: 600;
    margin-bottom: 8px;
    
    @media (max-width: 768px) {
      font-size: var(--fz-lg);
    }
  }

  .testimonial-role {
    font-size: var(--fz-md);
    color: var(--slate);
    margin-bottom: 30px;
    
    @media (max-width: 768px) {
      font-size: var(--fz-sm);
      margin-bottom: 24px;
    }
  }



  .testimonial-text {
    color: var(--light-slate);
    font-size: var(--fz-lg);
    line-height: 1.6;
    margin-bottom: 0;
    font-style: italic;
    text-align: center;
    
    @media (max-width: 768px) {
      font-size: var(--fz-md);
      line-height: 1.5;
    }
  }


`;



const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      name: 'Mohammed Irshadh',
      role: 'Cybersecurity Professional',
      text: 'Anugrah is experienced and skillful to make us understand our standpoint and providing a clear roadmap...',
      stars: 5,
    },
    {
      name: 'Harshavardhan Reddy Sivadi',
      role: 'Security Researcher',
      text: 'Anuragh has answered all my questions. He has given more information than asked and very helpful. He has in-depth knowledge in cybersecurity and is up to date',
      stars: 5,
    },
    {
      name: 'Sumit Siddharth',
      role: 'CEO The SecOps Group',
      text: 'Anugrah joined SecOps in the early days of the business and we soon identified him as someone who can be groomed to take on multiple roles and juggle many hats. I was pleasantly surprised to see him work up the ladder and take on various responsibilities- including his role in shaping our LLM exam. I am sure he will achieve bigger things in life and I hope we get a chance to work again in future. Thank You Anugrah for your time at SecOps.🙏🏾🚀',
      stars: 5,
    },
    {
      name: 'Yashodhar Poojari',
      role: 'Security Enthusiast',
      text: 'I recently had the pleasure of participating in a 1:1 mentorship session, and it was an incredibly positive experience. Anugrah was exceptionally friendly and approachable, making it easy to discuss my questions and concerns. Every question I had was addressed clearly and thoroughly, providing me with the insights and guidance I needed. The session was not only informative but also very supportive, leaving me feeling more confident and well-prepared. I highly recommend this mentorship to anyone seeking knowledgeable and personable guidance.',
      stars: 5,
    },
    {
      name: 'George Kuoribo',
      role: 'Cybersecurity Student',
      text: 'The session was very helpful, all questions were answered and the atmosphere was nice. Anugrah might not know it yet but he would make a good mentor.',
      stars: 5,
    },
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Auto-scroll every 5 seconds
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <StyledTestimonialsSection id="testimonials">
      <div className="inner">
        <h2 className="section-title">Testimonials</h2>
        
        <div className="testimonial-carousel">
          <div 
            className="testimonial-slider" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-slide" key={index}>
                <div className="testimonial-card">
                  <div className="testimonial-avatar">
                    <span>{testimonial.name.charAt(0)}</span>
                  </div>
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-role">{testimonial.role}</div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <div 
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
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