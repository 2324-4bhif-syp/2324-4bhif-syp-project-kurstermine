import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink, RouterModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    protected readonly keycloak: KeycloakService;
    protected userProfile: KeycloakProfile | undefined;

    protected readonly sentences: string[] = [
        'Welcome to our corner of the internet!',
        'Discover your next adventure here.',
        'Explore endless possibilities with us.',
        'Where creativity meets innovation.',
        'Your journey starts now.',
        'Join our community of dreamers and doers.',
        'Making the world a better place, one click at a time.',
        'Dive into a world of inspiration.',
        'Experience excellence, every step of the way.',
        'Embrace the extraordinary.',
        'Unleash your potential with us.',
        'Transforming dreams into reality.',
        'Your hub for all courses.',
        'Where passion meets purpose.',
        'Elevating experiences, one page at a time.',
        'Dive deep into what matters most to you.',
        'Connecting minds, inspiring souls.',
        'Your destination for all courses.',
        'Empowering you to reach new heights.',
        'Begin your journey to greatness today.',
    ];

    protected readonly images: string[] = [
        'fire.jpg',
        'forest.jpg',
        'mountains.jpg',
        'hot-springs.jpg',
        'forest.jpg',
        'tree.jpg',
        'monkey.jpg',
    ];

    protected randomSentenceIndex: number = Math.floor(
        Math.random() * this.sentences.length,
    );

    protected randomImageIndex: number = Math.floor(
        Math.random() * this.images.length,
    );

    newRandomImageIndex() {
        this.randomImageIndex = Math.floor(Math.random() * this.images.length);
    }

    constructor(keycloak: KeycloakService) {
        this.keycloak = keycloak;

        keycloak.loadUserProfile().then((profile: KeycloakProfile) => {
            this.userProfile = profile;
        });
    }
}
