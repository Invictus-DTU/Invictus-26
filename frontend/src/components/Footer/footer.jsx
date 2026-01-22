"use client";

import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.overlay}></div>

      <div style={styles.container}>
        
        
        <div style={styles.left}>
          <img
            src="/invictuslogo.svg"
            alt="Invictus Logo"
            style={styles.logo}
          />
        </div>

        <div style={styles.divider}></div>

        
        <div style={styles.center}>
          <span>@Designed and Developed with </span>
          <span style={styles.heart}>❤</span>
          <span> by </span>
          <strong>Invictus Team</strong>
        </div>

        <div style={styles.divider}></div>

        
        <div style={styles.right}>
          
         
          <a
            href="https://linkedin.com/company/invictus-dtu"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.icon}
          >
            <img src="/linkedin.svg" alt="LinkedIn" style={styles.socialSvg} />
          </a>

          <a
            href="https://instagram.com/invictus_dtu"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.icon}
          >
            <img src="/instagram.svg" alt="Instagram" style={styles.socialSvg} />
          </a>

          <span style={styles.handle}>@invictus_dtu</span>

          
          <span style={styles.help}>
            | For any help: <strong>Jahan Sharma</strong> –82737 54287
          </span>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    width: "100%",
    maxWidth: "100vw",
    backgroundImage: "url('/backdrop.svg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    padding: "28px 48px",
    fontFamily: "Segoe UI, sans-serif",
    fontSize: "25px",
    overflowX: "hidden",
    boxSizing: "border-box"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(210, 190, 140, 0.75)",
    zIndex: 0
  },

  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1320px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box"
  },

  left: {
    display: "flex",
    alignItems: "center"
  },

  logo: {
    height: "52px"
  },

  divider: {
    width: "2px",
    height: "42px",
    background: "#c9a34a",
    margin: "0 16px"
  },

  center: {
    flex: 1,
    textAlign: "center",
    color: "#2e2a23",
    fontWeight: 500,
    letterSpacing: "0.4px",
    whiteSpace: "nowrap"
  },

  heart: {
    color: "#c0392b",
    margin: "0 4px"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#2e2a23",
    whiteSpace: "nowrap"
  },

  icon: {
    textDecoration: "none"
  },

  socialSvg: {
    width: "22px",
    height: "22px"
  },

  handle: {
    fontSize: "14px",
    marginLeft: "4px"
  },

  help: {
    fontSize: "14px",
    marginLeft: "8px",
    color: "#2e2a23"
  }
};

export default Footer;
