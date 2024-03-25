import React, { useState } from "react";
import { FaTrophy, FaNewspaper, FaMapMarkedAlt, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import "./AboutMe.css";

const AboutMe = () => {
  const [showSocialIcons, setShowSocialIcons] = useState(false);

  const handleContactClick = () => {
    setShowSocialIcons(!showSocialIcons);
  };

  return (
    <div className="about-me-container">
      <div className="about-me-image left">
        <img
          src="https://websitedemos.net/yoga-instructor-02/wp-content/uploads/sites/286/2018/10/divider-free-img.png"
          alt="yoga"
        />
      </div>
      <div className="about-me-content">
        <div className="about-me-item">
          <h2 className="about-me-heading">About Us</h2>
          <h1 className="about-me-title">Discover Our Yoga Journey</h1>
        </div>
        <div className="about-me-item">
          <h3 className="about-me-subtitle">My Way of Health & Life</h3>
          <p className="about-me-text">
            Embark on a transformative journey to holistic well-being through
            the ancient practice of yoga. Explore the path to physical vitality,
            mental clarity, and spiritual awakening with us.
          </p>
        </div>
        <div className="about-me-item">
          <h3 className="about-me-subtitle">Our Yoga Team</h3>
          <p className="about-me-text">
            Meet our dedicated team of experienced yoga instructors, committed
            to helping you achieve physical, mental, and spiritual wellness.
          </p>
        </div>
        <div className="about-me-item">
          <h3 className="about-me-subtitle">Our Achievements</h3>
          <ul className="about-me-list">
            <li><FaTrophy className="achievement-icon" /> Winner of Best Yoga Studio Award 2023</li>
            <li><FaNewspaper className="achievement-icon" /> Featured in Yoga Journal Magazine</li>
            <li><FaMapMarkedAlt className="achievement-icon" /> Hosted International Yoga Retreats</li>
          </ul>
        </div>
      </div>
      <div className="about-me-image right">
        <img
          src="https://websitedemos.net/yoga-instructor-02/wp-content/uploads/sites/286/2018/10/divider-free-img.png"
          alt="yoga"
        />
      </div>
      <div className="contact-section">
        <div className="contact-info">
          <h2>Meet our Yoga Instructor</h2>
          <p>
            "Step onto the sacred mat and embark on a journey of self-discovery
            guided by a seasoned yogi, whose life is woven with the threads of
            ancient wisdom and modern insight. Meet our revered instructor,
            Sowjanya, a beacon of light in the realm of yoga, whose
            passion for this sacred practice is as boundless as the sky and as
            deep as the ocean. With years of dedicated practice and profound
            study under the guidance of revered masters, Sowjanya brings a
            wealth of knowledge and experience to every class. Their journey
            into the heart of yoga began as a quest for inner peace and holistic
            well-being, leading them to explore the rich tapestry of yogic
            traditions from the lush forests of Rishikesh to the tranquil shores
            of Bali. Driven by a vision to share the transformative power of
            yoga with the world, Sowjanya founded our studio as a sanctuary of
            healing and growth, where seekers from all walks of life can find
            solace, strength, and serenity. Their mission is simple yet
            profound: to inspire and empower individuals to awaken their innate
            potential, cultivate radiant health, and live authentically aligned
            with their highest purpose. With a compassionate heart and a gentle
            spirit, Sowjanya holds space for each student to explore, expand,
            and evolve on their unique journey of self-discovery. Whether
            guiding a beginner through their first downward dog or leading a
            seasoned practitioner into the depths of meditation, Sowjanya approaches each moment with reverence, humility, and
            unwavering presence. Join Sowjanya on the mat and experience the
            transformative magic of yoga firsthand. Together, let us weave a
            tapestry of light, love, and liberation, as we journey inward to
            rediscover the timeless wisdom that resides within us all."
          </p>
        </div>
        <div className="contact-button">
          <button className="trendy-button" onClick={handleContactClick}>Contact Me</button>
          {showSocialIcons && (
            <div className="social-icons">
              <FaInstagram className="social-icon insta" />
              <FaFacebook className="social-icon fb" />
              <FaTwitter className="social-icon twitter" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
