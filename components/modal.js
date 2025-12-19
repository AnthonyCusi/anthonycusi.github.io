class CustomModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .modal-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        .modal-content {
          background: white;
          border-radius: 0.5rem;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          transform: translateY(20px);
          transition: transform 0.3s ease;
          position: relative;
        }
        .modal-overlay.active .modal-content {
          transform: translateY(0);
        }
        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
        }
        .modal-body {
          padding: 1.5rem;
        }
        .project-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .project-description {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .tech-tag {
          background: #f3f4f6;
          color: #6b46c1;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }
      </style>
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title"></h3>
            <button class="close-btn">&times;</button>
          </div>
          <div class="modal-body">
            <img class="project-image" src="" alt="">
            <p class="project-description"></p>
            <div class="tech-stack"></div>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.close-btn').addEventListener('click', () => this.close());
    this.shadowRoot.querySelector('.modal-overlay').addEventListener('click', (e) => {
      if (e.target === this.shadowRoot.querySelector('.modal-overlay')) {
        this.close();
      }
    });
  }

  open(title, description, image, tags) {
    this.shadowRoot.querySelector('.modal-title').textContent = title;
    this.shadowRoot.querySelector('.project-description').textContent = description;
    this.shadowRoot.querySelector('.project-image').src = image;
    
    const techStack = this.shadowRoot.querySelector('.tech-stack');
    techStack.innerHTML = '';
    tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tag;
      techStack.appendChild(span);
    });

    this.shadowRoot.querySelector('.modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.shadowRoot.querySelector('.modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }
}

customElements.define('custom-modal', CustomModal);