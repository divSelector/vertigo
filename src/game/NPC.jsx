class NPC {
    constructor(aura, abilities) {
        this.aura = aura;
        this.abilities = abilities;
        this.jobTitle = this.generateJobTitle();
        this.email = this.generateFakeEmail();
    }

    generateJobTitle() {
        return 'Job Title';
    }

    generateFakeEmail() {
        return 'fakeemail@example.com';
    }
}

export default NPC;