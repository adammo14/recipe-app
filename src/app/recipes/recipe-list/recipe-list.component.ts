import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss']
})

export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [
        new Recipe('Pizza', 'Margheritta Pizza', 'https://cdn.loveandlemons.com/wp-content/uploads/2019/09/margherita-pizza-500x500.jpg')
    ];

    constructor() {}

    ngOnInit(): void {}

}
