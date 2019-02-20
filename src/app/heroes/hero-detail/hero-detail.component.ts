import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService,
    private location: Location
  ) {}

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    // this.hero = this.service.getHero(id);
    this.service.getHero(id).subscribe(hero => this.hero = hero);

    /* this.hero = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHero(+params.get('id')))
    ); */
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.service.getHero(+params.get('id')))
    // ).subscribe(r => {
    //   this.hero = r;
    // })
  }

  gotoHeroes(hero: Hero) {
    let heroId = this.hero ? this.hero.id : null;
    this.router.navigate(['/heroes', {id: heroId, foo: 'foo'}]);
    // this.router.navigate(['/heroes']);
  }

  goBack(): void {
    this.location.back();
  }
}
