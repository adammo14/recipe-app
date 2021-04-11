import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../Shared/ingredient/ingredient.model';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss']
})

export class ShoppingListComponent implements OnInit {
    ingredients: Ingredient[]  = [
        new Ingredient('Apple', 5),
        new Ingredient('Egg', 2),
        new Ingredient('Bread', 1)
    ];

    constructor() {}

    ngOnInit(): void {}

}
