import React from 'react';
import styled, { keyframes } from 'styled-components';

// Import certification logos directly as modules - only PNG files that exist
import CCPenXAWSLogo from '../../images/certifications/ccpenX-AWS.png';
import eCPPTv2Logo from '../../images/certifications/eCPPTv2.png';
import APIPenTestLogo from '../../images/certifications/api_pentest.png';
import eWPTXLogo from '../../images/certifications/ewptx.png';
import eJPTLogo from '../../images/certifications/ejpt-certification.svg';
import CNSPLogo from '../../images/certifications/Certified-Network-Security-Practitioner-whbg.png';
import CertStamp2Logo from '../../images/certifications/cert-stamp-2.png';
import CertStampAIMLLogo from '../../images/certifications/cert-stamp-aiml-pro.png';
import CertStampAWSLogo from '../../images/certifications/cert-stamp-aws.png';
import CertStampCMPenLogo from '../../images/certifications/cert-stamp-cmpen-android.png';
import CertifiedAppSecPentesterLogo from '../../images/certifications/certified-appsec-pentester.png';
import CertifiedNetworkPentesterLogo from '../../images/certifications/certified-network-pentester.png';
import RedTeamingLLMLogo from '../../images/certifications/Red Teaming LLM Applications - AI Security Assessment.png';

const marqueeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const StyledCertificationsSection = styled.section`
  padding: 100px 0;
  max-width: 100%;
  overflow: hidden;
  background-color: var(--light-navy);
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
    animation: ${marqueeAnimation} 25s linear infinite;
    
    &:hover {
      animation-play-state: paused;
    }
  }

  .cert-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    cursor: pointer;
    transition: var(--transition);
    
    &:hover {
      transform: translateY(-5px);
    }
  }

  .cert-img {
    height: 120px;
    width: auto;
    opacity: 0.9;
    transition: var(--transition);
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    &:hover {
      opacity: 1;
      transform: scale(1.2);
      box-shadow: 0 12px 30px rgba(100, 255, 218, 0.4);
    }
  }
`;

const Certifications = () => {
  // Use directly imported certification logos
  const certifications = [
    { id: 'ewptxv2', name: 'eLearnSecurity Web Application Penetration Tester eXtreme v2 (eWPTXv2)', publicURL: eWPTXLogo, link: 'https://elearnsecurity.com/product/ewptxv2-certification/' },
    { id: 'ejpt', name: 'eLearnSecurity Junior Penetration Tester (eJPT)', publicURL: eJPTLogo, link: 'https://elearnsecurity.com/product/ejpt-certification/' },
    { id: 'azure-pentest', name: 'Altered Security Introduction to Azure Penetration Testing', publicURL: CertStampAWSLogo, link: 'https://www.alteredsecurity.com/azureadlab' },
    { id: 'ccpenx-aws', name: 'Certified Cloud Pentesting eXpert - AWS (CCPenX-AWS)', publicURL: CCPenXAWSLogo, link: 'https://elearnsecurity.com/product/ccpenx-aws-certification/' },
    { id: 'ecpptv2', name: 'eLearnSecurity Certified Professional Penetration Tester (eCPPTv2)', publicURL: eCPPTv2Logo, link: 'https://elearnsecurity.com/product/ecpptv2-certification/' },
    { id: 'cmpen-android', name: 'Certified Mobile Pentester (CMPen) – Android', publicURL: CertStampCMPenLogo, link: 'https://elearnsecurity.com/' },
    { id: 'cnpen', name: 'Certified Network Pentester (CNPen)', publicURL: CertifiedNetworkPentesterLogo, link: 'https://elearnsecurity.com/' },
    { id: 'capen', name: 'Certified AppSec Pentester (CAPen)', publicURL: CertifiedAppSecPentesterLogo, link: 'https://elearnsecurity.com/' },
    { id: 'c-aimlpen', name: 'Certified AI/ML Pentester (C-AI/MLPen)', publicURL: CertStampAIMLLogo, link: 'https://elearnsecurity.com/' },
    { id: 'api-pentest', name: 'API Penetration Testing', publicURL: APIPenTestLogo, link: '#' },
    { id: 'cnsp', name: 'Certified Network Security Practitioner', publicURL: CNSPLogo, link: '#' },
    { id: 'cert-stamp-2', name: 'Professional Certification', publicURL: CertStamp2Logo, link: '#' },
    { id: 'redteam-llm', name: 'Red Teaming LLM Applications - AI Security Assessment', publicURL: RedTeamingLLMLogo, link: '#' },
  ];

  if (!certifications.length) {
    return (
      <StyledCertificationsSection id="certifications">
        <h2 className="marquee-title">Certifications</h2>
        <p className="marquee-description">
          No certification logos found. Add certification images to display them here.
        </p>
      </StyledCertificationsSection>
    );
  }

  const marqueeCertifications = [...certifications, ...certifications, ...certifications, ...certifications];

  const handleCertClick = link => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <StyledCertificationsSection id="certifications">
      <h2 className="marquee-title">Certifications</h2>
      <p className="marquee-description">
        Professional certifications that validate my expertise in cybersecurity and information security domains.
      </p>
      <div className="marquee-container">
        <div className="marquee-content">
          {marqueeCertifications.map((cert, index) => (
            <div 
              className="cert-item" 
              key={`${cert.id}-${index}`}
              onClick={() => handleCertClick(cert.link)}
              title={cert.name}
            >
              <img
                className="cert-img"
                src={cert.publicURL}
                alt={`${cert.name} certification`}
              />
            </div>
          ))}
        </div>
      </div>
    </StyledCertificationsSection>
  );
};

export default Certifications;