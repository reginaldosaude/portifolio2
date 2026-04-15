import React from 'react';

function ProjectCard({ image, title, description, techs = [], githubLink }) {
  return (
    <div className="project-card">
      <img className="project-img" src={image} alt={title} />
      <div className="project-content">
        <div className="project-icon"><i className="fas fa-chart-line"></i></div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="tech-stack">
          {techs.map((tech, idx) => (
            <span key={idx}>{tech}</span>
          ))}
        </div>
        {githubLink && (
          <a href={githubLink} className="project-link" target="_blank" rel="noopener noreferrer">
            Ver meu código <i className="fas fa-arrow-right"></i>
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;