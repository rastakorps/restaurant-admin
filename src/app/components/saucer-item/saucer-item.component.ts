import { Component, OnInit, Input } from '@angular/core';
import { Saucer } from '../../interfaces/index';

@Component({
  selector: 'app-saucer-item',
  templateUrl: './saucer-item.component.html',
  styleUrls: ['./saucer-item.component.scss'],
})
export class SaucerItemComponent implements OnInit {

  @Input() saucer: Saucer;

  constructor() { }

  ngOnInit() {}

  openSliding(slidingItem) {
    slidingItem.open();
  }

}
