import React from 'react';
import styled, { keyframes } from 'styled-components';

// Import logos directly as modules
import ArloLogo from '../../images/logos/Arlo_logo.png';
import DellLogo from '../../images/logos/Dell_Logo.svg';
import ISC2Logo from '../../images/logos/ISC2_Logo.svg';
import NetflixLogo from '../../images/logos/Netflix.svg';
import NetgearLogo from '../../images/logos/Netgearlogo.svg';
import SonyLogo from '../../images/logos/Sony_logo.svg';
import TakeawayLogo from '../../images/logos/Takeaway_logo.svg';
import TripAdvisorLogo from '../../images/logos/TripAdvisor_Logo.svg';
import AppleLogo from '../../images/logos/apple.svg';
import BMWLogo from '../../images/logos/bmw-7.svg';
import DODLogo from '../../images/logos/department-of-defense.svg';
import RedBullLogo from '../../images/logos/redbull.svg';

const marqueeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const StyledLogoMarqueeSection = styled.section`
  padding: 100px 0;
  max-width: 100%;
  overflow: hidden;
  background-color: var(--navy);
  color: var(--slate);

  .marquee-container {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .marquee-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: var(--fz-heading);
    color: var(--white);
  }
  
  .marquee-description {
    text-align: center;
    margin-bottom: 50px;
    font-size: var(--fz-md);
    color: var(--slate);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .marquee-content {
    display: flex;
    width: max-content;
    animation: ${marqueeAnimation} 20s linear infinite;
  }

  .logo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
  }

  .logo-img {
    height: 50px;
    width: auto;
    filter: grayscale(100%) brightness(1.8);
    opacity: 0.7;
    transition: var(--transition);

    &:hover {
      filter: none;
      opacity: 1;
    }
  }
`;

const LogoMarquee = () => {
  // Use directly imported logos
  const logos = [
    { id: 'arlo', name: 'Arlo', publicURL: ArloLogo },
    { id: 'dell', name: 'Dell', publicURL: DellLogo },
    { id: 'isc2', name: 'ISC2', publicURL: ISC2Logo },
    { id: 'netflix', name: 'Netflix', publicURL: NetflixLogo },
    { id: 'netgear', name: 'Netgear', publicURL: NetgearLogo },
    { id: 'sony', name: 'Sony', publicURL: SonyLogo },
    { id: 'takeaway', name: 'Takeaway', publicURL: TakeawayLogo },
    { id: 'tripadvisor', name: 'TripAdvisor', publicURL: TripAdvisorLogo },
    { id: 'apple', name: 'Apple', publicURL: AppleLogo },
    { id: 'bmw', name: 'BMW', publicURL: BMWLogo },
    { id: 'dod', name: 'Department of Defense', publicURL: DODLogo },
    { id: 'redbull', name: 'Red Bull', publicURL: RedBullLogo }
  ];



  if (!logos.length) {
    return (
      <StyledLogoMarqueeSection id="logoMarquee">
        <h2 className="marquee-title">Companies I've Protected</h2>
        <p className="marquee-description">
          No logos found in static/logos. Add image files (svg, png, jpg, webp) to the static/logos folder to display them here.
        </p>
      </StyledLogoMarqueeSection>
    );
  }

  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <StyledLogoMarqueeSection id="logoMarquee">
      <h2 className="marquee-title">Companies I've Protected</h2>
      <p className="marquee-description">
        These are some of the companies I've helped protect from cyber risks through responsible vulnerability disclosure and security research.
      </p>
      <div className="marquee-container">

        <div className="marquee-content">
          {marqueeLogos.map((logo, index) => (
            <div className="logo-item" key={`${logo.id}-${index}`}>
              <img
                className="logo-img"
                src={logo.publicURL}
                alt={`${logo.name} logo`}
              />
            </div>
          ))}
        </div>
      </div>
    </StyledLogoMarqueeSection>
  );
};

export default LogoMarquee;