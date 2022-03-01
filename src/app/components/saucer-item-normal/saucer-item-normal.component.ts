import { Component, OnInit, Input } from '@angular/core';
import { Saucer } from '../../interfaces/index';

@Component({
  selector: 'app-saucer-item-normal',
  templateUrl: './saucer-item-normal.component.html',
  styleUrls: ['./saucer-item-normal.component.scss'],
})
export class SaucerItemNormalComponent implements OnInit {

  @Input() saucer: Saucer;

  constructor() { }

  ngOnInit() {}

}
