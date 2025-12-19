class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    background: white;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                nav {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                .nav-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 70px;
                }
                .logo {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1a365d;
                    text-decoration: none;
                }
                .logo span {
                    color: #6B46C1;
                }
                .nav-links {
                    display: flex;
                    gap: 2rem;
                    margin-left: auto;
                    align-items: center;
                }
                .nav-link {
                    position: relative;
                    color: #4a5568;
                    font-weight: 500;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .nav-link:hover {
                    color: #6B46C1;
                }
                .nav-link.active {
                    color: #6B46C1;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: -4px;
                    left: 0;
                    background-color: #6B46C1;
transition: width 0.3s;
                }
                .nav-link:hover::after {
                    width: 100%;
                }
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                .mobile-menu {
                    display: none;
                    flex-direction: column;
                    gap: 1rem;
                    padding: 1rem 0;
                    border-top: 1px solid #e2e8f0;
                }
                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }
                    .mobile-menu-btn {
                        display: block;
                    }
                    .mobile-menu.open {
                        display: flex;
                    }
                }

                /* Social icon styles inside shadow DOM */
                .nav-social {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    margin-left: 0.75rem;
                }
                .social-link {
                    color: #4a5568;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .social-link:hover {
                    color: #6B46C1;
                }
                .feather-icon {
                    width: 24px;
                    height: 24px;
                    display: block;
                }
            </style>
            <nav>
                <div class="nav-container">
                    <a href="/" class="logo">Anthony <span>Cusimano</span></a>
                    <div class="nav-social">
                        <a href="https://www.linkedin.com/in/anthonyccusimano/" id="nav-linkedin" target="_blank" aria-label="LinkedIn" class="social-link"></a>
                        <a href="https://github.com/AnthonyCusi" id="nav-github" target="_blank" aria-label="GitHub" class="social-link"></a>
                    </div>
                    <div class="nav-links">
                        <a href="/" class="nav-link active">Home</a>
                        <a href="#skills" class="nav-link">Skills</a>
                        <a href="#projects" class="nav-link">Projects</a>
                        <a href="#contact" class="nav-link">Contact</a>
                    </div>
                    <button class="mobile-menu-btn" id="menu-btn">
                        <i data-feather="menu"></i>
                    </button>
                </div>
                <div class="mobile-menu" id="mobile-menu">
                    <a href="/" class="nav-link active">Home</a>
                    <a href="#skills" class="nav-link">Skills</a>
                    <a href="#projects" class="nav-link">Projects</a>
                    <a href="#contact" class="nav-link">Contact</a>
                </div>
            </nav>
        `;

        // wire up mobile menu button inside shadow root
        const menuBtn = this.shadowRoot.getElementById('menu-btn');
        const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
        }

        // insert feather SVGs for social icons into shadow DOM (uses window.feather from page)
        const lnAnchor = this.shadowRoot.getElementById('nav-linkedin');
        const ghAnchor = this.shadowRoot.getElementById('nav-github');

        // retry until feather is ready (use small number of retries then fallback to text)
        const tryInsertIcons = (attempt = 0) => {
            if (window.feather && window.feather.icons) {
                try {
                    if (lnAnchor && window.feather.icons['linkedin']) {
                        lnAnchor.innerHTML = window.feather.icons['linkedin'].toSvg({ class: 'feather-icon' });
                    }
                    if (ghAnchor && window.feather.icons['github']) {
                        ghAnchor.innerHTML = window.feather.icons['github'].toSvg({ class: 'feather-icon' });
                    }
                } catch (e) {
                    // ignore and let fallback handle
                }
                return;
            }

            if (attempt < 20) {
                // try again shortly
                setTimeout(() => tryInsertIcons(attempt + 1), 100);
            } else {
                // graceful fallback if feather never becomes available
                if (lnAnchor && !lnAnchor.innerHTML) lnAnchor.textContent = 'LinkedIn';
                if (ghAnchor && !ghAnchor.innerHTML) ghAnchor.textContent = 'GitHub';
            }
        };

        tryInsertIcons();
    }
}

customElements.define('custom-navbar', CustomNavbar);