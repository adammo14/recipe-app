import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    loggedIn: Boolean;
    isOpen: Boolean;

    constructor() {
        this.loggedIn = false;
        this.isOpen = false;
    }

    ngOnInit(): void {}

    menuToggle() {
        this.isOpen = !this.isOpen;
    }

}
