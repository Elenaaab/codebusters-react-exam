import React from 'react';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import utils from 'src/utils';

import './about.scss';

const { teamList } = utils[0];

const About = () => (
  <>
    <div id="stars" />
    <div id="stars2" />
    <div id="stars3" />
    <Header />
    <div className="about-container">
      <h2 className="about-title">Le projet</h2>
      <section className="about-text">
      CodeBusters est une plateforme d’Escape Games en ligne qui gravite dans l’univers du développement web. Sur un ton décalé, le produit se veut divertissant tout autant que réaliste dans ses énigmes, le propos étant de plonger le joueur dans le milieu en l’invitant à résoudre des énigmes décalées mais instructives. 
      </section>
      <h2 className="about-title">L'équipe</h2>
      <section className="about-section">
        {teamList.map((teamMember) => (
          <div className="about-profil" key={teamMember.id}>
            <article className="about-profil-article">
              <img className="about-profil-image" src={teamMember.image[0]} alt="" />
              <h4 className="about-profil-name">{teamMember.name}</h4>
              <h5 className="about-profil-describe">{teamMember.describe}</h5>
              <a href={teamMember.contact[0]} className="about-profil-link">
                <img className="about-profil-image-link" src={teamMember.image[1]} alt="git-profile" />
              </a>
              <a href={teamMember.contact[1]} className="about-profil-link">
                <img className="about-profil-image-link" src={teamMember.image[2]} alt="twitter-profile" />
              </a>
              <a href={teamMember.contact[2]} className="about-profil-link">
                <img className="about-profil-image-link" src={teamMember.image[3]} alt="linkedin-profile" />
              </a>
            </article>
          </div>
        ))}
      </section>
    </div>
    <Footer />
  </>
);

export default About;
