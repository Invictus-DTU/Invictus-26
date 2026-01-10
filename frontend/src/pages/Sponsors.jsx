import React from 'react';

export default function Sponsors() {

  const LOTUS_URL = "lotus.png";

  const largeSponsors = [
    { name: "1", img: "image1" },
    { name: "2", img: "image2" },
    { name: "3", img: "image3" },
    { name: "4", img: "image4" },
  ];

  const smallSponsors = [
    { name: "1", img: "1" },
    { name: "2", img: "2" },
    { name: "3", img: "3" },
    { name: "4", img: "4" },
    { name: "5", img: "5" },
    { name: "6", img: "6" },
  ];

  const SponsorFrame = ({ sizeType, sponsorImg, name }) => {
    const isLarge = sizeType === 'large';
    const dimensions = {
      circleSize: isLarge ? '26vh' : '18vh',
      circleMax: isLarge ? '220px' : '150px',
      circleMin: isLarge ? '140px' : '100px',
      rectWidth: isLarge ? '28vh' : '20vh',
      rectMax: isLarge ? '240px' : '170px',
      rectMin: isLarge ? '150px' : '110px',
      rectHeight: isLarge ? '6vh' : '5vh',
      fontSize: isLarge ? '1.8vh' : '1.4vh',
    };

    const circleStyle = {
      width: dimensions.circleSize,
      height: dimensions.circleSize,
      maxWidth: dimensions.circleMax,
      maxHeight: dimensions.circleMax,
      minWidth: dimensions.circleMin,
      minHeight: dimensions.circleMin,
      borderRadius: '50%',
      border: '3px solid #C5A059',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFBEB 100%)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      zIndex: 10,
      backgroundColor: '#fff'
    };

    const rectStyle = {
      width: dimensions.rectWidth,
      maxWidth: dimensions.rectMax,
      minWidth: dimensions.rectMin,
      height: dimensions.rectHeight,
      minHeight: '35px',
      border: '3px solid #C5A059',
      background: '#FDF8E2',
      marginTop: '-1.5rem',
      position: 'relative',
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0 }}>
          {/* Circle */}
          <div style={circleStyle}>
            {/* Check if img exists, otherwise show placeholder text */}
            {sponsorImg ? (
                <img
                    src={sponsorImg}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    // Fallback if image path is wrong
                    onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerText='NO IMAGE'}}
                />
            ) : (
                <span style={{ color: 'rgba(197, 160, 89, 0.5)', fontWeight: 'bold', fontSize: '12px' }}>PHOTO</span>
            )}
          </div>
          {/* Rectangle */}
          <div style={rectStyle}>
                    <span style={{
                      color: '#8B6508', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em',
                      fontSize: `clamp(10px, ${dimensions.fontSize}, 18px)`,
                      textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 8px'
                    }}>
                        {name || 'SPONSOR'}
                    </span>
          </div>
        </div>
    );
  };

  return (
      <>
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Montserrat:wght@500;600&display=swap');
          body, html { margin: 0; padding: 0; overflow-x: hidden; overflow-y: auto; width: 100%; height: 100%; }
        `}
        </style>

        <div style={{
          width: '100vw',
          minHeight: '100vh',
          background: '#FDFBF7',
          display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative'
        }}>
          {/* 1. NAV SPACE */}
          <div style={{ width: '100%', height: '12vh', minHeight: '80px', flexShrink: 0, zIndex: 30 }}></div>

          {/* 2. HEADER SECTION */}
          <div style={{
            minHeight: '20vh',
            padding: '2vh 0',
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 20
          }}>

            <div style={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
              <h1 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 'clamp(3rem, 8vh, 6rem)',
                lineHeight: 1, margin: 0,
                background: 'linear-gradient(182.99deg, rgba(226, 170, 56, 0.9) 23.89%, rgba(71, 60, 36, 0.9) 97.31%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent'
              }}>
                SPONSORS
              </h1>

              <div style={{
                position: 'absolute',
                left: '105%',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 'clamp(60px, 12vw, 180px)',
                height: 'clamp(60px, 12vw, 180px)',
                display: 'flex', alignItems: 'center'
              }}>
                {LOTUS_URL ? (
                    <img src={LOTUS_URL} alt="Lotus" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px dashed gold' }}></div>
                )}
              </div>
            </div>

            <div style={{ width: '50vw', maxWidth: '600px', height: '2px', background: '#4A90E2', boxShadow: '0 0 8px #4A90E2', margin: '1.5vh 0' }}></div>

            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(0.9rem, 1.8vh, 1.2rem)',
              color: '#6E5B1D',
              background: 'linear-gradient(180deg, #D4AF37 0%, #6E5B1D 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontWeight: 600, margin: 0, textAlign: 'center', maxWidth: '90vw', padding: '0 10px'
            }}>
              Our valued partners who power Invictus by supporting innovation and excellence.
            </p>
          </div>

          {/* 3. GRID CONTENT */}
          <div style={{
            flexGrow: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '4vh',
            padding: '2vh 4vw 5vh 4vw',
            zIndex: 10
          }}>

            {/* ROW 1: LARGE */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              width: '100%',
              gap: '30px 20px'
            }}>
              {largeSponsors.map((sponsor, index) => (
                  <SponsorFrame key={index} sizeType="large" name={sponsor.name} sponsorImg={sponsor.img} />
              ))}
            </div>

            {/* ROW 2: SMALL */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              width: '100%',
              gap: '25px 15px'
            }}>
              {smallSponsors.map((sponsor, index) => (
                  <SponsorFrame key={index} sizeType="small" name={sponsor.name} sponsorImg={sponsor.img} />
              ))}
            </div>

          </div>
        </div>
      </>
  )
}