import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { ActivatedRoute,Router } from '@angular/router';


import { GamesService } from '../../services/games.service';


@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit{

  @HostBinding('class') classes = 'row';
  
  game: Game ={
    id:0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  }

    edit: boolean = false; 

  constructor(private gamesService:GamesService, private router: Router, private activedRoute: ActivatedRoute) { }
  
  ngOnInit() {
    const params = this.activedRoute.snapshot.params;//tiene los parametros que se esta pasando en la url
    //console.log(params);
    console.log(params['id']);
    if (params['id']){
      this.gamesService.getGame(params['id']).subscribe(
        res => {
          console.log(res);
          this.game = res;
          this.edit = true;
        },
        err => console.log(err)
      )
      
    }
  }

  saveNewGame(){
    delete this.game.created_at;
    delete this.game.id;

    this.gamesService.saveGame(this.game)
    .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/games']);
        },
        err => {
          console.error(err);
        }
    )
    //console.log(this.game);
  }

  updateGame() {
    delete this.game.created_at;
    this.gamesService.updateGame(this.game.id, this.game)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      err => console.log(err)
    )
  }

}
