class CustomFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                footer { padding:24px; text-align:center; color:#6B7280; }
                a { color:#6B46C1; text-decoration:none; }
            </style>
            <footer>
                <div>© ${new Date().getFullYear()} Anthony Cusimano</div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);
