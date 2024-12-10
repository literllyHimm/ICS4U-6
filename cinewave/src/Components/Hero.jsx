import React from 'react';

const Hero = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.overlay}>
        <h1>Welcome to Cinewave</h1>
        <p>Discover your next favorite movie!</p>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    height: '300px',
    backgroundImage: 'url("https://cdn.mos.cms.futurecdn.net/AoWXgnHSxAAPxqymPQMQYL-1200-80.jpg")', // Replace with a dynamic URL if needed
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    color: 'white',
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
};

export default Hero;
